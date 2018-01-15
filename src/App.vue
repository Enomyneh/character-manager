<template>
  <v-app>
    <v-navigation-drawer fixed :mini-variant="miniVariant" :clipped="clipped" v-model="drawer" app>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-list>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>star</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Favourites</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
                <v-list-tile  avatar value="true" v-for="(character, index) in loadableFavouriteCharacters" :key="'char'+index"
          @click="loadFromBrowser(character.id)">
          <v-list-tile-action>
            <v-icon>face</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="character.name"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-spacer></v-spacer>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>Non-Favourites</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile  avatar value="true" v-for="(character, index) in loadableNonfavouriteCharacters" :key="'char'+index"
          @click="loadFromBrowser(character.id)">
          <v-list-tile-action>
            <v-icon>face</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="character.name"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app :clipped-left="clipped">
      <v-btn icon @click.stop="drawer = !drawer">
        <v-icon>folder_shared</v-icon>
      </v-btn>
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
        <v-icon>menu</v-icon>
      </v-btn>

    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <CharacterEditor/>
        </v-slide-y-transition>
        <v-dialog v-model="showingCombatTracker" fullscreen>
          <v-card>
            <v-card-title primary-title>
              <h4 class="headline mb-0">Combat Tracker</h4>
              <v-spacer></v-spacer>
              <v-btn small flat color="primary" dark @click.stop="showingCombatTracker = !showingCombatTracker">Close</v-btn>
            </v-card-title>
            <CombatTracker/>
          </v-card>
        </v-dialog>
      </v-container>
    </v-content>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
    >
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
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017 James Hurburgh</span>
    </v-footer>
  </v-app>
</template>

<script>
import CharacterDao from "./dataAccess/CharacterDao.js";
import CharacterEditor from "./components/CharacterEditor.vue";
import CombatTracker from "./components/dialogs/CombatTracker.vue";

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
        },
        {
          icon: "star",
          title: "Combat Tracker",
          func: this.showCombatTracker
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
      },
      showingCombatTracker: false
    };
  },
  created: function() {
    this.$eventHub.$on("nameChange", newName => {
      this.subTitle = newName;
      this.title = this.getTitle();
    });
  },
  computed: {
    loadableFavouriteCharacters: function() {
      return this.loadableCharacters().filter(char => char.starred);
    },
    loadableNonfavouriteCharacters: function() {
      return this.loadableCharacters().filter(char => !char.starred);
    }
  },
  methods: {
    loadableCharacters: function() {
      var ids = CharacterDao.getLocalCharacterIds();
      var chars = ids.map(id => {
        return CharacterDao.loadLocally(id);
      });
      return chars;
    },
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
    },
    showCombatTracker: function() {
      this.showingCombatTracker = true;
    }
  },
  components: {
    CharacterEditor,
    CombatTracker
  }
};
</script>
