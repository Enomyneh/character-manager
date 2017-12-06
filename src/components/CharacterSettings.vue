<template>
  <v-container fluid grid-list-md>
    <v-layout flex>
      <v-flex xs12>
        <v-card>
        <v-card-title primary-title>
          <h4 class="headline mb-0">Settings</h4>
        </v-card-title>
          <v-card-text>

            <v-flex absolute right>
            </v-flex>

            <div>Edit mode: {{character.editMode}}</div>
          </v-card-text>
          <v-card-actions>
              <v-btn 
                small class="yellow blue--text"
                text-color--white
                        :outline="!character.starred" 
                @click="toggleStar">
                <i class="material-icons">star</i>
              </v-btn>
            <v-btn small color="primary" dark @click="deleteCharacter(character.id)">
              <i class="material-icons">delete</i>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex> 
    </v-layout> 
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
