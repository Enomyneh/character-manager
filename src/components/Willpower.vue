<template>
  <v-container grid-list-md text-xs-center>
    <h4 class="text-center">Willpower</h4>
    <!-- {{character.maxWillpower()}}|{{unusedSpace()}}|{{character.willpower}}|{{usedWillpower()}} -->
    <div>
        <img v-for="n in character.maxWillpower()" :key="'maxWillpower'+n" src="/public/dot-filled.png"><img v-for="n in unusedSpace()" :key="'unusedDots'+n" src="/public/dot-empty.png">
    </div>
    <div>
        <img v-for="n in character.willpower" :key="'willpower'+n" src="/public/box-stroke.png"><img v-for="n in usedWillpower()" :key="'unusedWillpower'+n" src="/public/box-empty.png"><img v-for="n in unusedSpace()" :key="'unusedBoxes'+n" src="/public/box-empty-grey.png">
    </div>
    <div>
        <img src="/public/delete.png" @click="character.adjustWillpower(-1)" /><img src="/public/add.png" @click="character.adjustWillpower(1)" />
    </div>
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
    usedWillpower: function() {
      return this.character.maxWillpower() - this.character.willpower;
    },
    unusedSpace: function() {
      return 10 - this.character.maxWillpower();
    },
    save: function() {
      this.$eventHub.$emit("autoSave");
    }
  },
  components: {
    Dots: Dots
  }
};
</script>
