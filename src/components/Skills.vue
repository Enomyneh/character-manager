<template>
  <v-layout column align-center>
    <h4 class="text-center">Skills</h4>
    <div v-for="category in categories" :key="category">
      <h5 class="text-center text-muted ">{{category}}</h5>
      <div v-for="skill in getSkillsByCategory(category)" :key="skill.name ">
        <v-text-field 
          :label="skill.name" 
          v-model="character[skill.name.toLowerCase()]" 
          @input="save"></v-text-field>
        <v-text-field 
          label="Specialties" 
          v-model="character.specialties[skill.name.toLowerCase()]" 
          @input="save"></v-text-field>          
      </div>
    </div>
  </v-layout>
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
