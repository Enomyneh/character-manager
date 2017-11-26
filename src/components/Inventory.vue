<template>
  <v-container grid-list-md text-xs-center>
    <h4 class="text-center">Inventory</h4>
    <div>
        Maximum carry of
        <strong>{{character.carryingCapacity()}}</strong>.
    </div>    
    <v-btn small color="primary" dark @click="addItem()">Add item</v-btn>

    <v-layout row wrap v-for="(item, index) in character.inventory" :key="index">
        <v-text-field label="Item description" v-model="item.name" @input="updateItem(index, item)"></v-text-field>
            Carried:
            <input type="checkbox" v-model="item.carried" />
        <v-btn small fab color="primary" dark @click="removeItem(index)"><i class="material-icons">delete</i></v-btn>
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
