(function () {
    'use strict';

    angular
        .module('opmopApp')
        .component('rosTopicLogger', {
            templateUrl: 'app/components/topic-logger/topic-logger.component.html',
            bindings: {
                topic: '<'
            },
            controller: TopicLogger
        });

    function TopicLogger($log, $scope) {
        var $ctrl = this;
        $ctrl.messages = [];

        $ctrl.$onChanges = function (changes) {
            $log.debug(changes);
            if (angular.isDefined(changes.topic.currentValue)) {
                $ctrl.startLogger(changes.topic.currentValue)
            }

        }


        $ctrl.startLogger = function (topic) {
            $ctrl.topic.onMessage(function (message) {
                $ctrl.messages.push(message);
                $scope.$apply();
            });
        }

    }
})();