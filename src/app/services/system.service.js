(function () {
    'use strict';

    angular
        .module('euclidApp')
        .service('SystemService', SystemService);

    function SystemService($ros, $q) {
        var ros = $ros.getRos();
        var pinService = new ROSLIB.Service({
            ros: ros,
            name: '/controller/pinStatus',
            serviceType: 'controller/PinStatus'
        });
        var winService = new ROSLIB.Service({
            ros: ros,
            name: '/controller/winStatus',
            serviceType: 'controller/WinStatus'
        });

        function getPinStatus(pin, callBack) {
            var d = $q.defer();
            var request = new ROSLIB.ServiceRequest({
                pin: pin
            });
            pinService.callService(request, function (response) {
                d.resolve(response);
            });
            return d.promise;
        }

        function getWinStatus(dir, move, callBack) {
            var d = $q.defer()
            var request = new ROSLIB.ServiceRequest({
                dir: dir,
                move: move
            });
            winService.callService(request, function (response) {
                d.resolve(response);
            });
            return d.promise;
        }

        return {
            getPinStatus: getPinStatus,
            getWinStatus: getWinStatus
        }
    }
})();