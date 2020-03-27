import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import firebase from "firebase";
import VueTextareaAutosize from 'vue-textarea-autosize'

Vue.use(VueTextareaAutosize)

Vue.config.productionTip = false

firebase.initializeApp({
  apiKey: "AIzaSyAujyVeDOVyNu75MYZrmF2QcnaCfhuFFPU",
  authDomain: "moodioproject.firebaseapp.com",
  databaseURL: "https://moodioproject.firebaseio.com",
  projectId: "moodioproject",
  storageBucket: "moodioproject.appspot.com",
  messagingSenderId: "213397002682",
  appId: "1:213397002682:web:5c96bbff8777d32fbba583",
  measurementId: "G-D9L0L9QQGT"

});

export const db = firebase.firestore();

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
