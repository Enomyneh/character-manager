/*jshint esversion: 6 */

function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

var store = require('store');
import Character from '../models/Character.js';

export default {

    saveLocally(character) {

        console.log("Saving locally");

        // Save the character
        if (!character.id) {
            character.id = uuidv4();
        }
        store.set(character.id, character);

        // Update the list of stored characters
        var characterIds = this.getLocalCharacterIds();
        if (!characterIds.includes(character.id)) characterIds.push(character.id);
        store.set("characters", characterIds);
    },

    loadLocally(id) {
        return new Character(store.get(id));
    },

    getLocalCharacterIds() {
        var characters = store.get("characters");
        if (!characters) return [];
        return characters;
    },

    exportJson(character) {
        var name = prompt("Export as", character.name + '.json');
        if (!name || name === undefined || name === "") {
            name = 'character.json';
        }

        var text = encodeURIComponent(JSON.stringify(character));
        var data = "data:text/json;charset=utf-8," + text;

        var hf = document.createElement('a');

        hf.href = data;
        hf.download = name;
        hf.innerHTML = hf.download;
        document.getElementsByTagName("body")[0].appendChild(hf);
        hf.click();
        document.getElementsByTagName("body")[0].removeChild(hf);
    }

};