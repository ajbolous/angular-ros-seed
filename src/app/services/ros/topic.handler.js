(function() {
    'use strict';

    angular
        .module('euclidApp')
        .factory('RosTopic', RosTopic);

    function RosTopic($q, $log) {
        
        var RosTopic = function(ros, name, type) {
            this._name = name;
            this._type = type
            this._messageHandlers = []

            this._topic = new ROSLIB.Topic({
                ros: ros,
                name: this._name,
                messageType: this._type
            });
        }

        RosTopic.prototype.getName = function(){
            return this._name;
        }

        RosTopic.prototype.publish = function(message) {
                this._topic.publish(message);
        }

        RosTopic.prototype.subscribe = function() {
            var self = this;
            this._topic.subscribe(function(message){
                self._messageHandlers.forEach(function(handler){
                    handler(message);
                });
            });
        }

        RosTopic.prototype.onMessage = function(callBack){
            this._messageHandlers.push(callBack);
        }
        return RosTopic;
    }
})();