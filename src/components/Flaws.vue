<template>
  <v-container grid-list-md text-xs-center>
    <h4 class="text-center">Flaws</h4>
    <v-btn small color="primary" dark @click="addFlaw()">Add</v-btn>
    <v-layout row wrap  align-center v-for="(flaw, index) in character.flaws" :key="'flaw'+index">
        <v-flex xs9>
        <v-text-field label="Flaw" v-model="flaw.name" @input="updateflaw(index, flaw)"></v-text-field>
        </v-flex>
        <v-flex xs3>
        <v-btn small fab color="primary" dark @click="removeFlaw(index)"><i class="material-icons">delete</i></v-btn>
        </v-flex>
    </v-layout>
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
    addFlaw: function() {
      this.character.flaws.push({
        name: ""
      });
      this.save();
    },
    removeFlaw: function(index) {
      this.character.flaws.splice(index, 1);
      this.save();
    },
    updateflaw: function(index, flaw) {
      this.character.flaws[index] = flaw;
      this.save();
    }
  },
  components: {}
};
</script>
