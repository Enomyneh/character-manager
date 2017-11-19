<template>
  <v-layout column align-center>
    <h4 class="text-center">Personal</h4>
    <v-text-field
          name="input-1"
          label="Name"
          id="testing"
          v-model="character.name"
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
