/*jshint esversion: 6 */

var Chance = require('chance');
import Character from '../models/Character.js';
import attributes from '../data/attributes.json';
import skills from '../data/skills.json';
import virtues from '../data/virtues.json';
import vices from '../data/vices.json';
import paths from '../data/paths.json';
import orders from '../data/orders.json';
import flaws from '../data/flaws.json';
import merits from '../data/merits.json';
import arcana from '../data/arcana.json';


export default class CharacterGenerator {

    constructor() { }

    generateRandomCharacter() {
        console.log("Generating random character");

        var influences = [];
        var character = new Character();
        character.gender = chance.gender();

        character.nameParts = {};
        character.nameParts.prefix = '';
        // character.nameParts.prefix = chance.prefix({ gender: character.gender });
        character.nameParts.first = chance.first({ gender: character.gender });
        character.nameParts.last = chance.last();
        character.nameParts.suffix = '';
        // character.nameParts.suffix = chance.suffix();

        character.name = (character.nameParts.prefix + ' ' + character.nameParts.first + ' ' + character.nameParts.last + ' ' + character.nameParts.suffix).trim();
        character.birthday = chance.birthday();
        character.countryOfBirth = chance.country({ full: true });
        character.age = Math.floor((Date.now() - character.birthday) / (1000 * 60 * 60 * 24 * 365));

        character.concept = chance.profession();

        character.cabal = chance.company();

        character.path = chance.pickone(paths).name;
        character.order = chance.pickone(orders).name;


        var virtue = chance.pickone(virtues);
        character.virtue = virtue.name;
        influences.push(chance.pickone(virtue.possessedBy));

        var vice = chance.pickone(vices);
        character.vice = vice.name;
        influences.push(chance.pickone(vice.possessedBy));


        character.wisdom = chance.integer({ min: 1, max: 10 });
        character.gnosis = chance.integer({ min: 1, max: 10 });

        // Starting Values
        character.bashingDamage = chance.integer({ min: 0, max: 2 });
        character.lethalDamage = chance.integer({ min: 0, max: 2 });
        character.aggravatedDamage = chance.integer({ min: 0, max: 2 });
        character.willpower = chance.integer({ min: 0, max: character.maxWillpower() });
        character.mana = chance.integer({ min: 0, max: character.maxMana() });

        character.derangements = [];

        character.flaws = chance.pickset(flaws, chance.integer({ min: 0, max: 2 })).map(function (flaw) {
            return {
                name: flaw.name
            };
        });

        character.merits = chance.pickset(merits, chance.integer({ min: 0, max: 7 })).map(function (merit) {
            return {
                name: merit.name,
                dots: 1
            };
        });

        // Attributes
        attributes.forEach(function (attribute) {
            character[attribute.name.toLowerCase()] = chance.integer({ min: 1, max: 5 });
        }, this);

        // Skills
        skills.forEach(function (skill) {
            character[skill.name.toLowerCase()] = chance.integer({ min: 0, max: 5 });

            if (character[skill.name.toLowerCase()] > chance.integer({ min: 1, max: 5 })) {
                influences.push(chance.pickone(skill.possessedBy));
                if (!character.specialties[skill.name.toLowerCase()]) character.specialties[skill.name.toLowerCase()] = "";
                character.specialties[skill.name.toLowerCase()] += chance.pickone(skill.specialties);
            }

        }, this);

        // Arcana
        arcana.forEach(function (arcanum) {
            character[arcanum.name.toLowerCase()] = chance.integer({ min: 0, max: 5 });
        }, this);

        character.notes += "Born in " + character.countryOfBirth + " on " + character.birthday + ".  ";
        character.notes += "Influenced by " + influences.join(", ") + ".";

        return character;

    }
}

// define([
//     "models/Character",
//     "chance",
//     'json!data/attributes.json',
//     'json!data/skills.json',
//     'json!data/virtues.json',
//     'json!data/vices.json',
//     'json!data/paths.json',
//     'json!data/orders.json',
//     'json!data/flaws.json',
//     'json!data/merits.json',
//     'json!data/arcana.json'
// ], function (
//     Character,
//     Chance,
//     attributes,
//     skills,
//     virtues,
//     vices,
//     paths,
//     orders,
//     flaws,
//     merits,
//     arcana) {

