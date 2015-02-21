(function () {
    'use strict';

    var app = angular.module('SharedServices');
    /**
     * @ngdoc service
     * @name SharedServices.session
     * @description
     *
     * # session
     * Interacts with the current session.
     *
     */

    function session(apiCreds) {

        var service = {};

        service.setUpSession = function () {
            gapi.client.setApiKey(apiCreds.gApiKey);
            session.user = {};
            console.log(session);
        };

        service.gAuthenticate = function () {
            //authenticate in here
            service.setUpSession();

            gapi.auth.authorize({
                client_id: apiCreds.gauthClientId,
                scope: 'https://www.googleapis.com/auth/userinfo.profile',
                immediate: true
            }, session.handleAuthResponse);
        };

        session.handleAuthResponse = function (response) {
            console.log(response);
            //save if good
            //reject if bad
        };

        service.silentAuth = function () {
            //silently attempt to login
        };

        service.saveSession = function (session) {
            //save session and related tokens on the back end
        };

        return service;
    }

    session.$inject = ['apiCreds'];

    app.factory('session', session);

})();
