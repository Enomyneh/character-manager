<template>
  <v-layout column align-center>
    <h4 class="text-center">Attributes</h4>
    <v-flex md6 v-for="category in categories" :key="category">
      <h5 class="text-center text-muted ">{{category}}</h5>
      <div v-for="attribute in getAttributesByCategory(category)" :key="attribute.name ">
        <v-text-field
        type="number"
          :label="attribute.name" 
          v-model="character[attribute.name.toLowerCase()]" 
          @input="save"></v-text-field>
          <!-- <Dots :min="0" :max="5" :value.sync="character[attribute.name.toLowerCase()]"></Dots> -->
      </div>
    </v-flex>
  </v-layout>
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
