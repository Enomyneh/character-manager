import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

Vue.use(Vuetify)

Vue.prototype.$eventHub = new Vue(); // Global event bus

new Vue({
    el: '#app',
    render: h => h(App)
})