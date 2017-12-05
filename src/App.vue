<template>
  <v-app>
    <v-navigation-drawer fixed :mini-variant="miniVariant" :clipped="clipped" v-model="drawer" app>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-list>
        <v-list-tile avatar value="true" v-for="(item, i) in items" :key="i" @click="callMenuItem(item)">
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app :clipped-left="clipped">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
<!--
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>remove</v-icon>
      </v-btn>
      -->
      <v-toolbar-title v-text="title"></v-toolbar-title>
      
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>face</v-icon>
      </v-btn>

    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <CharacterEditor/>
        </v-slide-y-transition>
      </v-container>
    </v-content>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
    >
      <v-list>
        <v-list-tile v-for="(character, index) in loadableCharacters" :key="'char'+index"
          @click.native="loadFromBrowser(character.id)">
          <v-list-tile-title>{{character.name}}</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click.native="right = !right">
          <v-list-tile-action>
            <v-icon>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017 James Hurburgh</span>
    </v-footer>
  </v-app>
</template>

<script>
import CharacterDao from "./dataAccess/CharacterDao.js";
import CharacterEditor from "./components/CharacterEditor.vue";

export default {
  data() {
    return {
      characterDao: CharacterDao,
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        { icon: "create", title: "New Character", func: this.newCharacter },
        { icon: "loop", title: "Random Character", func: this.randomCharacter },
        // {
        //   icon: "cloud_upload",
        //   title: "Save to browser",
        //   func: this.saveLocally
        // },
        // { icon: "cloud_download", title: "Load from browser" },
        {
          icon: "file_download",
          title: "Save to file",
          func: this.saveToFile
        },
        {
          icon: "file_upload",
          title: "Load from file",
          func: this.loadFromFile
        }
      ],
      miniVariant: false,
      right: true,
      title: this.getTitle(),
      rightDrawer: false,
      callMenuItem: function(menuItem) {
        console.log("Calling function " + menuItem.title);
        if (menuItem.func) {
          menuItem.func();
        }
      }
    };
  },
  created: function() {
    this.$eventHub.$on("nameChange", newName => {
      this.subTitle = newName;
      this.title = this.getTitle();
    });
  },
  computed: {
    loadableCharacters: function() {
      var ids = this.characterDao.getLocalCharacterIds();
      var chars = ids.map(id => {
        return CharacterDao.loadLocally(id);
      });
      return chars;
    }
  },
  methods: {
    getTitle: function() {
      if (!this.subTitle) {
        console.log("Getting page title: " + "Character Manager");
        return "Character Manager";
      }
      console.log("Getting page title: " + "Character Manager" + this.subTitle);
      return "Character Manager - " + this.subTitle;
    },
    newCharacter: function() {
      this.$eventHub.$emit("newCharacter");
    },
    randomCharacter: function() {
      this.$eventHub.$emit("randomCharacter");
    },
    saveToFile: function() {
      this.$eventHub.$emit("saveToFile");
    },
    loadFromFile: function() {
      this.$eventHub.$emit("loadFromFile");
    },
    loadFromBrowser: function(id) {
      this.$eventHub.$emit("loadFromBrowser", id);
    }
  },
  components: {
    CharacterEditor
  }
};
</script>
