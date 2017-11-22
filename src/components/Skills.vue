<template>
  <v-container grid-list-md text-xs-center>
        <v-btn small color="primary" dark @click="toggleAllSpecialties()">Specs</v-btn>
    <h4 class="text-center">Skills</h4>
    <v-layout row wrap>
    <v-flex xs12 sm4 v-for="category in categories" :key="category">
      <h5 class="text-center text-muted ">{{category}}</h5>
      <v-layout row wrap v-for="skill in getSkillsByCategory(category)" :key="skill.name ">
        <!-- <v-flex xs2>
                <v-btn small color="primary" dark @click="toggleSpecialties(skill.name)">Specs</v-btn>

        </v-flex> -->
        <v-flex xs6>
            <!-- <v-badge left>
                <span slot="badge" @click="toggleSpecialties(skill.name)">S</span>
                <span>{{skill.name}}</span>
            </v-badge> -->
            <h4 class="text-center">{{skill.name}}</h4>
        </v-flex>
        <v-flex xs6>
            <Dots :min="0" :max="5" v-model="character[skill.name.toLowerCase()]"
                @increment="incrementValue(skill.name)"
                @decrement="decrementValue(skill.name)"
                ></Dots>
        </v-flex>
        <v-text-field 
          v-if="showSpecialities(skill.name)"
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
    },
    showSpecialities: function(skillName) {
      return (
        this.showAllSpecialities || this.specialtiesShown.includes(skillName)
      );
    },
    toggleSpecialties: function(skillName) {
      if (this.specialtiesShown.includes(skillName)) {
        this.specialtiesShown.splice(
          this.specialtiesShown.indexOf(skillName),
          1
        );
      } else {
        this.specialtiesShown.push(skillName);
      }
    },
    toggleAllSpecialties: function() {
      this.showAllSpecialities = !this.showAllSpecialities;
    }
  },
  props: ["character"],
  data() {
    return {
      categories: ["Mental", "Physical", "Social"],
      specialtiesShown: [],
      showAllSpecialities: false
    };
  },
  components: {
    Dots: Dots
  }
};
</script>
