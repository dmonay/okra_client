'use strict';

describe('okDecryptFilter and okEncryptFilter', function () {
    var scope;
    var $filter;
    var string = 'aSecretMessage';
    var encryptedString;

    beforeEach(function () {
        module('okra');
    });

    beforeEach(inject(function ($rootScope, _$filter_) {
        scope = $rootScope.$new();
        $filter = _$filter_;
    }));

    describe('Decrypting a string', function () {

        it('Should properly encrypt a string', function () {
            encryptedString = $filter('okEncrypt')(string);
            expect(encryptedString.length > 0).toBeTruthy();
        });

        it('Should properly decrypt an encrypted string', function () {
            expect($filter('okDecrypt')(encryptedString)).toBe(string);
        });

    });
});
