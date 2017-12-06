<template>
  <v-container grid-list-md text-xs-center>
    <h4 v-if="!noHeader" class="text-center">Notes</h4>

    <v-btn small color="primary" dark @click="addNotesSection">Add note section</v-btn>
    
    <v-expansion-panel expand popout>
      <v-expansion-panel-content v-for="(note, index) in character.noteSections" :key="'note'+index" >
        <div slot="header">
          <h3 
            @click="editTitleIndex = index;"
            v-if="editTitleIndex != index">{{note.title}}</h3>
          <v-text-field
            label="Title" 
            v-if="editTitleIndex == index"
            :autofocus="editTitleIndex == index"
            v-model="note.title"
            @input="save"
            @blur="editTitleIndex = null;"
            ></v-text-field>
        </div>
        <v-card>
          <NotesSection :note.sync="note" @input="save"></NotesSection>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-container>
</template>

<script>
import NotesSection from "./NotesSection.vue";

var Remarkable = require("remarkable");
var md = new Remarkable();

export default {
  model: {
    prop: "character"
  },
  props: ["character", "noHeader"],
  data() {
    return {
      editTitleIndex: null
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
    },
    addNotesSection: function() {
      this.character.noteSections.push({
        title: "New Title",
        text: "New Note"
      });
      this.save();
    }
  },
  components: {
    NotesSection: NotesSection
  }
};
</script>
