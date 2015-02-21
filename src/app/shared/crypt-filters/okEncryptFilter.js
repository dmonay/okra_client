(function () {

    'use strict';

    var app = angular.module('SharedFilters');

    /**
     * @ngdoc filter
     * @name SharedFilters.okEncrypt
     * @description
     *
     * # Routes
     * A filter used to encrypt a string with AES encryption.
     *
     * @usage
     *
     * <div> {{name | okEncrypt}} </div>
     */

    function okEncrypt() {

        return function (string) {
            var encrypted = CryptoJS.AES.encrypt(string, "DPokraPC");

            return encrypted.toString();
        };

    }

    app.filter('okEncrypt', okEncrypt);
})();
