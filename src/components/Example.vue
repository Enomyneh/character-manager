<template>
  <v-container grid-list-md text-xs-center>
              <h4 v-if="!noHeader" class="text-center">Section</h4>
        <Dots :min="1" :max="10" v-model="character.gnosis"
            @increment="incrementValue()"
            @decrement="decrementValue()"
            ></Dots>
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
