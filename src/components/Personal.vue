<template>
  <v-container fluid grid-list-md>
    <v-layout flex>
      <v-flex xs12>
        <v-card>
        <v-card-title v-if="!noHeader" primary-title>
          <h4 class="headline mb-0">Personal</h4>
        </v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12 sm4>
                <v-text-field @input="saveName" label="Name" v-model="character.name"></v-text-field>
                <v-text-field @input="save" label="Age" v-model="character.age" type="number" min="0"></v-text-field>
                <v-text-field @input="save" label="Player" v-model="character.player"></v-text-field>
                <v-text-field @input="save" label="Chronicle" v-model="character.chronicle"></v-text-field>
                <v-text-field @input="save" label="Concept" v-model="character.concept"></v-text-field>
              </v-flex>
              <v-flex xs12 sm4>
                <v-text-field @input="save" label="Virtue" v-model="character.virtue"></v-text-field>
                <v-text-field @input="save" label="Vice" v-model="character.vice"></v-text-field>
                <v-text-field @input="save" label="Path" v-model="character.path"></v-text-field>
                <v-text-field @input="save" label="Order" v-model="character.order"></v-text-field>
                <v-text-field @input="save" label="Cabal" v-model="character.cabal"></v-text-field>
              </v-flex>
              <v-flex xs12 sm4>
                <v-text-field @input="save" label="Size" v-model="character.size" type="number" min="0"></v-text-field>
                <v-text-field @input="save" label="Defense" :value="character.defense()" type="number" min="0"></v-text-field>
                <v-text-field @input="save" label="Initiative" :value="character.initiativeMod()" type="number" min="0"></v-text-field>
                <v-text-field @input="save" label="Speed" :value="character.speed()" type="number" min="0"></v-text-field>
                  <v-text-field @input="save" label="Experience" v-model="character.experience" type="number"></v-text-field>
                  <v-text-field @input="save" label="Cabal xp" v-model="character.cabalxp" type="number"></v-text-field>
                  <v-text-field @input="save" label="Arcane xp" v-model="character.arcanexp" type="number"></v-text-field>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex> 
    </v-layout> 
  </v-container>
</template>

<script>
export default {
  model: {
    prop: "character"
  },
  methods: {
    saveName: function() {
      this.$eventHub.$emit("autoSave");
      this.$eventHub.$emit("nameChange", this.character.name);
    },
    save: function() {
      this.$eventHub.$emit("autoSave");
    }
  },
  props: ["character", "noHeader"],
  data() {
    return {};
  }
};
</script>
