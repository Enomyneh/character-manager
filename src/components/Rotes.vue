<template>
  <v-container fluid grid-list-md>
    <v-layout flex>
      <v-flex xs12>
        <v-card>
        <v-card-title v-if="!noHeader" primary-title>
          <h4 class="headline mb-0">Rotes</h4>
        </v-card-title>
          <v-card-text>
            <v-expansion-panel expand>
              <v-expansion-panel-content v-for="(rote, index) in character.rotes" :key="'rotexp'+index">
                <div slot="header"><strong>{{rote.spellName}}</strong> Dice Pool <strong>{{dicePoolText(rote)}}</strong></div>
                  <v-layout row wrap>
                    <v-flex xs12 sm5 md3>
                      <v-select
                      :items="spellNames"
                      v-model="rote.spellName"
                      label="Spell name"
                      autocomplete
                      @input="save()"
                      ></v-select>
                    </v-flex>
                    <v-flex xs9 sm5 md2><v-text-field label="Style" hint="Order / Seer / Banisher" v-model="rote.style" @input="save()"></v-text-field></v-flex>
                    <v-flex xs6 sm2 md1>
                      <h5 class="text-center">Dice Pool</h5>
                      {{dicePoolText(rote)}}
                    </v-flex>
                    <v-flex xs6 sm3 md1><v-select
                      :items="arcana"
                      v-model="rote.dicePoolArcana"
                      label="Arcana"
                      autocomplete
                      @input="save()"
                    ></v-select></v-flex>
                    <v-flex xs6 sm3 md2><v-select
                      :items="attributes"
                      v-model="rote.dicePoolAttribute"
                      label="Attribute"
                      autocomplete
                      @input="save()"
                    ></v-select></v-flex>
                    <v-flex xs6 sm3 md2><v-select
                      :items="skills"
                      v-model="rote.dicePoolSkill"
                      label="Skill"
                      autocomplete
                      @input="save()"
                    ></v-select></v-flex>
                    
                    <v-flex xs3 sm3 md1><v-btn small flat color="primary" dark @click="removeRote(index)"><i class="material-icons">delete</i></v-btn></v-flex>
                    
                    <v-flex xs12>
                      <Spell :spellName="rote.spellName"></Spell>
                    </v-flex>
                  </v-layout>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-card-text>
          <v-card-actions>
            <v-btn small flat color="primary" dark @click="addRote()">Add rote</v-btn>
            <v-btn small flat color="primary" dark @click="showDetails = !showDetails">Toggle details</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex> 
    </v-layout> 
  </v-container>
</template>

<script>
import Spell from "./dataView/Spell.vue";
import spells from "../data/spells.json";
import arcana from "../data/arcana.json";
import attributes from "../data/attributes.json";
import skills from "../data/skills.json";

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
    },
    arcana: function() {
      return arcana
        .map(arcanum => {
          return arcanum.name;
        })
        .sort();
    },
    attributes: function() {
      return attributes
        .map(attribute => {
          return attribute.name;
        })
        .sort();
    },
    skills: function() {
      return skills
        .map(skill => {
          return skill.name;
        })
        .sort();
    }
  },
  methods: {
    dicePoolText: function(rote) {
      var text = "";
      var total = 0;

      if (!rote.dicePoolArcana) {
        text += "? + ";
      } else {
        text += this.character[rote.dicePoolArcana.toLowerCase()] + " + ";
        total += this.character[rote.dicePoolArcana.toLowerCase()];
      }
      if (!rote.dicePoolAttribute) {
        text += "? + ";
      } else {
        text += this.character[rote.dicePoolAttribute.toLowerCase()] + " + ";
        total += this.character[rote.dicePoolAttribute.toLowerCase()];
      }
      if (!rote.dicePoolSkill) {
        text += "? = ";
      } else {
        text += this.character[rote.dicePoolSkill.toLowerCase()] + " = ";
        total += this.character[rote.dicePoolSkill.toLowerCase()];
      }
      text += total;
      return text;
    },
    spellDetails: function(spellName) {
      var spell = spells.filter(spell => spell.name == spellName)[0];
      if (!spell)
        return "Unable to find spell details for '" + spellName + "'.";

      return spell.effect;
    },
    save: function() {
      this.$eventHub.$emit("autoSave");
    },
    addRote: function() {
      this.character.rotes.push({
        spellName: "",
        dicepool: "",
        style: ""
      });
      this.save();
    },
    removeRote: function(index) {
      this.character.rotes.splice(index, 1);
      this.save();
    }
  },
  components: {
    Spell: Spell
  }
};
</script>
