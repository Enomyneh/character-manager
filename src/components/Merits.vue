<template>
  <v-container grid-list-md text-xs-center>
    <h4 v-if="!noHeader" class="text-center">Merits</h4>
    <v-btn small color="primary" dark @click="addMerit()">Add merit</v-btn>
    <v-btn small color="primary" dark @click="showDetails = !showDetails">Toggle details</v-btn>
    <v-layout row wrap align-center v-for="(merit, index) in character.merits" :key="'merit'+index">
        <v-flex xs12 sm3>
            <v-select
              v-bind:items="meritNames"
              v-model="merit.name"
              label="Merit"
              autocomplete
              @input="updateMerit(index, merit)"
            ></v-select>
        </v-flex>
        <v-flex xs12 sm4>
            <v-text-field label="Merit notes" v-model="merit.notes" @input="updateMerit(index, merit)"></v-text-field>
        </v-flex>
        <v-flex xs9 sm3>
            <Dots :min="0" :max="5" v-model="merit.dots"
                @increment="incrementMeritDots(index)"
                @decrement="decrementMeritDots(index)"
            >
            </Dots>
        </v-flex>
        <v-flex xs3 sm2>
            <v-btn small fab color="primary" dark @click="removeMerit(index)"><i class="material-icons">delete</i></v-btn>
        </v-flex>
        <v-flex v-if="showDetails" xs12>
          {{meritDetails(merit.name)}}
        </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import merits from "../data/merits.json";
import Dots from "./input/Dots.vue";

var meritNames = merits.map((merit) => {return merit.name}).sort();

export default {
  model: {
    prop: "character"
  },
  props: ["character", "noHeader"],
  data() {
    return {
      meritNames: meritNames,
      showDetails : false
    };
  },
  methods: {
    meritDetails: function(meritName){
      var merit = merits.filter(merit => merit.name == meritName)[0];
      if(!merit) return "Unable to find merit details for '" + meritName + "'.";
      
      return "Effect: " + merit.effect + " Levels: " + merit.levels + " Prerequistes: " + merit.prerequistes;
    },
    save: function() {
      this.$eventHub.$emit("autoSave");
    },
    addMerit: function() {
      this.character.merits.push({
        name: "",
        dots: 0
      });
      this.save();
    },
    incrementMeritDots: function(index) {
      this.character.adjustMeritDots(index, 1);
      this.save();
    },
    decrementMeritDots: function(index) {
      this.character.adjustMeritDots(index, -1);
      this.save();
    },
    removeMerit: function(index) {
      this.character.merits.splice(index, 1);
      this.save();
    },
    updateMerit: function(index, merit) {
      this.character.merits[index] = merit;
      this.save();
    }
  },
  components: {
    Dots: Dots
  }
};
</script>
