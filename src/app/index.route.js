(function () {
    'use strict';

    angular
        .module('euclidApp')
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('#');

        $routeProvider.when('/', {
            templateUrl: 'app/views/main/main.html',
            controller: 'MainController',
            controllerAs: '$ctrl'
        });

        $routeProvider.when('/scenarios', {
            templateUrl: 'app/views/scenarios/scenarios.html',
            controller: 'ScenariosController',
            controllerAs: '$ctrl'
        });

        $routeProvider.when('/nodes', {
            templateUrl: 'app/views/nodes/nodes.html',
            controller: 'NodesController',
            controllerAs: '$ctrl'
        });

        $routeProvider.when('/topics', {
            templateUrl: 'app/views/topics/topics.html',
            controller: 'TopicsController',
            controllerAs: '$ctrl'
        });

        $routeProvider.when('/monitor', {
            templateUrl: 'app/views/monitor/monitor.html',
            controller: 'MonitorController',
            controllerAs: '$ctrl'
        });
    }

})();