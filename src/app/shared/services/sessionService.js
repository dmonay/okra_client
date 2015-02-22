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

    function session($http, $state, $timeout, okraAPI, ipCookie) {

        var service = {};

        service.gAuthenticate = function (isSilent) {

            var currentTime = new Date().getTime(),
                previousTokenExpiration = ipCookie('okTokenExpirationDate') * 1000;

            gapi.client.setApiKey(service.authCreds.gApiKey);

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
                        ipCookie('okSession', response.access_token);
                        ipCookie('okTokenExpirationDate', response.expires_at);
                        service.getProfile();
                    }
                }, function (response) {
                    console.log('Silent login failed');
                });
        };

        service.getProfile = function () {
            gapi.client.load('plus', 'v1').then(function () {
                var request = gapi.client.plus.people.get({
                    'userId': 'me'
                });
                request.then(function (response) {
                    service.user = response.result;
                    // service.updateUser(response.result);
                    if ($state.current.name == "login") {
                        $state.go('organizations');
                    }
                    //refresh the auth token in 40 minutes if the user remains active on the app
                    service.beginAuthCountdown(2400000);

                }, function (response) {
                    //invalid credentials let's authenticate and try again
                    if (response.error === '401') {
                        service.gAuthenticate(true);
                    }
                });
            });
        };

        service.updateUser = function (user) {
            //look for the user on the backend to update user obj

            //save session and related tokens on the back end if no user found
            $http.post(okraAPI.registerUser, {
                userName: session.user.displayName
            });
        };

        service.beginAuthCountdown = function (time) {
            $timeout(function () {
                service.gAuthenticate(true);
            }, time);
        };

        service.storeCredentials = function (credentials) {
            service.authCreds = {
                gauthClientId: credentials.gauthClientId,
                gApiKey: credentials.gApiKey
            };
        };

        service.isAuthenticated = function () {
            //silently attempt to login
            service.gAuthenticate(true);
        };

        return service;
    }

    session.$inject = ['$http', '$state', '$timeout', 'okraAPI', 'ipCookie'];

    app.factory('session', session);

})();
