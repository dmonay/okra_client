'use strict';

describe('Registration Form Modal', function() {
  var ptor;
  var usernameField;
  var passwordField;
  var loginButton;
  var logoutButton;

  beforeEach(function(){
    ptor = protractor.getInstance(); //gets the instance of protractor

    browser.get('http://localhost:1337/#/');

    ptor.waitForAngular(); //waits for angular to bootstrap

    element(by.css('[ng-click="vm.openLogin()"]')).click();
    usernameField = element(by.model('modal.username'));
    passwordField = element(by.model('modal.password'));
    loginButton = element(by.css('[ng-click="modal.login()"]'));

    usernameField.sendKeys('someusername');
    passwordField.sendKeys('somepassword');

    loginButton.click();

  });

  it('Should route the user to the rated trailers when clicked', function() {
      expect(browser.getLocationAbsUrl()).toMatch('/');
      
      var ratedTrailers = element(by.linkUiSref('/rated-trailers'));
      var dropdown = element(by.css('[ng-click="vm.dropdown.isopen = !vm.dropdown.isopen;"]'));

      dropdown.click();

      ratedTrailers.click();

      expect(browser.getLocationAbsUrl()).toMatch('/rated-trailers');
  });

});