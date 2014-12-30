'use strict';

describe('Adding an Organization', function() {
    var ptor;
    var modal;
    var openModalBtn;

    beforeEach(function() {
        ptor = protractor.getInstance(); //gets the instance of protractor

        browser.get('http://localhost:3333/#/');

        ptor.waitForAngular(); //waits for angular to bootstrap

        openModalBtn = element(by.css('[ng-click="vm.addOrganization()"]'));
    });

    it('Should open the modal and close the modal', function() {
        modal = element(by.css('.md-dialog-container'));
        expect(modal.isPresent()).toBeFalsy();
        expect(browser.getLocationAbsUrl()).toMatch('/');
        openModalBtn.click();
        expect(modal.isPresent()).toBeTruthy();
        element(by.css('[ng-click="modal.closeModal()"]')).click();
        expect(modal.isPresent()).toBeFalsy();
    });

    it('Should validate if the fields are incorrect', function() {
        openModalBtn.click();
        var form = element(by.css('.form-horizontal')),
        	errorMsg = form.element(by.css('.error-msg')),
        	orgNameInput = form.element(by.model('modal.organizationName')),
        	submitFormBtn = element(by.css('[ng-click="modal.createOrganization(modal.organizationName)"]'));

      	submitFormBtn.click();
      	expect(browser.helpers.hasClass(errorMsg, 'ng-hide')).toBeFalsy();

      	orgNameInput.sendKeys('SomeOrg');
      	submitFormBtn.click();
      	expect(browser.helpers.hasClass(errorMsg, 'ng-hide')).toBeTruthy();
    });

});