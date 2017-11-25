<template>
  <v-container grid-list-md text-xs-center>
    <h4 class="text-center">Wisdom</h4>
        <v-layout row wrap v-for="n in 10" :key="'wisdom'+n">
            <v-flex xs11 class="mt-0 mb-0 pt-0 pb-0">
                <v-text-field 
                @input="save" 
                label="Derangement" 
                v-model="character.derangements[11-n]"
                    single-line
                    :prefix="11-n+''"></v-text-field>
            </v-flex>
            <v-flex xs1 class="mt-0 mb-0 pt-0 pb-0" @click="setWisdom(11-n)">
                <img v-if="wiseAs(11-n)" src="/public/dot-filled.png">
                <img v-if="!wiseAs(11-n)" src="/public/dot-empty.png">
            </v-flex>
        </v-layout>
  </v-container>
</template>

<script>
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
    wiseAs: function(wisdom) {
      return this.character.wisdom >= wisdom;
    },
    setWisdom: function(wisdom) {
      console.log("Setting wisdom to " + wisdom);
      this.character.wisdom = wisdom;
      this.save();
    },
    derangement: function(index) {
      return this.character.derangements[index];
    },
    updateDerangement: function(index, derangement) {
      console.log("Updating derangement " + index + " to " + derangement);
      this.character.derangements[index] = derangement;
    }
  },
  components: {
    Dots: Dots
  }
};
</script>
