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
import Personal from "./Personal.vue";

var getLastSavedCharacter = function() {
  var characters = CharacterDao.getLocalCharacterIds();
  var characterId = characters[characters.length - 1];
  if (!characterId) return { name: "Unamed Character" };

  return CharacterDao.loadLocally(characterId);
};

export default {
  data() {
    return {
      message: "This is the Character Editor!",
      character: getLastSavedCharacter(),
      characterDao: CharacterDao,
      tabs: [{ name: "Personal", componentType: "Personal" }],
      activeTab: null
    };
  },
  created: function() {
    console.log("Character Editor Created");
    this.$eventHub.$on("saveCharacterToFile", () => {
      this.characterDao.saveLocally(this.character);
    });
  },
  components: {
    Personal: Personal
  }
};
</script>
