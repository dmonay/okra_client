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

    function session(apiCreds, $http, okraAPI) {

        var service = {};

        service.gAuthenticate = function (isSilent) {
            gapi.client.setApiKey(apiCreds.gApiKey);

            gapi.auth.authorize({
                    client_id: apiCreds.gauthClientId,
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
                }, function (error) {
                    if (error === null) {
                        service.gAuthenticate(false);
                    }
                });
        };

        service.getProfile = function () {
            gapi.client.load('plus', 'v1').then(function () {
                var request = gapi.client.plus.people.get({
                    'userId': 'me'
                });
                request.then(function (resp) {
                    session.user = resp.result;
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

        return service;
    }

    session.$inject = ['apiCreds', '$http', 'okraAPI'];

    app.factory('session', session);

})();
