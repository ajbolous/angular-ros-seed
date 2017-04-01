(function() {
    'use strict';

    angular
        .module('opmopApp')
        .controller('MonitorController', MonitorController);

    /** @ngInject */
    function MonitorController($ros, toastr, $scope, $log) {
        var $ctrl = this;
        $ctrl.cameras = [
            { name: 'RGB', enabled: 'false' },
            { name: 'IR', enabled: 'false' },
            { name: 'Fisheye', enabled: 'false' },
        ]
        $ctrl.viewers = [
            { name: 'IMU', enabled: 'false' },
            { name: 'Trajectory', enabled: 'false' },
        ]
    }
})();