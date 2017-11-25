<template>
  <v-container grid-list-md text-xs-center>
    <h4 class="text-center">Notes</h4>
    <v-text-field @input="save" label="Notes" v-model="character.notes" multi-line></v-text-field>
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
    }
  },
  components: {}
};
</script>
