(function() {
    'use strict';

    angular.module('opmopApp')
        .component('mapViewer', {
            templateUrl: 'app/components/map-viewer/map.component.html',
            controller: MapViewer,
            bindings: {
                name: '@',
            },
        });

    function MapViewer($log, $scope) {
        var $ctrl = this;

        $ctrl.saveData = function() {
            var arr = $ctrl.flightPath.getPath().getArray();
            for (var i = 0; i < arr.length; i++) {
                var point = arr[i];
                $log.debug("Point", point.lat(), point.lng());
            }
        }

        $ctrl.initMap = function() {
            var myLatLng = { lat: 40.523, lng: -112.154948 };
            $ctrl.map = new google.maps.Map(document.getElementById('map-viewer-div'), {
                zoom: 15,
                center: myLatLng,
            });

            var marker = new google.maps.Marker({
                position: myLatLng,
                map: $ctrl.map,
                title: 'Hello World!'
            });


            var flightPlanCoordinates = [
                { lat: 40.523, lng: -112.154948 },
                { lat: 40.513, lng: -112.114948 }
            ];

            $ctrl.flightPath = new google.maps.Polyline({
                path: flightPlanCoordinates,
                editable: true,
                strokeColor: '#aa0000',
                strokeOpacity: .5,
                strokeWeight: 4,
                map: $ctrl.map
            });


        }
        
        $ctrl.initMap();

    }
})();