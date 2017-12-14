<template>
  <v-container fluid grid-list-md v-if="spellDefinition">
    <v-layout flex>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            <h4 class="mb-0">{{spellDefinition.name}} - <span v-for="requirement in spellDefinition.requirements" :key="'requirement'+requirement.name"><span>{{requirement.name}}</span> {{requirement.dots}}</span></h4>
          </v-card-title>
          <v-card-text>
            
            <div>Practice <strong>{{spellDefinition.practice}}</strong></div>
            <div>Action <strong>{{spellDefinition.action}}</strong></div>
            <div>Duration <strong>{{spellDefinition.duration}}</strong></div>
            <div>Aspect <strong>{{spellDefinition.aspect}}</strong></div>
            <div>Cost <strong>{{spellDefinition.cost}}</strong></div>
            {{spellDefinition.effect}}
          </v-card-text>
          <v-card-actions>
          </v-card-actions>
        </v-card>
      </v-flex> 
    </v-layout> 
  </v-container>
</template>

<script>
import spells from "../../data/spells.json";

var loadSpell = function(spellName) {
  return spells.filter(s => s.name == spellName)[0];
};

export default {
  model: {
    prop: "spellName"
  },
  props: ["spellName"],
  data() {
    return {};
  },
  computed: {
    spellDefinition: function() {
      return loadSpell(this.spellName);
    }
  },
  methods: {},
  components: {}
};
</script>
