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

    function session($http, $state, $timeout, $mdToast, $q, okraAPI, ipCookie) {

        var service = {};

        service.gAuthenticate = function (isSilent) {

            var currentTime = new Date().getTime(),
                previousTokenExpiration = ipCookie('okTokenExpirationDate') * 1000;

            gapi.client.setApiKey(service.authCreds.gApiKey);

            gapi.auth.authorize({
                    client_id: service.authCreds.gauthClientId,
                    scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
                    immediate: isSilent
                })
                .then(function (response) {
                    if (response.access_token) {
                        session.auth = {
                            accessToken: response.access_token,
                            tokenLifespan: response.expires_in
                        };
                        ipCookie('okTokenExpirationDate', response.expires_at);
                        service.getProfile(isSilent);
                        session.isAuthenticating = false;
                    }
                }, function (response) {
                    console.log('Silent login failed');
                    session.isAuthenticating = false;
                });
        };

        service.getProfile = function (isSilent) {
            gapi.client.load('plus', 'v1').then(function () {
                var request = gapi.client.plus.people.get({
                    'userId': 'me'
                });
                request.then(function (response) {
                    service.user = response.result;
                    service.updateUser(response.result)
                        .then(function (response) {
                            if ($state.current.name == "login") {
                                $state.go('organizations');
                            }
                            if (!isSilent) {
                                $mdToast.show(
                                    $mdToast.simple()
                                    .content('Welcome ' + service.user.displayName)
                                    .position('top right')
                                    .hideDelay(3000)
                                );
                            }
                            //refresh the auth token in 40 minutes if the user remains active on the app
                            service.beginAuthCountdown(2400000);

                        });

                }, function (response) {
                    //invalid credentials let's authenticate and try again
                    if (response.error === '401') {
                        service.gAuthenticate(true);
                    }
                });
            });
        };

        service.updateUser = function (user) {
            var userName = user.emails[0].value.match(/^.*(?=(\@))/g)[0],
                displayName = user.displayName,
                googleId = user.id,
                deferred = $q.defer();

            //look for the user on the backend to update user obj or register
            $http.get(okraAPI.getUser + userName).then(function (response) {
                if (response) {
                    if (!response.data.Success[userName]) {
                        $http.post(okraAPI.registerUser, {
                            username: userName,
                            displayName: displayName,
                            gid: googleId
                        });
                    } else {
                        service.user._id = response.data.Success[userName];
                        service.user.username = userName;
                    }
                    deferred.resolve(service.user);
                }
                deferred.reject('Error');
            });

            return deferred.promise;
        };

        service.beginAuthCountdown = function (time) {
            service.authCountdown = $timeout(function () {
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

        service.logOut = function () {
            //cancel the refresh timer
            $timeout.cancel(service.authCountdown);
            $state.go('login');
            service.user = undefined;
        };

        return service;
    }

    session.$inject = ['$http', '$state', '$timeout', '$mdToast', '$q', 'okraAPI', 'ipCookie'];

    app.factory('session', session);

})();
