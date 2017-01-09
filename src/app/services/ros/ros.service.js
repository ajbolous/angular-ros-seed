(function () {
    'use strict';

    angular
        .module('euclidApp')
        .service('$ros', $ros);

    function $ros($log, $q, RosTopic) {
        var self = this;
        self._ros = initialize('ws:\\' + ROS_IP + ':9090')
        self._isConnected = false;

        function initialize(address) {
            var ros = new ROSLIB.Ros({
                url: address
            });
            ros.on('connection', onConnect);
            ros.on('close', onClose);
            return ros;
        }

        function onConnect() {
            this._isConnected = true;
            console.log("ROS IS CONNECTED");
        }

        function onClose() {
            this._isConnected = false;
            console.log("ROS IS DISCONNECTED");
        }

        function connect(address) {
            return self._ros.connect(address);
        }

        function close() {
            return self._ros.close();
        }

        function fetchNodes() {
            var d = $q.defer();
            self._ros.getNodes(d.resolve, d.reject)
            return d.promise;
        }

        function fetchTopicType(topic) {
            var d = $q.defer();
            self._ros.getTopicType(topic, d.resolve);
            return d.promise;
        }

        function fetchNodes() {
            var d = $q.defer();
            self._ros.getNodes(d.resolve);
            return d.promise;
        }

        function fetchTopics() {
            var d = $q.defer();
            self._ros.getTopics(function (topics) {
                var allTopics = [];
                var promises = [];
                topics.forEach(function (topic) {
                    var promise = $q.defer();
                    promises.push(promise);
                    fetchTopicType(topic).then(function (type) {
                        allTopics.push(new RosTopic(self._ros, topic, type));
                    });
                    $q.all(promises).then(function () { d.resolve(allTopics) });
                });
                return d.promise;
            });
            return d.promise
        }


        function fetchServices() {
            var d = $q.defer();
            self._ros.getServices(d.resolve, d.reject)
            return d.promise
        }

        function getServerIp() {
            return self._ros.dest;
        }

        return {
            getRos: function () { return self._ros; },
            isConnected: function () { return self._isConnected; },
            fetchNodes: fetchNodes,
            fetchServices: fetchServices,
            fetchTopics: fetchTopics,
            getServerIp: getServerIp,
            close: close,
            connect: connect
        }
    }
})();