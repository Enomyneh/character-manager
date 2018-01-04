<template>
  <v-container grid-list-md text-xs-center>
                  <v-text-field
                   color="secondary" 
                    label="Title" 
                    v-model="note.title"
                    @input="save"
                    ></v-text-field>
    <v-text-field 
    ref="editBox"
      v-if="isEditing"
      :autofocus="isEditing"
      @input="$emit('input')"
      @blur="isEditing = !isEditing"
      label="Notes" 
      v-model="note.text" 
      multi-line
      auto-grow
      hint="Formatting can be applied using Markdown syntax"
    ></v-text-field>
    <v-container text-xs-left
      v-if="!isEditing"
      @click="edit"
    ><div v-html="formattedNotes"></div></v-container>
  </v-container>
</template>

<script>
var Remarkable = require("remarkable");
var md = new Remarkable();

export default {
  model: {
    prop: "note"
  },
  props: ["note"],
  data() {
    return {
      isEditing: false
    };
  },
  computed: {
    formattedNotes: function() {
      return md.render(this.note.text);
    }
  },
  methods: {
    save: function() {
      this.$eventHub.$emit("autoSave");
    },
    edit: function() {
      this.isEditing = !this.isEditing;
      // console.log(this.$refs);
      // this.$refs.editBox.focus();
    }
  },
  components: {}
};
</script>
