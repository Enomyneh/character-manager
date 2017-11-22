<template>
  <v-container grid-list-md text-xs-center>
    <h4 class="text-center">Skills</h4>
    <v-layout row wrap>
    <v-flex xs12 sm4 v-for="category in categories" :key="category">
      <h5 class="text-center text-muted ">{{category}}</h5>
      <v-layout row wrap v-for="skill in getSkillsByCategory(category)" :key="skill.name ">
        <v-flex xs6>
            <h4 class="text-center">{{skill.name}}</h4>
        </v-flex>
        <v-flex xs6>
            <Dots :min="0" :max="5" v-model="character[skill.name.toLowerCase()]"
                @increment="incrementValue(skill.name)"
                @decrement="decrementValue(skill.name)"
                ></Dots>
        </v-flex>
        <v-text-field 
          label="Specialties" 
          v-model="character.specialties[skill.name.toLowerCase()]" 
          @input="save"></v-text-field>          
      </v-layout>
    </v-flex>
  </v-layout>
  </v-container>
</template>

<script>
import skills from "../data/skills.json";
import Dots from "./input/Dots.vue";

export default {
  model: {
    prop: "character"
  },
  methods: {
    save: function() {
      this.$eventHub.$emit("saveCharacterToFile");
    },
    getSkillsByCategory: function(category) {
      return skills.filter(skill => skill.category == category);
    },
    incrementValue: function(fieldName) {
      this.character.incrementValue(fieldName);
      this.save();
    },
    decrementValue: function(fieldName) {
      this.character.decrementValue(fieldName);
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
