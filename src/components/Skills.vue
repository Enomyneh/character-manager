<template>
  <v-container fluid grid-list-md>
    <v-layout flex>
      <v-flex xs12>
        <v-card>
        <v-card-title v-if="!noHeader" primary-title>
          <h4 class="headline mb-0">Skills</h4>
        </v-card-title>
          <v-card-text>
            <v-layout row wrap text-xs-center>
              <v-flex xs12 sm4 v-for="category in categories" :key="category">
                <h5 class="text-center text-muted ">{{category}}</h5>
                <v-layout row wrap v-for="skill in getSkillsByCategory(category)" :key="skill.name ">
                  <v-flex xs3>
                      <h4 class="text-center">{{skill.name}}</h4>
                  </v-flex>
                  <v-flex xs9 right>
                      <Dots :min="0" :max="5" v-model="character[skill.name.toLowerCase()]"
                          @increment="incrementValue(skill.name)"
                          @decrement="decrementValue(skill.name)"
                          ></Dots>
                  </v-flex>
                  <v-text-field 
                    v-if="showSpecialities(skill.name)"
                    label="Specialties" 
                    single-line
                    v-model="character.specialties[skill.name.toLowerCase()]" 
                    @input="save"></v-text-field>          
                </v-layout>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-btn small flat color="primary" dark @click="toggleAllSpecialties()">View specialties</v-btn>
          </v-card-actions>
        </v-card>
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
      this.$eventHub.$emit("autoSave");
    },
    getSkillsByCategory: function(category) {
      return skills.filter(skill => skill.category == category);
    },
    incrementValue: function(fieldName) {
      this.character.incrementSkill(fieldName);
      this.save();
    },
    decrementValue: function(fieldName) {
      this.character.decrementSkill(fieldName);
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
  props: ["character", "noHeader"],
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
