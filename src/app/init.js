'use strict';

/**
 * App Bootstrapper
 * Call in remote configs, and set to constants
 * Load main app into document when successful
 */

angular.element(document).ready(function () {

    /**
     * App Base Configuration
     */

    var LOCAL = false,
        ANALYTICS_DOMAINS = ['crowdsurge.com'];

    var api_endpoint = LOCAL ? "cs.local" : "i-api2.crowdsurge.com",
        config_service = LOCAL ? "cs.local:4070" : "i-config.crowdsurge.com";

    // Application Settings
    var appName = 'csStore';

    // Config API Settings
    var config = {
        ref: 'e-store',
        path: '/config/v1?key=',
        fallback: config_service
    };

    // Store API Settings
    var api = {
        key: 'bmdzdG9yZTpjNDNjYmJkYjkxMjRkNmEyNjU0ODA1ZWJlZmU0MjYwMg',
        ver: '2.0'
    };

    // Analytics Settings
    var analytics = {
        domains: ANALYTICS_DOMAINS,
        gaTrackingCode: 'UA-50374258-2',
        mixpanelId: 'b59669ff3b1872857d56db2a13bf4d1f',
        raygunKey: 'YT7V6sOZzDESWixqLsgjFg==',
        trackJsKey: '631c3af236f54432854c4eef5d039760'
    };


    /**
     * Start JS Error Tracker
     */

    Raygun.init(analytics.raygunKey).attach();


    /**
     * Initialise Bootstrapper
     */

    // Extract Store ID from URL
    var urlPath = window.location.hash.split('/'),
        storeKey = urlPath[1];


    // Setup Angular Functions
    var initInjector = angular.injector(['ng']),
        $http = initInjector.get('$http'),
        $q = initInjector.get('$q'),
        $log = initInjector.get('$log') || window.console;

    // TODO: eventually Id like the templates to be pre-packaged into a js file and just included as custom_js - DM
    function loadTemplateOverrides(templates) {
        var promises = [];

        if (!templates) return $q.when();

        angular.forEach(templates, function (v, k) {
            var d = $q.defer();

            $http({
                method: 'GET',
                url: v,
                headers: {
                    'Content-Type': 'text/html; charset=utf-8'
                }
            }).then(function (resp) {
                d.resolve({
                    path: k,
                    content: resp.data
                });
            }).catch(function (error) {
                $log.error("Error loading template", v, error);
                d.resolve({});
            });

            promises.push(d.promise);
        });

        return $q.all(promises);
    }

    // App Config Generator
    var createConfig = function createConfig(conf) {
        return {
            "appName": appName,
            "devMode": false,
            "environment": conf.environment,
            "api": {
                "mode": 'oauth',
                "key": api.key,
                "url": 'https://' + conf.api_endpoint + '/e-store',
                "version": api.ver
            },
            oAuth: {
                endpoint: 'https://' + conf.api_endpoint + '/auth/1.0/app/authorize',
                publicToken: 'be3dc91f555749465a46be4e94566419'
            },
            analytics: analytics
        };
    };


    /**
     * Setup External Config Calls
     */

    var getConfigs = function getConfigs(endpoint) {
        var done = 0,
            d = $q.defer();

        // Build endpoint URLs
        endpoint = 'https://' + endpoint + config.path;

        var appConfigUrl = endpoint + config.ref,
            storeConfigUrl = endpoint + storeKey;

        // Create an ng-constant, and resolve when all complete
        function complete(key, value) {
            angular.module(appName).constant(key, value);
            if (++done === 3) d.resolve();
        }

        $http.get(appConfigUrl)
            .success(function (resp) {
                complete('appConfig', createConfig(resp));
            })
            .error(function (error) {
                $log.warn('Warning: Could not get app config. Using fallback.', endpoint);

                complete('appConfig', createConfig({
                    api_endpoint: api_endpoint,
                    config_service: config_service
                }));
            });

        $http.get(storeConfigUrl)
            .success(function (resp) {
                resp.store_key = storeKey;
                complete('storeConfig', resp);
                loadTemplateOverrides(resp.custom_templates)
                    .then(function (templates) {
                        complete('templateOverrides', templates);
                    });
            })
            .error(function (error) {
                // We fail this as we can't do anything without a store config
                $log.error('Error: Store Config API responded with ' + error ? error.status : 'unknown',
                    error);

                // TODO: This is, obviously, temporary.
                // We'll redirect to a proper standalone 404 page later.
                document.body.innerHTML = [
                    '<div style="text-align: center;">',
                    '<h1>Error</h1>',
                    '<span style="color: #666;">Store with key',
                    '<strong>' + storeKey + '</strong>',
                    'Not Found</span>',
                    '</div>'
                ].join(' ');

                return false;
            });

        return d.promise;
    };

    var init = function init(endpoint) {
        getConfigs(endpoint).then(function () {
            angular.bootstrap(document, [appName]);
        });
    };


    /**
     * Run Bootstrapper
     */

    $http.get('/bootstrapper.json').then(function (resp) {
        init(resp.data.config_endpoint);
    }, function (error) {
        init(config.fallback);
    });
});
