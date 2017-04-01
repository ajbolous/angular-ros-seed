(function() {
    'use strict';

    angular
        .module('opmopApp')
        .run(runBlock);

    /** @ngInject */
    function runBlock($log) {

        $log.debug('runBlock end');
    }

})();