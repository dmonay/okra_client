'use strict';

describe('Okra Front End Routes', function() {
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

    it('Should Navigate to the login view', function() {
        browser.get('http://localhost:3333/#/');

        expect(browser.getLocationAbsUrl()).toMatch('/');
    });

    it('Should Navigate to the login view', function() {
        browser.get('http://localhost:3333/#/organization/someorg/tree/132');

        expect(browser.getLocationAbsUrl()).toMatch('/organization/someorg/tree/132');
    });

    it('Should Navigate to the login view', function() {
        browser.get('http://localhost:3333/#/organization/someorg/trees');

        expect(browser.getLocationAbsUrl()).toMatch('/organization/someorg/trees');
    });

});