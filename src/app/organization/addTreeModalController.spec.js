'use strict';
describe('AddTreeModalController', function () {
    var scope;
    var modalController;
    var element;
    var $httpBackend;
    var organization;
    var hardCoded;

    beforeEach(function () {
        module('okra');
    });

    beforeEach(inject(function ($controller, $rootScope, _$http_, TreeFactory, _$httpBackend_,
        $mdDialog, $compile, _hardCoded_) {
        scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
        hardCoded = _hardCoded_;

        organization = 'someorg';

        //Mock out the modal
        modalController = $controller('AddTreeModalController', {
            $scope: scope,
            TreeFactory: TreeFactory,
            $mdDialog: $mdDialog,
            hardCoded: hardCoded,
            organization: organization
        });

        element = angular.element(
            '<form name="addTreeForm">' +
            '<md-input-container>' +
            '<label>Tree Name</label>' +
            '<md-input required name="newTreeName" ng-model="newTreeName" autocapitalize="off"></md-input>' +
            '</md-input-container>' +
            '<md-radio-group class="horizontal-radio-group" layout="row" ng-model="timeframe">' +
            '<md-radio-button value="monthly" aria-label="Monthly"> Monthly </md-radio-button>' +
            '<md-radio-button value="yearly" artial-label="Yearly"> Yearly </md-radio-button>' +
            '</md-radio-group>' +
            '</form>'
        );

        $compile(element)(scope);
        scope.$digest();

        modalController.addTreeForm = scope.addTreeForm;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });


    describe('Add a Tree', function () {

        it('Should instantiate up the controller for the modal', function () {
            expect(modalController).not.toBeUndefined();
        });

        it('Should validate properly if fields are not filled in', function () {
            expect(modalController.addTreeForm.$valid).toBeFalsy();
            expect(modalController.formSubmitted).toBeFalsy();
            modalController.addTree();
            expect(modalController.formSubmitted).toBeTruthy();
        });

        it('Should validate properly if fields are correct and filled in', function () {
            expect(modalController.addTreeForm.$valid).toBeFalsy();
            modalController.addTreeForm.newTreeName.$setViewValue('testTree');
            modalController.newTreeName = 'testTree';
            expect(modalController.addTreeForm.$valid).toBeTruthy();
        });

        it('Should send the right data to the backend', function () {
            $httpBackend.expectPOST('http://localhost:8080/create/tree/someorg', {
                    treeName: 'testTree',
                    timeframe: 'monthly',
                    userId: hardCoded.userId,
                    username: hardCoded.userName
                })
                .respond(200, {
                    message: 'Success',
                    tree: 'testTree'
                });

            modalController.addTreeForm.newTreeName.$setViewValue('testTree');
            modalController.newTreeName = 'testTree';

            modalController.timeframe = 'monthly';

            modalController.addTree();
            $httpBackend.flush();
        });

    });
});
