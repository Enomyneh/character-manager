<template>
    <v-card>
      <v-card-text>
        <v-expansion-panel expand popout>
          <v-expansion-panel-content v-for="(combatant, index) in combatants" :key="index">
            <div slot="header">
              <h3>
                {{combatant.name}} {{combatant.initiativeTotal}} - 
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
  methods: {
    addCombatant: function() {
      this.combatants.push(new Character());
    }
  },
  components: {
    Combatant,
    HealthDots
  }
};
</script>
