<template>
  <v-layout column align-center>
    <h4 class="text-center">Personal</h4>
    <v-text-field @input="save" label="Name" v-model="character.name"></v-text-field>
    <v-text-field @input="save" label="Age" v-model="character.age" type="number" min="0"></v-text-field>
    <v-text-field @input="save" label="Player" v-model="character.player"></v-text-field>
    <v-text-field @input="save" label="Chronicle" v-model="character.chronicle"></v-text-field>
    <v-text-field @input="save" label="Concept" v-model="character.concept"></v-text-field>

    <v-text-field @input="save" label="Virtue" v-model="character.virtue"></v-text-field>
    <v-text-field @input="save" label="Vice" v-model="character.vice"></v-text-field>
    <v-text-field @input="save" label="Path" v-model="character.path"></v-text-field>
    <v-text-field @input="save" label="Order" v-model="character.order"></v-text-field>
    <v-text-field @input="save" label="Cabal" v-model="character.cabal"></v-text-field>

    <v-text-field @input="save" label="Size" v-model="character.size" type="number" min="0"></v-text-field>
    <v-text-field @input="save" label="Defense" v-model="character.defense" type="number" min="0"></v-text-field>
    <v-text-field @input="save" label="Initiative" v-model="character.initiative" type="number" min="0"></v-text-field>
    <v-text-field @input="save" label="Speed" v-model="character.speed" type="number" min="0"></v-text-field>
    <v-text-field @input="save" label="Experience" v-model="character.experience" type="number"></v-text-field>
    <v-text-field @input="save" label="Cabal xp" v-model="character.cabalxp" type="number"></v-text-field>
    <v-text-field @input="save" label="Arcane xp" v-model="character.arcanexp" type="number"></v-text-field>
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
