'use strict';

module.exports = {
    clickElement: function (dataRef) {
        element(by.dataRef(dataRef)).click();
    },
    inputKeys: function (dataRef, keys) {
        element(by.dataRef(dataRef)).sendKeys(keys);
    },
    findElement: function (dataRef) {
        element(by.dataRef(dataRef));
    }
}