<template>
  <v-container grid-list-md text-xs-center>
    <div>Edit mode: {{character.editMode}}</div>

    <div>Favourite Character
      <v-flex xs2 sm2 md1>
        <v-btn 
          small fab color="yellow" 
          :outline="!character.starred" 
          @click="toggleStar">
          <i class="material-icons">star</i>
        </v-btn>
      </v-flex>
    </div>

    <div>Delete Character</div>

  </v-container>
</template>

<script>
import CharacterDao from "../dataAccess/CharacterDao.js";

export default {
  model: {
    prop: "character"
  },
  props: ["character"],
  data() {
    return {};
  },
  methods: {
    save: function() {
      this.$eventHub.$emit("autoSave");
    },
    toggleStar: function() {
      this.character.starred = !this.character.starred;
      this.save();
    }
  },
  components: {}
};
</script>
