<template>
  <v-layout column align-center>
    <h4 class="text-center">Personal</h4>
    <v-text-field
          name="input-1"
          label="Name"
          id="testing"
          v-model="character.name"
          @input="save"
        ></v-text-field>
  </v-layout>
</template>

<script>
import CharacterDao from '../dataAccess/CharacterDao.js'
import math from '../dataAccess/math.js'


var getLastSavedCharacter = function(){
  var characters = CharacterDao.getLocalCharacterIds();
  var characterId = characters[characters.length-1];
  if(!characterId) return {"name":"Unamed Character"};

  return CharacterDao.loadLocally(characterId);
};

export default {
  data () {
    return {
      message: "This is the Character Editor!",
      character: getLastSavedCharacter(),
      characterDao: CharacterDao,
    }
  },
  methods:{
      save: function(){
        this.$eventHub.$emit('saveCharacterToFile');
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
