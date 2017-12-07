<template>
  <v-container fluid grid-list-md>
    <v-layout flex>
      <v-flex xs12>
        <v-card>
        <v-card-title v-if="!noHeader" primary-title>
          <h4 class="headline mb-0">Spells</h4>
        </v-card-title>
          <v-card-text>
            <div>
                <span><strong>{{character.currentActiveSpells()}}</strong>/<strong>{{character.maxActiveSpells()}}</strong> active spells.</span>
            </div>
            <div>
                <span>Tolerance: <strong>{{character.spellsCastOnCharacter()}}</strong>/<strong>{{character.spellTolerance()}}</strong>.</span>
                <span>Casting penalty: <strong>{{character.spellAccumulationPenalty()}}</strong>.</span>
            </div>
            <div>
                  <v-btn  v-for="spellName in character.starredSpells" :key="'favSpell'+spellName" small color="secondary" dark @click="addSpell(spellName)">{{spellName}}</v-btn>
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
                    <v-flex xs12 sm3 md5rint on demand><v-text-field label="Spell notes" v-model="spell.notes" @input="save()"></v-text-field></v-flex>
                    <v-flex xs5 sm2 md1><v-switch label="On" v-model="spell.castOnMe" @change="save()"></v-switch></v-flex>
                    <v-flex xs5 sm2 md1><v-switch label="By" v-model="spell.castByMe" @change="save()"></v-switch></v-flex>
                    <v-flex xs2 sm2 md1><v-btn small fab color="primary" dark @click="removeSpell(index)"><i class="material-icons">delete</i></v-btn></v-flex>
                    <v-flex xs2 sm2 md1><v-btn small fab color="yellow" :outline="!character.isSpellStarred(spell.name)" @click="starSpell(index)"><i class="material-icons">star</i></v-btn></v-flex>
                </v-layout>
                <v-flex v-if="showDetails" xs12>
                <h5 class="text-center">Spell Description</h5>
                  {{spellDetails(spell.name)}}
                </v-flex>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn small flat color="primary" dark @click="addSpell()">Add spell</v-btn>
            <v-btn small flat color="primary" dark @click="showDetails = !showDetails">Toggle details</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex> 
    </v-layout> 
  </v-container>
</template>

<script>
import spells from "../data/spells.json";

export default {
  model: {
    prop: "character"
  },
  props: ["character", "noHeader"],
  data() {
    return {
      showDetails: false
    };
  },
  computed: {
    spellNames: function() {
      return spells
        .map(spell => {
          return spell.name;
        })
        .sort();
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
      this.$eventHub.$emit("autoSave");
    },
    addSpell: function(spellName) {
      if (!spellName) spellName = "";
      this.character.activeSpells.push({
        name: spellName,
        castOnMe: true,
        castByMe: true
      });
      this.save();
    },
    removeSpell: function(index) {
      this.character.activeSpells.splice(index, 1);
      this.save();
    },
    starSpell: function(index) {
      var spellName = this.character.activeSpells[index].name;
      if (!this.character.isSpellStarred(spellName)) {
        this.character.starredSpells.push(spellName);
      } else {
        this.character.starredSpells.splice(
          this.character.starredSpells.indexOf(spellName),
          1
        );
      }
      this.save();
    }
  },
  components: {}
};
</script>
