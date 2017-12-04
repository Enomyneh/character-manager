/*jshint esversion: 6 */

import attributes from '../data/attributes.json';
import skills from '../data/skills.json';
import arcana from '../data/arcana.json';
import gnosis from '../data/gnosis.json';

console.log("Initialising Character definition");

var defaults = [
    { "key": "name", "value": "Unnamed Character" },
    { "key": "age", "value": 0 },
    { "key": "player", "value": "Player name here" },
    { "key": "chronicle", "value": "" },
    { "key": "concept", "value": "" },
    { "key": "virtue", "value": "" },
    { "key": "vice", "value": "" },

    { "key": "notes", "value": "" },
    { "key": "noteSections", "value": [] },
    { "key": "logs", "value": [] },
    { "key": "editMode", "value": "free" },

    { "key": "size", "value": 5 },
    { "key": "gnosis", "value": 1 },
    { "key": "wisdom", "value": 7 },
    { "key": "spentWillpowerDots", "value": 0 },
    { "key": "experience", "value": 0 },
    { "key": "cabalExperience", "value": 0 },
    { "key": "arcaneExperience", "value": 0 },

    { "key": "bashingDamage", "value": 0 },
    { "key": "lethalDamage", "value": 0 },
    { "key": "aggravatedDamage", "value": 0 },

    { "key": "flaws", "value": [] },
    { "key": "merits", "value": [] },
    { "key": "derangements", "value": [] },
    { "key": "activeSpells", "value": [] },
    { "key": "starredSpells", "value": [] },
    { "key": "rotes", "value": [] },
    { "key": "inventory", "value": [] },
    { "key": "inventorySections", "value": [] },
    { "key": "specialties", "value": {} },

];

// Skills
skills.forEach(function (skill) {
    defaults.push({ "key": skill.name.toLowerCase(), "value": 0 });
}, this);

// Attributes
attributes.forEach(function (attribute) {
    defaults.push({ "key": attribute.name.toLowerCase(), "value": 1 });
}, this);

// Arcana
arcana.forEach(function (arcanum) {
    defaults.push({ "key": arcanum.name.toLowerCase(), "value": 0 });
}, this);


// This is specificallly a Mage the Awakening Character
export default class Character {

    constructor(character) {

        console.log("Creating Character");
        var newCharacter = (character === undefined);

        if (!newCharacter) {
            for (var property in character) {
                if (character.hasOwnProperty(property)) {
                    this[property] = character[property];
                }
            }
        }

        // Ensure all fields are intialised
        defaults.forEach(function (de) {
            this.initialiseField(de.key, de.value, newCharacter);
        }, this);

        // Starting Values
        this.initialiseField('willpower', this.maxWillpower(), newCharacter);
        this.initialiseField('mana', this.wisdom, newCharacter);

        // Check for historic values
        if (this.notes) {
            this.noteSections.push({ "title": "Migrated text", "text": this.notes });
            this.notes = undefined;
        }
    }

    initialiseField(fieldName, defaultValue, newCharacter) {
        if (!this[fieldName]) {
            this[fieldName] = defaultValue;
            if (!newCharacter) {
                console.log("Initialising field on established character: " + fieldName);
            }
        }
    }

    incrementValue(fieldName) {
        console.log("Increment " + fieldName);
        var min = 1;
        var max = 5;
        var newValue = Math.min(max, Math.max(this[fieldName.toLowerCase()] + 1, min));
        this[fieldName.toLowerCase()] = newValue;
    }

    decrementValue(fieldName) {
        console.log("Decrement " + fieldName);
        var min = 1;
        var max = 5;
        var newValue = Math.min(max, Math.max(this[fieldName.toLowerCase()] - 1, min));
        this[fieldName.toLowerCase()] = newValue;
    }

    // Arcana
    adjustArcana(name, amount) {
        var min = 0;
        var max = 5;
        var newValue = Math.min(max, Math.max(this[name.toLowerCase()] + amount, min));
        this[name.toLowerCase()] = newValue;
    }

    // Merits
    adjustMeritDots(index, amount) {
        var min = 0;
        var max = 15;
        var newValue = Math.min(max, Math.max(this.merits[index].dots + amount, min));
        this.merits[index].dots = newValue;
    }

    // Strength
    carryingCapacity() {

        return this.strength * 25 + "lbs (" + this.strength * 11.4 + "kg)";
    };

    // Willpower
    maxWillpowerDots() {
        return this.resolve + this.composure;
    }
    maxWillpower() {
        return this.maxWillpowerDots() - this.spentWillpowerDots;
    }

    adjustWillpower(amount) {
        this.logUpdate("willpower", () =>
            this.willpower = Math.min(this.maxWillpower(), Math.max(this.willpower + amount, 0))
        );
    }
    adjustWillpowerDots(amount) {
        this.spentWillpowerDots = Math.min(this.maxWillpowerDots(), Math.max(this.spentWillpowerDots + amount, 0))
    }

    // Mana
    maxMana() {
        return this.getGnosisData(this.gnosis).maxMana;
    }

    maxManaPerTurn() {
        return this.getGnosisData(this.gnosis).maxManaPerTurn;
    };

    adjustMana(amount) {
        this.logUpdate("mana", () =>
            this.mana = Math.min(this.maxMana(), Math.max(this.mana + amount, 0))
        );
    };

    // Gnosis
    adjustGnosis(amount) {
        this.logUpdate("gnosis", () =>
            this.gnosis = Math.min(10, Math.max(this.gnosis + amount, 1))
        );
    };

    // Spells
    isSpellStarred(spellName) {
        return this.starredSpells.includes(spellName);
    }

    maxActiveSpells() {
        return this.gnosis + 3;
    }

