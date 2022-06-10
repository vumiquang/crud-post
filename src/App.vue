<template>
  <div>
    <div>asasa</div>
    <div>saasd</div>
    <div>{{ getAllPost }}</div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getAllPost"]),
  },
  methods: {
    ...mapActions(["getPostsFromDB", "addNewPost", "updatePost", "deletePost"]),
  },
  created() {
    this.getPostsFromDB();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
