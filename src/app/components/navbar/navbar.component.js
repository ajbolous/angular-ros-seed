(function () {
    'use strict';

    angular
        .module('euclidApp')
        .component('topNavbar', {
            templateUrl: 'app/components/navbar/navbar.component.html',
            controller: TopNavbar
        });

    function TopNavbar($log, $scope, $location) {
        var $ctrl = this;
        $ctrl.navbarCollapsed = true;
        $ctrl.links = [
            { label: 'Home', path: '/', active: true },
            { label: 'Scenarios', path: '/scenarios', active: false },
            { label: 'Topics', path: '/topics', active: false },
            { label: 'Nodes', path: '/nodes', active: false },
            { label: 'Monitor', path: '/monitor', active: false },
        ]

        $ctrl.selectLink = function (link) {
            $log.debug(link)
            this.links.forEach(function (l) {
                l.active = false;
            });
            link.active = true;
            $location.path(link.path)
            $ctrl.navbarCollapsed = true;
        }
    }
})();