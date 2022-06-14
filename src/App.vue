<template>
  <div class="container pt-5">
    <div class="w-100">
      <InputPost />
      <TablePost :header="getAllPost" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import InputPost from "./components/InputPost";
import TablePost from "./components/TablePost";
export default {
  components: {
    InputPost,
    TablePost,
  },
  computed: {
    ...mapGetters(["getAllPost"]),
  },
  methods: {
    ...mapActions("posts", ["getPostsFromDB"]),
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
