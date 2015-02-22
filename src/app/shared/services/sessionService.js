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

    function session($http, $state, okraAPI, ipCookie) {

        var service = {};

        service.gAuthenticate = function (loggedIn) {
            var isSilent = false,
                currentTime = new Date().getTime(),
                previousTokenExpiration = ipCookie('okTokenExpirationDate');

            gapi.client.setApiKey(service.authCreds.gApiKey);
            if (currentTime > previousTokenExpiration && loggedIn) {
                isSilent = true;
            }

            gapi.auth.authorize({
                    client_id: service.authCreds.gauthClientId,
                    scope: 'https://www.googleapis.com/auth/userinfo.profile',
                    immediate: isSilent
                })
                .then(function (response) {
                    if (response.access_token) {
                        session.auth = {
                            accessToken: response.access_token,
                            tokenLifespan: response.expires_in
                        };
                        service.getProfile();
                    }
                });
        };

        service.getProfile = function () {
            gapi.client.load('plus', 'v1').then(function () {
                var request = gapi.client.plus.people.get({
                    'userId': 'me'
                });
                request.then(function (resp) {
                    service.user = resp.result;
                    $state.go('organizations');
                });
            });
        };

        service.saveSession = function (session) {
            //look for the user on the backend to update user obj

            //save session and related tokens on the back end if no user found
            $http.post(okraAPI.registerUser, {
                userName: session.user.displayName
            });
        };

        service.storeCredentials = function (credentials) {
            service.authCreds = {
                gauthClientId: credentials.gauthClientId,
                gApiKey: credentials.gApiKey
            };
        };

        return service;
    }

    session.$inject = ['$http', '$state', 'okraAPI', 'ipCookie'];

    app.factory('session', session);

})();
