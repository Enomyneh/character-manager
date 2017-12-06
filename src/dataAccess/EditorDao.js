/*jshint esversion: 6 */

function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

var store = require('store');

export default {

    saveOptions(options) {
        console.log("Saving options to browser");

        store.set("character-manager-options", options);
    },

    loadOptions() {
        var options = store.get("character-manager-options");
        if (!options) { options = getDefaultOptions(); }

        return options;
    },

    getDefaultOptions() {
        return {};
    }
};