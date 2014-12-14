'use strict';

angular.module('csStore', [
    'ngSanitize',
    'ngAnimate',
    'toggle-switch',
    'csStore.templates',
    'csStore.common',
    'csStore.routes',
    'csStore.events',
    'csStore.controls',
    'csStore.services',
    'csStore.filters',
    'csStore.controllers'
])


/**
 * Configuration
 */

.config(function ($httpProvider, $provide, $injector, StoreAnalyticsProvider, localStorageServiceProvider,
    ApiClientProvider, flashProvider) {

    var appConfig = $injector.get('appConfig');

    $httpProvider.defaults.useXDomain = true;

    $httpProvider.interceptors.push('HttpInterceptor');

    // Analytics Config
    StoreAnalyticsProvider.config(appConfig.analytics);

    // API Client Config
    ApiClientProvider.config({
        mode: appConfig.api.mode,
        api: {
            url: appConfig.api.url,
            version: appConfig.api.version,
            language: 'en'
        },
        oAuth: appConfig.oAuth,
        headers: {
            Authorization: 'Basic ' + appConfig.api.key
        }
    });

    // LocalStorage Config
    localStorageServiceProvider.setPrefix(appConfig.appName);

    // Custom BEM classes on angular-flash alerts
    flashProvider.errorClassnames.push('alert--error');
    flashProvider.successClassnames.push('alert--success');
    flashProvider.warnClassnames.push('alert--warning');
    flashProvider.infoClassnames.push('alert--info');
})


/**
 * Initialization
 */


.run(function ($http, $q, $templateCache, $log, $rootScope, Session, Cart, StoreAnalytics, Country, Currency,
    UserLocale, LoadingMask, templateOverrides) {

    LoadingMask.showFull();

    if (templateOverrides && templateOverrides.length) {
        angular.forEach(templateOverrides, function (o) {
            if (o.path && o.content) $templateCache.put(o.path, o.content);
        });
    }

    // Start a session
    Session.start().then(function () {
        StoreAnalytics.start();
        Cart.fetch();

        Raygun.setUser(Session.uid.getGlobal());
        trackJs.configure({
            userId: Session.uid.getGlobal()
        });
    });

    // Get user locale
    UserLocale.get();

    // warm the caches
    Country.fetch();
    Currency.fetch();

    // TODO: set language dynamically & remove
    // TODO: can this be moved into a service? What happens if the langs fail to load - DM
    $http.get('lang/en.json')
        .success(function (resp) {
            $rootScope.messages = resp;
        })
        .error(function (error) {
            $log.log('Error: ', error);
        });
});
