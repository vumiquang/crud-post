import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import posts from "./modules/posts";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    posts,
  },
  getters,
});

export default store;
