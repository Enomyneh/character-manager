<template>
  <v-container fluid grid-list-md text-xs-center>
    <v-layout flex>
      <v-flex xs12>
        <v-card>
        <v-card-title v-if="!noHeader" primary-title>
          <h4 class="headline mb-0">Mana</h4>
        </v-card-title>
          <v-card-text>
            <img v-for="n in character.mana" src="/public/box-stroke.png" :key="'mana'+n"><img v-for="n in unusedSpace()" src="/public/box-empty-grey.png" :key="'unusedManaSpace'+n">
            <strong>{{character.maxManaPerTurn()}}</strong> mana per turn.
          </v-card-text>
          <v-card-actions>
            <img src="/public/delete.png" @click="decrementValue" />
            <img src="/public/add.png" @click="incrementValue" />
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
