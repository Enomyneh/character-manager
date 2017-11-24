<template>
  <v-container grid-list-md text-xs-center>
        <h4 class="text-center">Arcana</h4>
        <v-layout row wrap v-for="arcanum in getArcana()" :key="arcanum.name">
            <v-flex xs6>
                <h4 class="text-center">{{arcanum.name}}</h4>
            </v-flex>
            <v-flex xs6>
                <Dots :min="0" :max="5" v-model="character[arcanum.name.toLowerCase()]"
                    @increment="incrementValue(arcanum.name)"
                    @decrement="decrementValue(arcanum.name)"
                    ></Dots>
            </v-flex>    
        </v-layout>
  </v-container>
</template>

<script>
import Dots from "./input/Dots.vue";
import arcana from "../data/arcana.json";

export default {
  model: {
    prop: "character"
  },
  props: ["character"],
  data() {
    return {};
  },
  methods: {
      getArcana: function(){
          return arcana;
      },
    incrementValue: function(arcanumName) {
        this.character.adjustArcana(arcanumName, 1);
      this.$eventHub.$emit("saveCharacterToFile");
    },
    decrementValue: function(arcanumName) {
        this.character.adjustArcana(arcanumName, -1);
      this.$eventHub.$emit("saveCharacterToFile");
    }
  },
  components: {
    Dots: Dots
  }
};
</script>
