(function () {
    'use strict';

    angular
        .module('euclidApp')
        .controller('TopicsController', TopicsController);

    /** @ngInject */
    function TopicsController($ros, toastr, $scope, $log) {
        var $ctrl = this;

        $ros.fetchTopics().then(function(topics){
            $ctrl.topics = topics;
        });

    }
})();