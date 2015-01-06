'use strict';
describe('AddOrganizationModalController', function () {
    var scope;
    var modalController;
    var element;
    var $httpBackend;
    var missionStatement;

    beforeEach(function () {
        module('okra');
    });

    beforeEach(inject(function ($controller, $rootScope, _$http_, OrganizationFactory, _$httpBackend_,
        $mdDialog, $compile) {
        scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
        missionStatement = 'This is a test mission statement';

        //Mock out the modal
        modalController = $controller('MissionStatementModalController', {
            $scope: scope,
            OrganizationFactory: OrganizationFactory,
            $mdDialog: $mdDialog,
            missionStatement: missionStatement
        });

        element = angular.element(
            '<form name="missionStatementForm">' +
            '<md-input-group class="long">' +
            '<label>New Mission Statement</label>' +
            '<md-input required name="newMissionStatement" ng-model="newMissionStatement" autocapitalize="off"></md-input>' +
            '</md-input-group>' +
            '</form>'
        );

        $compile(element)(scope);
        scope.$digest();

        modalController.missionStatementForm = scope.missionStatementForm;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });


    describe('Update/Add a mission statement', function () {

        it('Should instantiate up the controller for the modal', function () {
            expect(modalController).not.toBeUndefined();
        });

        it('Should validate properly if fields are not filled in', function () {
            expect(modalController.missionStatementForm.$valid).toBeFalsy();
            expect(modalController.formSubmitted).toBeFalsy();
            modalController.saveMissionStatement();
            expect(modalController.formSubmitted).toBeTruthy();
            expect(modalController.missionStatementForm.$valid).toBeFalsy();
        });

        it('Should validate properly if fields are correct and filled in', function () {
            expect(modalController.missionStatementForm.$valid).toBeFalsy();
            modalController.missionStatementForm.newMissionStatement.$setViewValue(
                'A new test mission statement');
            modalController.newMissionStatement = 'A new test mission statement';
            expect(modalController.missionStatementForm.$valid).toBeTruthy();
        });

        it('Should send the right data to the backend', function () {
            $httpBackend.expectPOST('http://localhost:8080/update/mission/someorg', {
                    mission: 'A new test mission statement',
                    treeId: '549dcbe9efb6f7204b000001'
                })
                .respond(200);

            modalController.missionStatementForm.newMissionStatement.$setViewValue(
                'A new test mission statement');
            modalController.newMissionStatement = 'A new test mission statement';

            modalController.saveMissionStatement();
            $httpBackend.flush();
        });

    });
});
