<template>
  <v-layout row wrap>
    <v-flex xs12 sm2><v-text-field label="Name" v-model="combatant.name"></v-text-field></v-flex>
    <v-flex xs12 sm4><v-text-field label="Notes" v-model="combatant.notes"></v-text-field></v-flex>

    <v-flex xs12 sm1><v-text-field label="Wits" v-model="combatant.wits" type="number" min="1"></v-text-field></v-flex>
    <v-flex xs12 sm1><v-text-field label="Resolve" v-model="combatant.resolve" type="number" min="1"></v-text-field></v-flex>
    <v-flex xs12 sm1><v-text-field label="Strength" v-model="combatant.strength" type="number" min="1"></v-text-field></v-flex>
    <v-flex xs12 sm1><v-text-field label="Dexterity" v-model="combatant.dexterity" type="number" min="1"></v-text-field></v-flex>
    <v-flex xs12 sm1><v-text-field label="Stamina" v-model="combatant.stamina" type="number" min="1"></v-text-field></v-flex>
    <v-flex xs12 sm1><v-text-field label="Composure" v-model="combatant.composure" type="number" min="1"></v-text-field></v-flex>
    
    <v-flex xs12 sm1><v-text-field label="Int" v-model="combatant.baseInitiative" type="number" min="0"></v-text-field></v-flex>
    <v-flex xs12 sm1><v-text-field label="Mod" v-model="combatant.additionInitiative" type="number" min="0"></v-text-field></v-flex>
    <v-flex xs12 sm1><v-text-field label="Roll" v-model="combatant.initiativeRoll" type="number" min="1" max="10"></v-text-field></v-flex>
    <v-flex xs12 sm1><v-text-field dark class="secondary" label="=" :value="initiativeTotal()" readonly></v-text-field></v-flex>
    <v-flex xs12 sm1><v-text-field label="Max Health" :value="combatant.maxHealth()" type="number" min="1" max="10"></v-text-field></v-flex>

    <v-flex xs12 sm1><v-text-field label="Size" v-model="combatant.size" type="number" min="1"></v-text-field></v-flex>
    <v-flex xs12 sm1><v-text-field box label="Defense" :value="combatant.defense()" type="number" min="0"></v-text-field></v-flex>
    <v-flex xs12 sm1><v-text-field box label="Initiative" :value="combatant.initiativeMod()" type="number" min="0"></v-text-field></v-flex>
    <v-flex xs12 sm1><v-text-field box label="Speed" :value="combatant.speed()" type="number" min="0"></v-text-field></v-flex>

    <Health :character="combatant" :no-header="true"/>

  </v-layout>
</template>

<script>
import Health from "../Health.vue";

export default {
  model: {
    prop: "combatant"
  },
  props: ["combatant"],
  data() {
    return {};
  },
  calculated: {},
  methods: {
    initiativeTotal: function() {
      return (
        Number(this.combatant.baseInitiative) +
        Number(this.combatant.additionInitiative) +
        Number(this.combatant.initiativeRoll)
      );
    }
  },
  components: {
    Health
  }
};
</script>
