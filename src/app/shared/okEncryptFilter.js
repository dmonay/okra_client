(function () {

    'use strict';

    var app = angular.module('SharedFilters');

    function okEncrypt() {

        return function (string) {
            var encrypted = CryptoJS.AES.encrypt(string, "DPokraPC");

            return encrypted.toString();
        };

    }

    app.filter('okEncrypt', okEncrypt);
})();
