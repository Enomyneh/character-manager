<template>
  <span>
    <span v-if="!compact">
        <img v-for="n in maxHealth" src="/public/dot-filled.png" :key="'filledDots'+n"><img v-for="n in unusedSpace()" src="/public/dot-empty.png" :key="'emptyDots'+n">
    </span><br v-if="!compact"/>
    <span>
        <img v-for="n in aggravated" src="/public/box-asterix.png" :key="'aggravated'+n"><img v-for="n in lethal" :key="'lethal'+n" src="/public/box-cross.png"><img v-for="n in bashing" :key="'bashing'+n" src="/public/box-stroke.png"><img v-for="n in undamaged()"  :key="'undamaged'+n" src="/public/box-empty.png"><img  v-if="!compact" v-for="n in unusedSpace()" :key="'unused'+n" src="/public/box-empty-grey.png">
    </span><br v-if="!compact"/>
    <span v-if="rollPenalty < 0">
      <span v-if="!compact">Roll penalty: </span><strong>{{rollPenalty}} to all rolls</strong>
    </span>
  </span>
</template>

<script>
export default {
  props: [
    "bashing",
    "lethal",
    "aggravated",
    "maxHealth",
    "rollPenalty",
    "compact"
  ],
  methods: {
    undamaged: function() {
      return Math.max(
        0,
        this.maxHealth - (this.bashing + this.lethal + this.aggravated)
      );
    },
    emptyDots: function() {
      return 15 - this.maxHealth;
    },
    unusedSpace: function() {
      return Math.max(0, 15 - this.maxHealth);
    }
  }
};
</script>
