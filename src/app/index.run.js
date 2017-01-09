(function () {
    'use strict';

    angular
        .module('euclidApp')
        .run(runBlock);

    /** @ngInject */
    function runBlock($log) {

        $log.debug('runBlock end');
    }

})();