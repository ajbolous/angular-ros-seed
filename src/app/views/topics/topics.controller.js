(function() {
    'use strict';

    angular
        .module('opmopApp')
        .controller('TopicsController', TopicsController);

    /** @ngInject */
    function TopicsController($ros, toastr, $scope, $log) {
        var $ctrl = this;

        $ros.fetchTopics().then(function(topics) {
            $log.debug(topics);
            $ctrl.topics = topics;
        });

    }
})();