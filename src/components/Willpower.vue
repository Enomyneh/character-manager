<template>
  <v-container fluid grid-list-md text-xs-center>
    <v-layout flex>
      <v-flex xs12>
        <v-card>
        <v-card-title v-if="!noHeader" primary-title>
          <h4 class="headline mb-0">Willpower</h4>
        </v-card-title>
          <v-card-text>
            <div>
                <img v-for="n in character.maxWillpowerDots() - character.spentWillpowerDots" :key="'maxWillpower'+n" src="/public/dot-filled.png"><img v-for="n in unusedSpace()" :key="'unusedDots'+n" src="/public/dot-empty.png">
            </div>
            <div>
                <img v-for="n in character.willpower" :key="'willpower'+n" src="/public/box-stroke.png"><img v-for="n in usedWillpower()" :key="'unusedWillpower'+n" src="/public/box-empty.png"><img v-for="n in unusedSpace()" :key="'unusedBoxes'+n" src="/public/box-empty-grey.png">
            </div>
          </v-card-text>
          <v-card-actions>
            <v-icon class="material-icons red--text" style="cursor: pointer" @click="character.adjustWillpower(-1); save();">remove_circle_outline</v-icon>
            <v-icon class="material-icons green--text" style="cursor: pointer" @click="character.adjustWillpower(1); save();">add_circle</v-icon>
            <v-btn small flat color="primary" dark @click="character.adjustSpentWillpowerDots(1); save();">Spend willpower dot</v-btn>
            <v-btn small flat color="primary" dark @click="character.adjustSpentWillpowerDots(-1); save();">Regain willpower dot</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex> 
    </v-layout> 
  </v-container>
</template>

<script>
import Dots from "./input/Dots.vue";

export default {
  model: {
    prop: "character"
  },
  props: ["character", "noHeader"],
  data() {
    return {};
  },
  methods: {
    usedWillpower: function() {
      return Math.max(
        0,
        this.character.maxWillpower() - this.character.willpower
      );
    },
    unusedSpace: function() {
      return Math.max(0, 10 - this.character.maxWillpower());
    },
    save: function() {
      this.$eventHub.$emit("autoSave");
    }
  },
  components: {
    Dots: Dots
  }
};
</script>
