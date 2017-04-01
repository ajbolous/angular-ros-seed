(function() {
    'use strict';

    angular.module('opmopApp').controller('MainController', MainController);

    /** @ngInject */
    function MainController($ros, toastr, $scope, $log, RosTopic) {
        var $ctrl = this;

        $ctrl.name = ["bolous", "ahdab"];

    }

})();