'use strict';
describe('TreeFactory', function () {
    var TreeFactory;
    var trees;
    var formattedTrees;

    beforeEach(function () {
        module('okra');
    });

    beforeEach(inject(function (_TreeFactory_) {
        TreeFactory = _TreeFactory_;

        trees = [{
            "Name": "Monthly 12/14",
            "Id": "549dcb2befb6f7203e000001",
            "Active": true
        }, {
            "Name": "yearly 12/14",
            "Id": "549dcbe9efb6f7204b000001",
            "Active": true
        }, {
            "Name": "Make bread",
            "Id": "549dcbf2efb6f7204b000002",
            "Active": true
        }];
    }));

    describe('formatTrees should take in trees and format properly', function () {

        it('Should inject the TreeFactory', function () {
            expect(TreeFactory).not.toBeUndefined();
        });

        it('Should take in less than four trees and return an array with one array nested inside',
            function () {
                formattedTrees = TreeFactory.formatTrees(trees);
                expect(formattedTrees.length).toBe(1);
            });

        it('Should take in more than four trees and return an array with two arrays nested inside',
            function () {
                trees.push({
                    "Name": "Make bread",
                    "Id": "549dcbf2efb6f7204b000002",
                    "Active": true
                }, {
                    "Name": "Make bread",
                    "Id": "549dcbf2efb6f7204b000002",
                    "Active": true
                });
                formattedTrees = TreeFactory.formatTrees(trees);
                expect(formattedTrees.length).toBe(2);
            });

    });
});
