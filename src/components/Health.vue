<template>
  <v-container grid-list-md text-xs-center>
    <h4 class="text-center">Health</h4>
        <div v-if="character.healthRollPenalty() < 0">
            Roll penalty: <strong>{{character.healthRollPenalty()}}</strong>
        </div>
        <div>
            <img v-for="n in character.maxHealth()" src="/public/dot-filled.png" :key="'filledDots'+n"><img v-for="n in unusedSpace()" src="/public/dot-empty.png" :key="'emptyDots'+n">
        </div>
        <div>
            <img v-for="n in character.aggravatedDamage" src="/public/box-asterix.png" :key="'aggravated'+n"><img v-for="n in character.lethalDamage" :key="'lethal'+n" src="/public/box-cross.png"><img v-for="n in character.bashingDamage" :key="'bashing'+n" src="/public/box-stroke.png"><img v-for="n in undamaged()"  :key="'undamaged'+n" src="/public/box-empty.png"><img v-for="n in unusedSpace()" :key="'unused'+n" src="/public/box-empty-grey.png">
        </div>
        <div>
            <img src="/public/delete.png" @click="character.healDamage('A', 1); save();" />
            <img src="/public/box-asterix.png">
            <img src="/public/add.png" @click="character.addAggravatedDamage(); save();" />

            <img src="/public/delete.png" @click="character.healDamage('L', 1); save();" />
            <img src="/public/box-cross.png">
            <img src="/public/add.png" @click="character.addLethalDamage(); save();" />

            <img src="/public/delete.png" @click="character.healDamage('B', 1); save();" />
            <img src="/public/box-stroke.png">
            <img src="/public/add.png" @click="character.addBashingDamage(); save();" />
        </div>

  </v-container>
</template>

<script>
export default {
  model: {
    prop: "character"
  },
  props: ["character"],
  data() {
    return {};
  },
  methods: {
    save: function() {
      this.$eventHub.$emit("saveCharacterToFile");
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
      return 15 - this.character.maxHealth();
    }
  }
};
</script>
