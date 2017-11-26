<template>
  <v-container grid-list-md text-xs-center>
              <h4 class="text-center">Mana</h4>
        <div>
            <img v-for="n in character.mana" src="/public/box-stroke.png" :key="'mana'+n"><img v-for="n in unusedSpace()" src="/public/box-empty-grey.png" :key="'unusedManaSpace'+n">
        </div>
        <div>
            <img src="/public/delete.png" @click="decrementValue" />
            <img src="/public/add.png" @click="incrementValue" />
        </div>
        <div>
            <strong>{{character.maxManaPerTurn()}}</strong> mana per turn.
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
    unusedSpace: function() {
      return this.character.maxMana() - this.character.mana;
    },
    incrementValue: function() {
      this.character.adjustMana(1);
      this.$eventHub.$emit("autoSave");
    },
    decrementValue: function() {
        this.character.adjustMana(-1);
      this.$eventHub.$emit("autoSave");
    }
  },
  components: {
    Dots: Dots
  }
};
</script>