    currentActiveSpells() {
        return this.activeSpells.filter(spell => spell.castByMe).length;
    }

    spellsCastOnCharacter() {
        return this.activeSpells.filter(spell => spell.castOnMe).length;
    }

    getGnosisData(gnosisLevel) {
        return gnosis.filter(g => g.level == gnosisLevel)[0];
    }

    physicalLimit() {
        return this.getGnosisData(this.gnosis).physicalLimit;
    }

    spellTolerance() {
        return this.stamina;
    }

    spellAccumulationPenalty() {
        return Math.min(0, this.spellTolerance() - this.spellsCastOnCharacter());
    }

    // Defense
    defense() {
        return Math.min(this.dexterity, this.wits);
    }

    initiativeMod() {
        return this.dexterity + this.composure;
    }

    speed() {
        return this.dexterity + this.strength + 5;
    }

    updateSkillSpecialty(skill, value) {
        var before = this.specialties[skill];
        this.specialties[skill] = value;
        var after = this.specialties[skill];
        this.log(skill + "-specialty", before, after);
    }

    // Notes
    updateNotes(newValue) {
        this.logUpdate("notes", () => this.notes = newValue);
    }

    // Logging
    log(field, oldValue, newValue) {
        if (this.logs.length > 0 && this.logs[this.logs.length - 1].field == field) {
            this.logs[this.logs.length - 1].newValue = newValue;
            this.logs[this.logs.length - 1].time = Date.now();
        } else {
            this.logs.push({
                "editMode": this.editMode,
                "field": field,
                "oldValue": oldValue,
                "newValue": newValue,
                "time": Date.now()
            });
        }
    }

    logUpdate(fieldName, func) {
        var before = this[fieldName];
        func();
        var after = this[fieldName];
        this.log(fieldName, before, after);
    }

    // Damage and Health
    maxHealth() {
        return this.size + this.stamina;
    }

    healthRollPenalty() {
        return Math.min(0, this.maxHealth() - this.getTotalDamageBlocks() - 3);
    }

    getTotalDamageBlocks() {
        return this.bashingDamage + this.lethalDamage + this.aggravatedDamage;
    }

    isDead() {
        return this.aggravatedDamage >= this.maxHealth();
    }

    addBashingDamage() {

        // Don't bother once they are dead.  You're literally flogging a dead character.
        if (this.isDead()) return;

        // If there are empty blocks, just use them.
        if (this.getTotalDamageBlocks() < this.maxHealth()) {
            this.logUpdate("bashingDamage", () => this.bashingDamage++);
            return;
        }

        // If there is already bashing damage, upgrade to lethal
        if (this.bashingDamage > 0) {
            this.logUpdate("bashingDamage", () => this.bashingDamage--);
            this.logUpdate("lethalDamage", () => this.lethalDamage++);
            return;
        }

        // If there is already lethal damage, upgrade to aggravated.
        if (this.lethalDamage > 0) {
            this.logUpdate("lethalDamage", () => this.lethalDamage--);
            this.logUpdate("aggravatedDamage", () => this.aggravatedDamage++);
            return;
        }

        // By this stage, they should be dead.
    }

    addLethalDamage() {
        // Don't bother once they are dead.  You're literally flogging a dead character.
        if (this.isDead()) return;

        // If there are empty blocks, just use them.
        if (this.getTotalDamageBlocks() < this.maxHealth()) {
            this.logUpdate("lethalDamage", () => this.lethalDamage++);
            return;
        }

        // If there is already bashing damage, upgrade to lethal
        if (this.bashingDamage > 0) {
            this.logUpdate("bashingDamage", () => this.bashingDamage--);
            this.logUpdate("lethalDamage", () => this.lethalDamage++);
            return;
        }

        // If there is already lethal damage, upgrade to aggravated.
        if (this.lethalDamage > 0) {
            this.logUpdate("lethalDamage", () => this.lethalDamage--);
            this.logUpdate("aggravatedDamage", () => this.aggravatedDamage++);
            return;
        }

        // By this stage, they should be dead.
    }

    addAggravatedDamage() {
        // Don't bother once they are dead.  You're literally flogging a dead character.
        if (this.isDead()) return;

        // If there are empty blocks, just use them.
        if (this.getTotalDamageBlocks() < this.maxHealth()) {
            this.logUpdate("aggravatedDamage", () => this.aggravatedDamage++);
            return;
        }

        // If there is already bashing damage, upgrade to aggravated
        if (this.bashingDamage > 0) {
            this.logUpdate("bashingDamage", () => this.bashingDamage--);
            this.logUpdate("aggravatedDamage", () => this.aggravatedDamage++);
            return;
        }

        // If there is already lethal damage, upgrade to aggravated.
        if (this.lethalDamage > 0) {
            this.logUpdate("lethalDamage", () => this.lethalDamage--);
            this.logUpdate("aggravatedDamage", () => this.aggravatedDamage++);
            return;
        }

        // By this stage, they're dead.
    }

    healDamage(type, amount) {

        switch (type) {
            case 'A':
                this.logUpdate("aggravatedDamage", () => this.aggravatedDamage = Math.min(this.getTotalDamageBlocks(), Math.max(0, this.aggravatedDamage - amount)));
                break;
            case 'L':
                this.logUpdate("lethalDamage", () => this.lethalDamage = Math.min(this.getTotalDamageBlocks(), Math.max(0, this.lethalDamage - amount)));
                break;
            case 'B':
                this.logUpdate("bashingDamage", () => this.bashingDamage = Math.min(this.getTotalDamageBlocks(), Math.max(0, this.bashingDamage - amount)));
                break;
        }
    }

}