(function() {
    'use strict';

    angular
        .module('opmopApp')
        .component('rosNodeViewer', {
            templateUrl: 'app/components/node-viewer/node-viewer.component.html',
            bindings: {
                nodeHdl: '<',
            },
            controller: NodeViewer
        });

    function NodeViewer($log, $scope) {
        var $ctrl = this;

        $ctrl.$onChanges = function(changes) {
            if (angular.isDefined(changes.nodeHdl.currentValue)) {
                $ctrl.topicMsg = {};
                $ctrl.topicName = $ctrl.topicHdl.getName();
                $ctrl.topicHdl.subscribe();
                $ctrl.topicHdl.onMessage(function(message) {
                    $ctrl.topicMsg = message;
                    $scope.$apply();
                });
            }
        }
    }
})();