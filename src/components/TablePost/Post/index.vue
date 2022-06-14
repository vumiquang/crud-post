<template lang="">
  <tr>
    <td>{{ data.title }}</td>
    <td>{{ data.body }}</td>
    <td scope="row">
      <button type="button" class="btn btn-warning" @click="editPost(data)">
        Edit
      </button>
    </td>
    <td scope="row">
      <button type="button" class="btn btn-danger" @click="deletePost">
        Delete
      </button>
    </td>
  </tr>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    ...mapActions("input", ["setDataSelect"]),
    ...mapActions("posts", ["shouldDeletePost"]),
    editPost() {
      this.$store.dispatch("input/setErrorEmpty");
      this.$store.dispatch("input/setDataSelect", this.data);
      this.$store.dispatch("input/setControlInput", this.data);
      this.$store.dispatch("input/setIsEdit", true);
      window.scrollTo(0, 0);
    },
    deletePost() {
      this.$store.dispatch("input/setDataSelect", this.data);
      this.$emit("deletePost");
    },
  },
};
</script>

<style lang=""></style>
