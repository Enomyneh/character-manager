<template>
  <v-container fluid grid-list-md text-xs-center>
    <v-layout flex>
      <v-flex xs12>
        <v-card>
        <v-card-title v-if="!noHeader" primary-title>
          <h4 class="headline mb-0">Gnosis</h4>
        </v-card-title>
          <v-card-text>
            <Dots :min="1" :max="10" v-model="character.gnosis"
              @increment="incrementValue()"
              @decrement="decrementValue()"
            ></Dots>
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
    unusedSpace: function() {
      return 10 - this.character.gnosis;
    },
    incrementValue: function() {
      this.character.adjustGnosis(1);
      this.$eventHub.$emit("autoSave");
    },
    decrementValue: function() {
      this.character.adjustGnosis(-1);
      this.$eventHub.$emit("autoSave");
    }
  },
  components: {
    Dots: Dots
  }
};
</script>
