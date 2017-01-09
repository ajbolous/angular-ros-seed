(function () {
    'use strict';

    angular
        .module('euclidApp')
        .factory('RosService', RosService);

    function RosService($log, $ros) {
        var RosService = function (name, type) {
            this._name = name;
            this._type = type

            this._service = new ROSLIB.Service({
                ros: $ros.getRos(),
                name: this._name,
                serviceType: this._type
            });
        }

        RosService.prototype.call = function(params) {
            var d = $q.defer();
            var request = new ROSLIB.ServiceRequest(params);
            pinService.callService(request, d.resolve, d.reject);
            return d.promise;
        }

        return RosService;
    }
})();