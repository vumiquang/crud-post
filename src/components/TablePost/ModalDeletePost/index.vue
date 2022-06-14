<template lang="">
  <Modal
    title="Do you delete this post ?"
    :button="{ color: 'btn-danger', text: 'Delete' }"
    @close="closeDeleteModal"
    @main-event="deletePost"
  >
    <div class="fw-bold fs-4">
      {{ getDataSelect !== null ? getDataSelect.title : "" }}
    </div>
    <div>{{ getDataSelect !== null ? getDataSelect.body : "" }}</div>
  </Modal>
</template>

<script>
import { mapGetters } from "vuex";
import Modal from "../../Modal";

export default {
  computed: {
    ...mapGetters(["getDataSelect"]),
  },
  components: {
    Modal,
  },
  methods: {
    closeDeleteModal() {
      this.$emit("closeDeleteModal");
    },
    deletePost() {
      this.closeDeleteModal();
      const { id } = this.$store.getters.getDataSelect;
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
