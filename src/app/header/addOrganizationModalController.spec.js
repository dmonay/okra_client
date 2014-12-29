'use strict';
describe('AddOrganizationModalController', function () {
    var scope;
    var modalController;
    var element;
    var $httpBackend;

    beforeEach(function () {
        module('okra');
    });

    beforeEach(inject(function ($controller, $rootScope, _$http_, OrganizationFactory, _$httpBackend_,
        $mdDialog, $compile) {
        scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;

        //Mock out the modal
        modalController = $controller('AddOrganizationModalController', {
            $scope: scope,
            OrganizationFactory: OrganizationFactory,
            $mdDialog: $mdDialog
        });

        element = angular.element(
            '<form name="organizationForm">' +
            '<md-input-group>' +
            '<label>Organization Name</label>' +
            '<md-input required name="organizationName" ng-model="organizationName" autocapitalize="off"></md-input>' +
            '</md-input-group>' +
            '</form>'
        );

        $compile(element)(scope);
        scope.$digest();

        modalController.organizationForm = scope.organizationForm;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });


    describe('Add an organization', function () {

        it('Should instantiate up the controller for the modal', function () {
            expect(modalController).not.toBeUndefined();
        });

        it('Should validate properly if fields are not filled in', function () {
            expect(modalController.organizationForm.$valid).toBeFalsy();
            expect(modalController.formSubmitted).toBeFalsy();
            modalController.createOrganization('');
            expect(modalController.formSubmitted).toBeTruthy();
        });

        it('Should validate properly if fields are correct and filled in', function () {
            expect(modalController.organizationForm.$valid).toBeFalsy();
            modalController.organizationForm.organizationName.$setViewValue('testOrg');
            modalController.organizationName = 'testOrg';
            expect(modalController.organizationForm.$valid).toBeTruthy();
        });

        it('Should send the right data to the backend', function () {
            $httpBackend.expectPOST('http://localhost:8080/create/organization', {
                    organization: 'testOrg',
                    userId: '5491e2aebee23fc7375b789c'
                })
                .respond(200, {
                    message: 'Success',
                    organization: 'testOrg'
                });

            modalController.organizationForm.organizationName.$setViewValue('testOrg');
            modalController.organizationName = 'testOrg';

            modalController.createOrganization('testOrg');
            $httpBackend.flush();
        });

    });
});
