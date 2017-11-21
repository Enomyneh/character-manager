<template>
  <v-container grid-list-md text-xs-center>
    <h4 class="text-center">Skills</h4>
    <v-layout row wrap>
    <v-flex xs12 sm4 v-for="category in categories" :key="category">
      <h5 class="text-center text-muted ">{{category}}</h5>
      <v-flex class="ma-0 pa-0" v-for="skill in getSkillsByCategory(category)" :key="skill.name ">
        <v-text-field 
          :label="skill.name" 
          v-model="character[skill.name.toLowerCase()]" 
          @input="save"></v-text-field>
        <v-text-field 
          label="Specialties" 
          v-model="character.specialties[skill.name.toLowerCase()]" 
          @input="save"></v-text-field>          
      </v-flex>
    </v-flex>
  </v-layout>
  </v-container>
</template>

<script>
import skills from "../data/skills.json";

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
    }
  },
  props: ["character"],
  data() {
    return {
      categories: ["Mental", "Physical", "Social"]
    };
  }
};
</script>
