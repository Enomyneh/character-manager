<template>
  <v-container fluid grid-list-md text-xs-center>
    <v-layout flex>
      <v-flex xs12>
        <v-card>
        <v-card-title v-if="!noHeader" primary-title>
          <h4 class="headline mb-0">SECTION NAME</h4>
        </v-card-title>
          <v-card-text>
            CONTENT
          </v-card-text>
          <v-card-actions>
            <v-btn small flat color="primary" dark @click="BUTTONY_BUTTON()">BUTTON TEXT</v-btn>
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
      return 10;
    },
    incrementValue: function() {
      this.$eventHub.$emit("autoSave");
    },
    decrementValue: function() {
      this.$eventHub.$emit("autoSave");
    }
  },
  components: {
    Dots: Dots
  }
};
</script>
