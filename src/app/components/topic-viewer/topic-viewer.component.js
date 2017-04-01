(function() {
    'use strict';

    angular
        .module('opmopApp')
        .component('rosTopicViewer', {
            templateUrl: 'app/components/topic-viewer/topic-viewer.component.html',
            bindings: {
                topicHdl: '<',
            },
            controller: TopicViewer
        });

    function TopicViewer($log, $scope) {
        var $ctrl = this;

        $ctrl.$onChanges = function(changes) {
            if (angular.isDefined(changes.topicHdl.currentValue)) {
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