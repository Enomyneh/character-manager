<template>
  <v-container grid-list-md text-xs-center>
    <h4 class="text-center">Spells</h4>
    <div>
        <span><strong>{{character.currentActiveSpells()}}</strong>/<strong>{{character.maxActiveSpells()}}</strong> active spells.</span>
    </div>
    <div>
        <span>Tolerance: <strong>{{character.spellsCastOnCharacter()}}</strong>/<strong>{{character.spellTolerance()}}</strong>.</span>
        <span>Casting penalty: <strong>{{character.spellAccumulationPenalty()}}</strong>.</span>
    </div>
    <div>
        <v-btn small color="primary" dark @click="addSpell()">Add spell</v-btn>
        <v-btn small color="primary" dark @click="showDetails = !showDetails">Toggle details</v-btn>
    </div>

    <div v-for="(spell, index) in character.activeSpells" :key="'spell'+index">
        <v-layout row wrap class="input-group">                
            <!-- <v-flex xs12 sm3 md3><v-text-field label="Spell" v-model="spell.name" @input="save()"></v-text-field></v-flex> -->
            <v-flex xs12 sm3 md3><v-select
              :items="spellNames"
              v-model="spell.name"
              label="Spell"
              autocomplete
              @input="save()"
            ></v-select></v-flex>
            <v-flex xs12 sm3 md6><v-text-field label="Spell notes" v-model="spell.notes" @input="save()"></v-text-field></v-flex>
            <v-flex xs5 sm2 md1><v-switch label="On" v-model="spell.castOnMe" @change="save()"></v-switch></v-flex>
            <v-flex xs5 sm2 md1><v-switch label="By" v-model="spell.castByMe" @change="save()"></v-switch></v-flex>
            <v-flex xs2 sm2 md1><v-btn small fab color="primary" dark @click="removeSpell(index)"><i class="material-icons">delete</i></v-btn></v-flex>
        </v-layout>
        <v-flex v-if="showDetails" xs12>
          {{spellDetails(spell.name)}}
        </v-flex>
    </div>
  </v-container>
</template>

<script>
import spells from "../data/spells.json";
<<<<<<< HEAD
=======
var spellNames = spells
  .map(spell => {
    return spell.name;
  })
  .sort();
>>>>>>> 057e6875117ae21f00115991f828efcfc90f716e

export default {
  model: {
    prop: "character"
  },
  props: ["character"],
  data() {
    return {
<<<<<<< HEAD
      showDetails : false
      };
=======
      spellNames: spellNames,
      showDetails: false
    };
>>>>>>> 057e6875117ae21f00115991f828efcfc90f716e
  },
  computed: {
      spellNames: function(){
          return spells.map((spell) => {return spell.name}).sort();
      }
  },
  methods: {
    spellDetails: function(spellName) {
      var spell = spells.filter(spell => spell.name == spellName)[0];
      if (!spell)
        return "Unable to find spell details for '" + spellName + "'.";

      return spell.effect;
    },
    save: function() {
      this.$eventHub.$emit("saveCharacterToFile");
    },
    addSpell: function() {
      this.character.activeSpells.push({
        name: "",
        castOnMe: true,
        castByMe: true
      });
      this.save();
    },
    removeSpell: function(index) {
      this.character.activeSpells.splice(index, 1);
      this.save();
    }
  },
  components: {}
};
</script>
