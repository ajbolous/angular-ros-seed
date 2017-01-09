(function () {
    'use strict';

    angular
        .module('euclidApp')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController($ros, toastr, $scope, $log, RosTopic) {
        var $ctrl = this;
    }
})();