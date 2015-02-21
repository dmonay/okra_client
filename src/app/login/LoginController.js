(function () {
    'use strict';

    var app = angular.module('LoginModule');

    function LoginController(session) {
        var vm = this;

        vm.googleLogin = function () {
            session.gAuthenticate();
        };
    }

    LoginController.$inject = ['session'];

    app.controller('LoginController', LoginController);

})();
