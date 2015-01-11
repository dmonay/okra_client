(function () {

    'use strict';

    var app = angular.module('SharedFilters');

    app.filter('okDecrypt', function () {

        return function (encryptedString) {
            var decrypted = CryptoJS.AES.decrypt(encryptedString, "DPokraPC");

            return decrypted.toString(CryptoJS.enc.Utf8);
        };

    });

})();
