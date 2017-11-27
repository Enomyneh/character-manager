<template>
  <v-container grid-list-md text-xs-center>
    <h4 v-if="!noHeader" class="text-center">Notes</h4>
    <v-text-field 
      ref="notesBox"
      v-if="textBoxEditable"
      @input="save"
      @blur="textBoxEditable = !textBoxEditable"
      label="Notes" 
      v-model="character.notes" 
      multi-line
      auto-grow
    ></v-text-field>
    <v-container text-xs-left
      v-if="!textBoxEditable"
      @click="textBoxEditable = !textBoxEditable; $refs.notesBox.focus();"
    ><div v-html="formattedNotes"></div></v-container>
  </v-container>
</template>

<script>
var Remarkable = require("remarkable");
var md = new Remarkable();

export default {
  model: {
    prop: "character"
  },
  props: ["character", "noHeader"],
  data() {
    return {
      textBoxEditable: false
    };
  },
  computed: {
    formattedNotes: function() {
      return md.render(this.character.notes);
    }
  },
  methods: {
    save: function() {
      this.$eventHub.$emit("autoSave");
    }
  },
  components: {}
};
</script>
