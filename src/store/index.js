import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import posts from "./modules/posts";
import input from "./modules/input";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  modules: {
    posts,
    input,
  },
  getters,
});

export default store;
