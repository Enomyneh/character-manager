<template>
  <v-layout column align-center>
  <v-tabs v-model="activeTab">
      <v-tabs-bar class="black" dark>
        <v-tabs-item
          v-for="tab in tabs"
          :key="tab.name"
          :href="'#' + tab.name"
          ripple
        >
        {{ tab.name }}
        </v-tabs-item>
        <v-tabs-slider color="red"></v-tabs-slider>
      </v-tabs-bar>
      <v-tabs-items>
        <v-tabs-content
          v-for="tab in tabs"
          :key="tab.name"
          :id="tab.name"
        >
          <v-card flat>
            <component :is="tab.componentType" v-model="character"></component>
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
      tabs: [
        { name: "Personal", componentType: "Personal" },
        { name: "Attributes", componentType: "Attributes" },
        { name: "Skills", componentType: "Skills" },
        { name: "Gnosis", componentType: "Gnosis" },
        { name: "Mana", componentType: "Mana" },
        { name: "Arcana", componentType: "Arcana" },
        { name: "Flaws", componentType: "Flaws" },
        { name: "Merits", componentType: "Merits" },
        { name: "Health", componentType: "Health" }
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
