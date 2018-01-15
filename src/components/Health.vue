<template>
  <v-container fluid grid-list-md text-xs-center>
    <v-layout flex>
      <v-flex xs12>
        <v-card>
        <v-card-title v-if="!noHeader" primary-title>
          <h4 class="headline mb-0">Health</h4>
        </v-card-title>
          <v-card-text>
            <health-dots
              :bashing="character.bashingDamage"
              :lethal="character.lethalDamage"
              :aggravated="character.aggravatedDamage"
              :maxHealth="character.maxHealth()"
              :roll-penalty="character.healthRollPenalty()"
              compact            ></health-dots>
          </v-card-text>
          <v-card-actions v-if="mode != 'readonly'">
            <i class="material-icons green--text" style="cursor: pointer" @click="character.healDamage('A', 1); save();">remove_circle_outline</i>
            <img src="/public/box-asterix.png">
            <i class="material-icons red--text" style="cursor: pointer" @click="character.addAggravatedDamage(); save();">add_circle</i>

            <i class="material-icons green--text" style="cursor: pointer" @click="character.healDamage('L', 1); save();">remove_circle_outline</i>
            <img src="/public/box-cross.png">
            <i class="material-icons red--text" style="cursor: pointer" @click="character.addLethalDamage(); save();">add_circle</i>

            <i class="material-icons green--text" style="cursor: pointer" @click="character.healDamage('B', 1); save();">remove_circle_outline</i>
            <img src="/public/box-stroke.png">
            <i class="material-icons red--text" style="cursor: pointer" @click="character.addBashingDamage(); save();">add_circle</i>
          </v-card-actions>
        </v-card>
      </v-flex> 
    </v-layout> 
  </v-container>
</template>

<script>
import HealthDots from "./HealthDots.vue";

export default {
  model: {
    prop: "character"
  },
  props: ["character", "noHeader", "compact", "mode"],
  data() {
    return {};
  },
  methods: {
    save: function() {
      this.$eventHub.$emit("autoSave");
    },
    undamaged: function() {
      return Math.max(
        0,
        this.character.maxHealth() -
          (this.character.bashingDamage +
            this.character.lethalDamage +
            this.character.aggravatedDamage)
      );
    },
    emptyDots: function() {
      return 15 - this.character.maxHealth();
    },
    unusedSpace: function() {
      return Math.max(0, 15 - this.character.maxHealth());
    }
  },
  components: {
    HealthDots
  }
};
</script>
