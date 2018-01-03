<template>
  <v-container fluid grid-list-md text-xs-center>
    <v-layout flex>
      <v-flex xs12>
        <v-card>
        <v-card-title v-if="!noHeader" primary-title>
          <h4 class="headline mb-0">Legacy</h4>
        </v-card-title>
          <v-card-text>
            <v-flex xs12 sm12 md4><v-select
              :items="legacyNames"
              v-model="character.legacy"
              label="Legacy name"
              autocomplete
              @input="save()"
            ></v-select></v-flex>

                  
                      <v-card>
                        <v-card-text>
                        "name":"Austere",
                        "nicknames":[""],
                        "tagline":"",
                        "hand":["L"],
                        "order":["Guardians of the Veil"],
                        "path":[""],
                        "arcana":["Matter","Life"],
                        "sources":[{"sourceBook":"Guardians of the Veil","sourcePage":"72-175"}],
                        </v-card-text>
                      </v-card>
            <v-expansion-panel expand>
              <v-expansion-panel-content>
                <div slot="header"><h3>Description</h3></div>  
                <v-card>
                  <v-expansion-panel expand>
                    <v-expansion-panel-content v-for="section in getLegacy(character.legacy).sections" :key="section.title">
                      <div slot="header">
                        {{section.title}}
                      </div>
                      <v-card>
                        <v-card-text>
                          {{section.text}}
                        </v-card-text>
                      </v-card>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-card>
              </v-expansion-panel-content>
              <v-expansion-panel-content>
                <div slot="header"><h3>Attainments</h3></div>  
                <v-card> 
                  {{character.legacy.attainmentDescription}}
                  <v-expansion-panel expand>
                    <v-expansion-panel-content v-for="attainment in getLegacy(character.legacy).attainments" :key="attainment.order">
                      <div slot="header">
                        {{attainment.order}}
                        <strong>{{attainment.name}}</strong>
                        Requires: {{attainment.prerequisites}}
                      </div>
                      <v-card>
                        <v-card-text>
                          {{attainment.description}}
                        </v-card-text>
                      </v-card>
                    </v-expansion-panel-content>
                  </v-expansion-panel>          
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-card-text>
          <v-card-actions>

            <v-btn v-if="attainable(1)" small flat color="primary" dark @click="takeAttainment(1)">Take First Attainment</v-btn>
            <v-btn v-if="attainable(1)" small flat color="primary" dark @click="takeAttainment(2)">Take Second Attainment</v-btn>
            <v-btn v-if="attainable(1)" small flat color="primary" dark @click="takeAttainment(3)">Take Third Attainment</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex> 
    </v-layout> 
  </v-container>
</template>

<script>
import Dots from "./input/Dots.vue";
import legacies from "../data/legacies.json";

export default {
  model: {
    prop: "character"
  },
  props: ["character", "noHeader"],
  data() {
    return {};
  },
  computed: {
    legacyNames: function() {
      return legacies
        .map(legacy => {
          return legacy.name;
        })
        .sort();
    }
  },
  methods: {
    takeAttainment: function(number) {
      this.character.legacyAttainment = number;
    },
    getLegacy: function(legacyName) {
      return legacies.filter(legacy => legacy.name == legacyName)[0];
    },
    save: function() {
      this.$eventHub.$emit("autoSave");
    },
    attainable: function(number) {
      return (
        (this.character.legacy && !this.character.legacyAttainment) ||
        this.character.legacyAttainment < 1
      );
    }
  },
  components: {
    Dots: Dots
  }
};
</script>
