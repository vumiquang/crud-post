<template lang="">
  <div>
    <!-- modal delete -->
    <div
      class="modal"
      style="display: block; background-color: rgba(0, 0, 0, 0.5)"
      v-if="getShouldDeletePost"
      @click="closeModal($event)"
    >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content" ref="modal">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Do you delete this post ?
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="shouldDeletePost(false)"
            ></button>
          </div>
          <div class="modal-body">
            <div class="fw-bold fs-4">{{ getDataSelect.title }}</div>
            <div>{{ getDataSelect.body }}</div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="shouldDeletePost(false)"
            >
              Close
            </button>
            <button type="button" class="btn btn-danger" @click="deletePost">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
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
        <Post v-for="(data, index) in header" :key="index" :data="data" />
      </tbody>
    </table>
  </div>
</template>

<script>
import Post from "./Post";
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    header: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapGetters(["getShouldDeletePost", "getDataSelect"]),
  },
  methods: {
    ...mapActions("posts", ["shouldDeletePost"]),
    closeModal(event) {
      if (event.target.contains(this.$refs.modal)) {
        this.shouldDeletePost(false);
      }
    },
    deletePost() {
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
  components: {
    Post,
  },
};
</script>

<style lang=""></style>
