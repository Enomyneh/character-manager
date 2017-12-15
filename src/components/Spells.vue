<template>
  <v-container fluid grid-list-md>
    <v-layout flex>
      <v-flex xs12>
        <v-card>
        <v-card-title v-if="!noHeader" primary-title>
          <h4 class="headline mb-0">Spells</h4>
        </v-card-title>
          <v-card-text>
            <div style="text-align: center;">
            <div>
              <h4>Active Spells</h4>
              <strong>{{character.currentActiveSpells()}}</strong> of <strong>{{character.maxActiveSpells()}}</strong>
            </div>
            <div>
                <v-icon v-for="n in character.currentActiveSpells()" :key="'activespellicon'+n" color="blue">flare</v-icon><v-icon v-for="n in (character.maxActiveSpells() - character.currentActiveSpells())" :key="'inactivespellicon'+n" color="grey">flare</v-icon>
            </div>
            <div>
              <h4>Spell Tolerance</h4>
                <strong>{{character.spellsCastOnCharacter()}}</strong> of <strong>{{character.spellTolerance()}}</strong>
            </div>
            <div>
                <v-icon v-for="n in character.spellsCastOnCharacter()" :key="'spellonicon'+n" color="blue">person</v-icon><v-icon v-for="n in character.unusedSpellTolerance()" :key="'spellnotonicon'+n" color="grey">person</v-icon>
            </div>
            <div>
                <span>Casting penalty: <strong>{{character.spellAccumulationPenalty()}}</strong>.</span>
            </div>
            </div>
            <v-expansion-panel expand>
              <v-expansion-panel-content v-for="(spell, index) in character.activeSpells" :key="'spell'+index">
                <div slot="header">
                  <v-icon v-if="spell.castByMe" color="blue">flare</v-icon><v-icon v-if="!spell.castByMe" color="gray">flare</v-icon>
                  <v-icon v-if="spell.castOnMe" color="blue">person</v-icon><v-icon v-if="!spell.castOnMe" color="gray">person_outline</v-icon>

                  <strong>&nbsp;&nbsp;{{spell.name}}</strong>
                  <span v-if="!spell.name">Unnamed spell</span>

                  <span v-if="spell.notes"> - <em>{{spell.notes}}</em></span>
                  
                  <span v-if="spell.potency">&nbsp;&nbsp;P<span class="hidden-sm-and-down">otency</span>&nbsp;<strong>{{spell.potency}}</strong></span>
                  <span v-if="spell.duration">&nbsp;&nbsp;D<span class="hidden-sm-and-down">uration</span>&nbsp;<strong>{{spell.duration}}</strong></span>
                  <span v-if="spell.targets">&nbsp;&nbsp;T<span class="hidden-sm-and-down">argets</span>&nbsp;<strong>{{spell.targets}}</strong></span>
                  <span v-if="spell.aoe">&nbsp;&nbsp;AoE<span class="hidden-sm-and-down">ffect</span>&nbsp;<strong>{{spell.aoe}}</strong></span>
                  
                </div>
                
                <v-card>
                  <v-card-text>
                    <v-layout row wrap class="input-group" align-center>                
                        <!-- <v-flex xs12 sm3 md3><v-text-field label="Spell" v-model="spell.name" @input="save()"></v-text-field></v-flex> -->
                        <v-flex xs12 sm12 md4><v-select
                          :items="spellNames"
                          v-model="spell.name"
                          label="Spell"
                          autocomplete
                          @input="save()"
                        ></v-select></v-flex>
                        <v-flex xs12 sm12 md8><v-text-field label="Spell notes" v-model="spell.notes" @input="save()"></v-text-field></v-flex>
                        
                        <v-flex xs6 sm3 md2><v-text-field label="Potency" v-model="spell.potency" @change="save()"></v-text-field></v-flex>
                        <v-flex xs6 sm3 md2><v-text-field label="Duration" v-model="spell.duration" @change="save()"></v-text-field></v-flex>
                        <v-flex xs6 sm3 md2><v-text-field label="Targets" v-model="spell.targets" @change="save()"></v-text-field></v-flex>
                        <v-flex xs6 sm3 md2><v-text-field label="Area of Effect" v-model="spell.aoe" @change="save()"></v-text-field></v-flex>

                        <v-flex xs6 sm3 md1><v-switch label="On me" v-model="spell.castOnMe" @change="save()"></v-switch></v-flex>
                        <v-flex xs6 sm3 md1><v-switch label="By me" v-model="spell.castByMe" @change="save()"></v-switch></v-flex>

                        <v-flex xs6 sm3 md1><v-btn flat color="primary" dark @click="removeSpell(index)"><i class="material-icons">delete</i></v-btn></v-flex>
                        <v-flex xs6 sm3 md1>
                          <v-btn v-if="!character.isSpellStarred(spell.name)" small flat color="grey" @click="starSpell(index)"><v-icon>favorite_border</v-icon></v-btn>
                          <v-btn v-if="character.isSpellStarred(spell.name)" small flat color="red" @click="starSpell(index)"><v-icon>favorite</v-icon></v-btn>
                        </v-flex>
                    </v-layout>
                    <v-flex xs12>
                      <Spell :spellName="spell.name"></Spell>
                    </v-flex>
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-card-text>
          <v-card-actions>
            <v-btn small flat color="primary" dark @click="addSpell()">Add spell</v-btn>
            <v-btn  v-for="spellName in character.starredSpells" :key="'favSpell'+spellName" small color="secondary" dark @click="addSpell(spellName)">{{spellName}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex> 
    </v-layout> 
  </v-container>
</template>

<script>
import Spell from "./dataView/Spell.vue";
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
        castByMe: true,
        potency: "",
        duration: "",
        targets: ""
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
  components: {
    Spell: Spell
  }
};
</script>
