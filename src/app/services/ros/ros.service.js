(function() {
    'use strict';

    angular
        .module('opmopApp')
        .service('$ros', $ros);

    function $ros($log, $q, RosTopic, toastr) {
        var self = this;
        self._ros = initialize('ws:\\' + ROS_IP + ':9090')
        self._isConnected = false;
        self._topics = {};

        function initialize(address) {
            var ros = new ROSLIB.Ros({
                url: address
            });
            ros.on('connection', onConnect);
            ros.on('close', onClose);
            return ros;
        }

        function onConnect() {
            toastr.success("Connected to ROS");
            this._isConnected = true;
            console.log("ROS IS CONNECTED");
        }

        function onClose() {
            toastr.error("Connected to ROS");
            this._isConnected = false;
            console.log("ROS IS DISCONNECTED");
        }

        function connect(address) {
            return self._ros.connect(address);
        }

        function close() {
            return self._ros.close();
        }


        function getTopic(topicName, topicType) {
            if (topicName in self._topics) {
                return self._topics[topicName];
            }

            var topic = new RosTopic(this, topicName, topicType);
            self._topics[topName] = topic;
            return topic;
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
            self._ros.getTopics(function(topics) {
                $log.debug(topics);
                var allTopics = [];
                var promises = [];
                topics.forEach(function(topic) {
                    var promise = $q.defer();
                    promises.push(promise);
                    fetchTopicType(topic).then(function(type) {
                        allTopics.push(new RosTopic(self._ros, topic, type));
                    });
                    $q.all(promises).then(function() { d.resolve(allTopics) });
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
            getRos: function() { return self._ros; },
            isConnected: function() { return self._isConnected; },
            fetchNodes: fetchNodes,
            fetchServices: fetchServices,
            fetchTopics: fetchTopics,
            getServerIp: getServerIp,
            close: close,
            connect: connect
        }
    }
})();