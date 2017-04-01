(function () {
    'use strict';

    angular
        .module('opmopApp')
        .controller('NodesController', NodesController);

    /** @ngInject */
    function NodesController($ros, toastr, $scope, $log) {
        var $ctrl = this;

        $ros.fetchNodes().then(function(nodes){
            $ctrl.nodes = nodes;
        });

    }
})();