<template>
    <div>
        <v-icon class="red--text" style="cursor: pointer" @click="$emit('decrement')">remove_circle_outline</v-icon>
        <v-icon class="black--text" v-for="n in filled()" :key="'f'+n">lens</v-icon><v-icon v-for="n in unfilled()" :key="'u'+n" class="material-icons">panorama_fish_eye</v-icon>
        <v-icon class="green--text" style="cursor: pointer" @click="$emit('increment')">add_circle</v-icon>
    </div>
</template>

<script>
export default {
  model: {
    prop: "value"
  },
  props: {
    value: {
      type: Number,
      required: true
    },
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    }
  },
  methods: {
    filled: function() {
      return this.value;
    },
    unfilled: function() {
      return this.max - this.value;
    },
    increment: function() {
      this.setValue(this.value + 1);
    },
    decrement: function() {
      this.setValue(this.value - 1);
    },
    setValue: function(newValue) {
      var value = Math.min(this.max, Math.max(newValue, this.min));
      this.$emit("update:value", value);
    }
  },
  data() {
    return {
      text: this.value
    };
  }
};
</script>
