'use strict';

describe('404: Page not found Error', function() {
    var ptor;

    beforeEach(function() {
        ptor = protractor.getInstance(); //gets the instance of protractor
    });

    it('Should go to a legal view and not reveal 404 error', function() {
        browser.get('http://localhost:3333/#/organization/someorg/trees');

        expect(browser.getLocationAbsUrl()).toMatch('/organization/someorg/trees');
    });

    it('Should reveal the 404 error if the route is not used/registered with the app', function() {
        browser.get('http://localhost:3333/#/notausedrouteoreverwillbe');

        expect(browser.getLocationAbsUrl()).toMatch('/404');
    });

});