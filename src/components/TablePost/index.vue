<template lang="">
  <div>
    <!-- Modal -->
    <Modal
      title="Do you delete this post ?"
      :button="{ color: 'btn-danger', text: 'Delete' }"
      @close="closeModal"
      @main-event="deletePost"
      v-show="isShowModal"
    >
      <div class="fw-bold fs-4">
        {{ getDataSelect !== null ? getDataSelect.title : "" }}
      </div>
      <div>{{ getDataSelect !== null ? getDataSelect.body : "" }}</div>
    </Modal>
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
          @deletePost="openModal"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import Modal from "../Modal";
import Post from "./Post";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      isShowModal: false,
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
  },
  computed: {
    ...mapGetters(["getShouldDeletePost", "getDataSelect"]),
  },
  methods: {
    ...mapActions("posts", ["shouldDeletePost"]),
    closeModal() {
      this.isShowModal = false;
    },
    openModal() {
      this.isShowModal = true;
    },
    deletePost() {
      this.closeModal();
      const { id } = this.$store.getters.getDataSelect;
      this.$store.dispatch("posts/shouldDeletePost", false);
      this.$store
        .dispatch("posts/deletePost", id)
        .then(() => {
          this.$toast.info("Delete success!", {
            position: "top-right",
            timeout: 5000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false,
          });
        })
        .catch(() => {
          this.$toast.error("Delete fail!Can not connect server", {
            position: "top-right",
            timeout: 5000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false,
          });
        });
    },
  },
};
</script>

<style lang=""></style>
