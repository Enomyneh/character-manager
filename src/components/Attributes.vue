<template>
  <v-container grid-list-md text-xs-center>
    <h4 class="text-center">Attributes</h4>
    <v-layout row wrap>
      <v-flex xs12 sm4 v-for="category in categories" :key="category">
        <h5 class="text-center text-muted ">{{category}}</h5>
        <v-layout row wrap v-for="attribute in getAttributesByCategory(category)" :key="attribute.name + Math.floor(Math.random() * 100)">
          <v-flex xs6>
              <h4 class="text-center">{{attribute.name}}</h4>
          </v-flex>
          <v-flex xs6>
              <Dots :min="1" :max="5" v-model="character[attribute.name.toLowerCase()]"
                @increment="incrementValue(attribute.name)"
                @decrement="decrementValue(attribute.name)"
                ></Dots>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import attributes from "../data/attributes.json";
import Dots from "./input/Dots.vue";

export default {
  model: {
    prop: "character"
  },
  methods: {
    save: function() {
      this.$eventHub.$emit("autoSave");
    },
    getAttributesByCategory: function(category) {
      return attributes.filter(attribute => attribute.category == category);
    },
    incrementValue: function(attributeName) {
      this.character.incrementValue(attributeName);
      this.save();
    },
    decrementValue: function(attributeName) {
      this.character.decrementValue(attributeName);
      this.save();
    }
  },
  props: ["character"],
  data() {
    return {
      categories: ["Mental", "Physical", "Social"]
    };
  },
  components: {
    Dots: Dots
  }
};
</script>
