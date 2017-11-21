<template>
  <v-container grid-list-md text-xs-center>
    <h4 class="text-center">Attributes</h4>
    <v-layout row wrap>
      <v-flex xs12 sm4 v-for="category in categories" :key="category">
        <h5 class="text-center text-muted ">{{category}}</h5>
        <div v-for="attribute in getAttributesByCategory(category)" :key="attribute.name ">
          <v-text-field
            type="number"
            min="1"
            :label="attribute.name" 
            :value="character[attribute.name.toLowerCase()]" 
            @input="save"></v-text-field>
            <Dots :min="1" :max="5" v-model="character[attribute.name.toLowerCase()]"
              @increment="incrementValue(attribute.name)"
              @decrement="decrementValue(attribute.name)"
              ></Dots>
        </div>
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
      this.$eventHub.$emit("saveCharacterToFile");
    },
    getAttributesByCategory: function(category) {
      return attributes.filter(attribute => attribute.category == category);
    },
    incrementValue: function(attributeName) {
      this.setValue(attributeName, this.character[attributeName.toLowerCase()] + 1);
    },
    decrementValue: function(attributeName) {
      this.setValue(attributeName, this.character[attributeName.toLowerCase()] - 1);
    },
    setValue: function(attributeName, newValue) {
      var min = 1;
      var max = 5;
      this.character[attributeName.toLowerCase()] = Math.min(max, Math.max(newValue, min));
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
