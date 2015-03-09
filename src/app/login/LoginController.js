(function () {
    'use strict';

    var app = angular.module('LoginModule');

    function LoginController(session) {
        var vm = this;

        vm.session = session;

        session.isAuthenticating = false;

        vm.googleLogin = function () {
            session.gAuthenticate(false);
            session.isAuthenticating = true;
        };

    }

    LoginController.$inject = ['session'];

    app.controller('LoginController', LoginController);

})();
