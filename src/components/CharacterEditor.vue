<template>
  <v-layout column align-center>
        <h4 class="text-center">Personal</h4>
        <v-text-field
              name="input-1"
              label="Name"
              id="testing"
              v-model="character.name"
            ></v-text-field>
    <img src="/public/v.png" alt="Vuetify.js" class="mb-5" />
    <blockquote>
      &#8220;First, solve the problem. Then, write the code.&#8221;
      <footer>
        <small>
          <em>&mdash;John Johnson</em>
        </small>
      </footer>
    </blockquote>
    {{message}}
  </v-layout>
</template>

<script>
import CharacterDao from '../dataAccess/CharacterDao.js'
import math from '../dataAccess/math.js'

export default {
  data () {
    return {
      message: "This is the Character Editor!",
      character: {},
      characterDao: CharacterDao
    }
  },
  created: function(){
    console.log("Character Editor Created");
    this.$eventHub.$on('saveCharacterToFile', ()=>{ 
      console.log("saveCharacterToFile");
      this.characterDao.saveLocally(this.character);
    });
  },
  components: {
  }
}
</script>
