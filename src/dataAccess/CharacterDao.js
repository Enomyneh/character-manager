function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

var store = require('store')

export default {

    saveLocally(character) {

        console.log("Saving locally");

        // Save the character
        if (!character.id) {
            character.id = uuidv4();
        }
        store.set(character.id, character);

        // Update the list of stored characters
        var characters = store.get("characters");
        if (!characters) characters = [];
        if (!characters.includes(character.id)) characters.push(character.id);
        store.set("characters", characters);
    }
};