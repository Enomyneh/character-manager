<template>
    <v-card>
      <v-card-text>
        <v-expansion-panel expand popout>
          <v-expansion-panel-content v-for="(combatant, index) in combatants" :key="index">
            <div slot="header">
              <h3>
                {{combatant.name}} [{{initiativeTotal(combatant)}}.{{combatant.initiativeSubroll1}}.{{combatant.initiativeSubroll2}}.{{combatant.initiativeSubroll3}}]  
                <health-dots
                  :bashing="combatant.bashingDamage"
                  :lethal="combatant.lethalDamage"
                  :aggravated="combatant.aggravatedDamage"
                  :maxHealth="combatant.maxHealth()"
                  :roll-penalty="combatant.healthRollPenalty()"
                  compact="true"
                ></health-dots>
              </h3>
            </div>
            <v-card>
      <v-card-text>
              <Combatant :combatant="combatant" />
      </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-card-text>
      <v-card-actions>
      <v-btn small flat color="primary" dark @click="addCombatant()">Add Combatant</v-btn>
      <v-btn small flat color="primary" dark @click="$eventHub.$emit('sortCombatants')">Resort</v-btn>
      </v-card-actions>
    </v-card>
</template>

<script>
import HealthDots from "../HealthDots.vue";
import Combatant from "./Combatant.vue";
import Character from "../../models/Character.js";

export default {
  data() {
    return {
      combatants: []
    };
  },
  created: function() {
    this.$eventHub.$on("sortCombatants", () => {
      this.combatants.sort((a, b) => {

        if (this.initiativeTotal(a) < this.initiativeTotal(b)) { return 1; }
        if (this.initiativeTotal(a) > this.initiativeTotal(b)) { return -1; }
        
        if(a.initiativeSubroll1 < b.initiativeSubroll1) { return 1; }
        if(a.initiativeSubroll1 > b.initiativeSubroll1) { return -1; }
        
        if(a.initiativeSubroll2 < b.initiativeSubroll2) { return 1; }
        if(a.initiativeSubroll2 > b.initiativeSubroll2) { return -1; }
        
        if(a.initiativeSubroll3 < b.initiativeSubroll3) { return 1; }
        if(a.initiativeSubroll3 > b.initiativeSubroll3) { return -1; }
        
        return 0;
      });
    });
  },
  methods: {
    addCombatant: function() {
      var combatant = new Character();
      combatant.initiativeRoll = Math.ceil(Math.random() * 10);
      combatant.initiativeSubroll1 = Math.ceil(Math.random() * 10);
      combatant.initiativeSubroll2 = Math.ceil(Math.random() * 10);
      combatant.initiativeSubroll3 = Math.ceil(Math.random() * 10);
      combatant.additionalInitiative = 0;
      this.combatants.push(combatant);
      this.$eventHub.$emit("sortCombatants");
    },
    initiativeTotal: function(combatant) {
      return (
        Number(combatant.initiativeMod()) +
        Number(combatant.additionalInitiative) +
        Number(combatant.initiativeRoll)
      );
    }
  },
  components: {
    Combatant,
    HealthDots
  }
};
</script>
