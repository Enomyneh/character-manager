<template>
  <v-layout column align-center>
    <h4 class="text-center">Attributes</h4>
    <v-text-field
          name="input-1"
          label="Strength"
          id="testing"
          v-model="character.strength"
          @input="save"
        ></v-text-field>
  </v-layout>
</template>

<script>
export default {
  model: {
    prop: "character"
  },
  methods: {
    save: function() {
      this.$eventHub.$emit("saveCharacterToFile");
    }
  },
  props: ["character"],
  data() {
    return {};
  }
};
</script>
