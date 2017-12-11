<template>
  <v-container fluid grid-list-md text-xs-center>
    <v-layout flex>
      <v-flex xs12>
        <v-card>
        <v-card-title v-if="!noHeader" primary-title>
          <h4 class="headline mb-0">Wisdom</h4>
        </v-card-title>
          <v-card-text>
            <v-layout row wrap align-center v-for="n in 10" :key="'wisdom'+n">


                <v-flex xs1 class="title text-center" fill-height>
                  {{11-n+''}}
                </v-flex>
                <v-flex xs10 class="">
                    <v-text-field 
                    @input="save" 
                    label="Derangement" 
                    v-model="character.derangements[11-n]"
                        single-line></v-text-field>
                </v-flex>
                <v-flex xs1 class="" @click="setWisdom(11-n)">
                  <v-icon v-if="wiseAs(11-n)">lens</v-icon> 
                  <v-icon v-if="!wiseAs(11-n)">panorama_fish_eye</v-icon>
                </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
          </v-card-actions>
        </v-card>
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
  props: ["character", "noHeader"],
  data() {
    return {};
  },
  methods: {
    save: function() {
      this.$eventHub.$emit("autoSave");
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
