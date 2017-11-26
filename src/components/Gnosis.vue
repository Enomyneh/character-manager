<template>
  <v-container grid-list-md text-xs-center>
              <h4 class="text-center">Gnosis</h4>
        <!-- <div>
            <img v-for="n in character.gnosis" src=".\img\dot-filled.png" :key="'filled'+n"><img v-for="n in unusedSpace()" src=".\img\dot-empty.png":key="'unfilled'+n">
        </div>
        <div>
            <img src=".\img\delete.png" @click="character.adjustGnosis(-1)" />
            <img src=".\img\add.png" @click="character.adjustGnosis(1)" />
        </div> -->
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
  props: ["character"],
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
