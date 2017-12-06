<template>
  <v-container fluid grid-list-md>
    <v-layout flex>
      <v-flex xs12>
        <v-card style="height:300px">
          <v-card-text>

            <v-flex absolute right>
              <v-btn 
                small fab class="yellow blue--text"
                text-color--white
                        :outline="!character.starred" 
                @click="toggleStar">
                <i class="material-icons">star</i>
              </v-btn>
            <v-btn small fab color="primary" dark @click="deleteCharacter(character.id)">
              <i class="material-icons">delete</i>
            </v-btn>
            </v-flex>

            <div>Edit mode: {{character.editMode}}</div>
          </v-card-text>
        </v-card>
      </v-flex> 
    </v-layout>

    <div>Favourite Character
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
