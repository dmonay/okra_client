(function () {

    'use strict';

    var app = angular.module('SharedFilters');

    /**
     * @ngdoc filter
     * @name SharedFilters.okDecrypt
     * @description
     *
     * # Routes
     * A filter used to decrypt a string with AES encryption.
     *
     * @usage
     *
     * <div> {{name | okDecrypt}} </div>
     */

    app.filter('okDecrypt', function () {

        return function (encryptedString) {
            var decrypted = CryptoJS.AES.decrypt(encryptedString, "DPokraPC");

            return decrypted.toString(CryptoJS.enc.Utf8);
        };

    });

})();
