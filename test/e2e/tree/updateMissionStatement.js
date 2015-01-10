'use strict';

describe('Updating mission modal', function() {
    var ptor;
    var modal;
    var openModalBtn;

    beforeEach(function() {
        ptor = protractor.getInstance(); //gets the instance of protractor

        browser.get('http://localhost:3333/#/organization/someorg/tree/someTree');

        ptor.waitForAngular(); //waits for angular to bootstrap

        openModalBtn = element(by.css('[ng-click="vm.openMissionStatementModal()"]'));
    });

    it('Should open the modal and close the modal', function() {
        modal = element(by.css('.md-dialog-container'));
        expect(modal.isPresent()).toBeFalsy();
        openModalBtn.click();
        expect(modal.isPresent()).toBeTruthy();
        element(by.css('[ng-click="modal.closeModal()"]')).click();
        expect(modal.isPresent()).toBeFalsy();
    });

    it('Should validate if the fields are incorrect', function() {
        openModalBtn.click();
        var form = element(by.css('.form-horizontal')),
        	errorMsg = form.element(by.css('.error-msg')),
        	missionStatementInput = form.element(by.model('modal.newMissionStatement')),
        	submitFormBtn = element(by.css('[ng-click="modal.saveMissionStatement()"]'));

      	submitFormBtn.click();
      	expect(browser.helpers.hasClass(errorMsg, 'ng-hide')).toBeFalsy();

      	missionStatementInput.sendKeys('Some Mission Statement');
        expect(browser.helpers.hasClass(errorMsg, 'ng-hide')).toBeTruthy();
      	submitFormBtn.click();
        expect(element(by.css('.md-dialog-container')).isPresent()).toBeFalsy();
    });

});