//         function CharacterGenerator() {
//             console.log("Initialising CharacterGenerator definition");

//             // methods
//             this.initialize = function () {
//                 console.log("Creating CharacterGenerator");
//             };

//             this.generateRandomCharacter = function () {
//                 console.log("Generating random character");

//                 var influences = [];
//                 var character = new Character();
//                 character.gender = chance.gender();

//                 character.nameParts = {};
//                 character.nameParts.prefix = '';
//                 // character.nameParts.prefix = chance.prefix({ gender: character.gender });
//                 character.nameParts.first = chance.first({ gender: character.gender });
//                 character.nameParts.last = chance.last();
//                 character.nameParts.suffix = '';
//                 // character.nameParts.suffix = chance.suffix();

//                 character.name = (character.nameParts.prefix + ' ' + character.nameParts.first + ' ' + character.nameParts.last + ' ' + character.nameParts.suffix).trim();
//                 character.birthday = chance.birthday();
//                 character.countryOfBirth = chance.country({ full: true });
//                 character.age = Math.floor((Date.now() - character.birthday) / (1000 * 60 * 60 * 24 * 365));

//                 character.concept = chance.profession();

//                 character.cabal = chance.company();

//                 character.path = chance.pickone(paths).name;
//                 character.order = chance.pickone(orders).name;


//                 var virtue = chance.pickone(virtues);
//                 character.virtue = virtue.name;
//                 influences.push(chance.pickone(virtue.possessedBy));

//                 var vice = chance.pickone(vices);
//                 character.vice = vice.name;
//                 influences.push(chance.pickone(vice.possessedBy));


//                 character.wisdom = chance.integer({ min: 1, max: 10 });
//                 character.gnosis = chance.integer({ min: 1, max: 10 });

//                 // Starting Values
//                 character.bashingDamage = chance.integer({ min: 0, max: 2 });
//                 character.lethalDamage = chance.integer({ min: 0, max: 2 });
//                 character.aggravatedDamage = chance.integer({ min: 0, max: 2 });
//                 character.willpower = chance.integer({ min: 0, max: character.maxWillpower() });
//                 character.mana = chance.integer({ min: 0, max: character.maxMana() });

//                 character.derangements = [];

//                 character.flaws = chance.pickset(flaws, chance.integer({ min: 0, max: 2 })).map(function (flaw) {
//                     return {
//                         name: flaw.name
//                     };
//                 });

//                 character.merits = chance.pickset(merits, chance.integer({ min: 0, max: 7 })).map(function (merit) {
//                     return {
//                         name: merit.name,
//                         dots: 1
//                     };
//                 });

//                 // Attributes
//                 attributes.forEach(function (attribute) {
//                     character[attribute.name.toLowerCase()] = chance.integer({ min: 1, max: 5 });
//                 }, this);

//                 // Skills
//                 skills.forEach(function (skill) {
//                     character[skill.name.toLowerCase()] = chance.integer({ min: 0, max: 5 });

//                     if (character[skill.name.toLowerCase()] > chance.integer({ min: 1, max: 5 })) {
//                         influences.push(chance.pickone(skill.possessedBy));
//                         if (!character.specialties[skill.name.toLowerCase()]) character.specialties[skill.name.toLowerCase()] = "";
//                         character.specialties[skill.name.toLowerCase()] += chance.pickone(skill.specialties);
//                     }

//                 }, this);

//                 // Arcana
//                 arcana.forEach(function (arcanum) {
//                     character[arcanum.name.toLowerCase()] = chance.integer({ min: 0, max: 5 });
//                 }, this);

//                 character.notes += "Born in " + character.countryOfBirth + " on " + character.birthday + ".  ";
//                 character.notes += "Influenced by " + influences.join(", ") + ".";

//                 return character;

//             };

//             // Initialise
//             this.initialize();
//         }

//         return new CharacterGenerator();
//     });