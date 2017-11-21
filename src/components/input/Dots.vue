<template>
    <div>
        <img src="/public/delete.png" @click="decrement"/>
        <img v-for="n in filled()" :key="n" src="/public/dot-filled.png"><img v-for="n in unfilled()" :key="n" src="/public/dot-empty.png">
        <img src="/public/add.png" @click="increment" />
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
      this.value = Math.min(this.max, Math.max(newValue, this.min));
      this.$emit("update:value", this.value);
    }
  },
  data() {
    return {
      text: this.value
    };
  }
};
</script>
