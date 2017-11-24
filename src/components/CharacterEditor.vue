<template>
  <v-layout column align-center>
  <v-tabs v-model="activeTab">
      <v-tabs-bar class="black" dark>
        
        <v-tabs-item href="#fullSheet">Full Sheet</v-tabs-item>
        <v-tabs-item
          v-for="section in sections"
          :key="section.name"
          :href="'#' + section.name"
          ripple
        >
        {{ section.name }}
        </v-tabs-item>
        <v-tabs-slider color="red"></v-tabs-slider>
      </v-tabs-bar>
      <v-tabs-items>
        <v-tabs-content id="fullSheet">
          <v-card v-for="section in sections"
          :key="section.name"
          :id="section.name" flat>
            <component :is="section.componentType" v-model="character"></component>
          </v-card>

        </v-tabs-content>
        <v-tabs-content
          v-for="section in sections"
          :key="section.name"
          :id="section.name"
        >
          <v-card flat>
            <component :is="section.componentType" v-model="character"></component>
          </v-card>
        </v-tabs-content>
      </v-tabs-items>
    </v-tabs>
  </v-layout>
</template>

<script>
import CharacterDao from "../dataAccess/CharacterDao.js";
import Character from "../models/Character.js";
import Personal from "./Personal.vue";
import Attributes from "./Attributes.vue";
import Skills from "./Skills.vue";
import Gnosis from "./Gnosis.vue";
import Mana from "./Mana.vue";
import Arcana from "./Arcana.vue";
import Flaws from "./Flaws.vue";
import Merits from "./Merits.vue";
import Health from "./Health.vue";

var getLastSavedCharacter = function() {
  var characters = CharacterDao.getLocalCharacterIds();
  var characterId = characters[characters.length - 1];
  if (!characterId) return new Character();
  return CharacterDao.loadLocally(characterId);
};

export default {
  data() {
    return {
      message: "This is the Character Editor!",
      character: getLastSavedCharacter(),
      characterDao: CharacterDao,
      sections: [
        { name: "Personal", componentType: "Personal" },
        { name: "Attributes", componentType: "Attributes" },
        { name: "Skills", componentType: "Skills" },
        { name: "Merits", componentType: "Merits" },
        { name: "Flaws", componentType: "Flaws" },
        { name: "Arcana", componentType: "Arcana" },
        { name: "Health", componentType: "Health" },
        { name: "Mana", componentType: "Mana" },
        // { name: "Willpower", componentType: "Willpower" },
        { name: "Gnosis", componentType: "Gnosis" },
        // { name: "Rotes", componentType: "Rotes" },
        // { name: "Wisdom", componentType: "Wisdom" },
        // { name: "Inventory", componentType: "Inventory" },
        // { name: "Spells", componentType: "Spells" },
        // { name: "Nimbus", componentType: "Nimbus" },
        // { name: "Familiar", componentType: "Familiar" },
        // { name: "Notes", componentType: "Notes" },
      ],
      activeTab: null
    };
  },
  created: function() {
    console.log("Character Editor Created");
    this.$eventHub.$on("saveCharacterToFile", () => {
      this.characterDao.saveLocally(this.character);
    });
    this.$eventHub.$on("newCharacter", () => {
      this.character = new Character();
    });
  },
  components: {
    Personal: Personal,
    Attributes: Attributes,
    Skills: Skills,
    Gnosis: Gnosis,
    Mana: Mana,
    Arcana: Arcana,
    Flaws: Flaws,
    Merits: Merits,
    Health: Health
  }
};
</script>
