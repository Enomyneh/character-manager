<template>
  <v-container fluid grid-list-md text-xs-center>
    <v-layout flex>
      <v-flex xs12>
        <v-card>
        <v-card-title v-if="!noHeader" primary-title>
          <h4 class="headline mb-0">Inventory</h4>
        </v-card-title>
          <v-card-text>
            <div>
              Maximum carry of
              <strong>{{character.carryingCapacity()}}</strong>.
            </div>    
            <v-layout row wrap v-for="(item, index) in character.inventory" :key="index" align-center>
                <v-flex xs10>
                  <v-text-field label="Item description" v-model="item.name" @input="updateItem(index, item)"></v-text-field>
                </v-flex>
                <v-flex xs1>
                  Carried:
                  <input type="checkbox" v-model="item.carried"/>
                </v-flex>
                <v-flex xs1>
                  <v-btn small flat color="primary" dark @click="removeItem(index)"><i class="material-icons">delete</i></v-btn>
                </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-btn small flat color="primary" dark @click="addItem()">Add item</v-btn>
          </v-card-actions>
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
  props: ["character", "noHeader"],
  data() {
    return {};
  },
  methods: {
    save: function() {
      this.$eventHub.$emit("autoSave");
    },
    addItem: function() {
      this.character.inventory.push({
        name: " "
      });
      this.save();
    },
    removeItem: function(index) {
      this.character.inventory.splice(index, 1);
      this.save();
    },
    updateItem: function(index, item) {
      this.character.inventory[index] = item;
      this.save();
    }
  }
};
</script>
