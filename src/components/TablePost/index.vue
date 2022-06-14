<template lang="">
  <div>
    <!-- Modal delete-->
    <ModalDeletePost
      v-if="isShowDeleteModal"
      @closeDeleteModal="closeDeleteModal"
    ></ModalDeletePost>
    <!-- Modal edit table -->
    <ModalEditPost
      v-if="isShowEditModal"
      @closeEditModal="closeEditModal"
    ></ModalEditPost>
    <!-- Table post -->
    <table class="table table-striped table-hover table-dark">
      <thead>
        <tr>
          <th scope="col" style="width: 150px">Title</th>
          <th scope="col">Body</th>
          <th scope="col" style="width: 80px"></th>
          <th scope="col" style="width: 100px"></th>
        </tr>
      </thead>
      <tbody>
        <Post
          v-for="(data, index) in header"
          :key="index"
          :data="data"
          @deletePost="openDeleteModal"
          @editPost="openEditModal"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import Modal from "../Modal";
import Post from "./Post";
import ModalDeletePost from "./ModalDeletePost";
import ModalEditPost from "./ModalEditPost";

import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      isShowEditModal: false,
      isShowDeleteModal: false,
    };
  },
  props: {
    header: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    Post,
    Modal,
    ModalDeletePost,
    ModalEditPost,
  },
  computed: {
    ...mapGetters(["getShouldDeletePost", "getDataSelect"]),
  },
  methods: {
    ...mapActions("posts", ["shouldDeletePost"]),
    closeDeleteModal() {
      this.isShowDeleteModal = false;
    },
    openDeleteModal() {
      this.isShowDeleteModal = true;
    },
    openEditModal() {
      this.isShowEditModal = true;
    },
    closeEditModal() {
      this.isShowEditModal = false;
      this.$store.dispatch("input/setIsEdit", false);
      this.$store.dispatch("input/resetInput");
    },
  },
};
</script>

<style lang=""></style>
