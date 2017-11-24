<template>
  <v-container grid-list-md text-xs-center>
    <h4 class="text-center">Merits</h4>
    <button class="btn btn-info pull-right" @click="addMerit()">Add</button>
    <v-layout row wrap  align-center v-for="(merit, index) in character.merits" :key="'merit'+index">
        <v-flex xs4 sm7>
            <v-text-field label="Merit" v-model="merit.name" @input="updateMerit(index, merit)"></v-text-field>
        </v-flex>
        <v-flex xs6 sm3>
            <Dots :min="0" :max="5" v-model="merit.dots"
                @increment="incrementMeritDots(index)"
                @decrement="decrementMeritDots(index)"
            >
            </Dots>
        </v-flex>
        <v-flex xs2 sm2>
            <v-btn small fab color="primary" dark @click="removeMerit(index)">❌</v-btn>
        </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import merits from "../data/merits.json";
import Dots from "./input/Dots.vue";

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
      this.$eventHub.$emit("saveCharacterToFile");
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
