<template>
  <v-container grid-list-md text-xs-center>
              <h4 class="text-center">Flaws</h4>
        <div v-for="(flaw, index) in character.flaws" :key="'flaw'+index">
            
        <v-text-field label="Flaw" v-model="flaw.name" @input="updateflaw(index, flaw)"></v-text-field>
                <v-btn small color="primary" dark @click="removeFlaw(index)">❌</v-btn>
        </div>
        <div>
            <button class="btn btn-info pull-right" @click="addFlaw()">Add</button>
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
