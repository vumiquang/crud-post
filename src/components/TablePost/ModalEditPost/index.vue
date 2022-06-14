<template lang="">
  <Modal
    title="Edit this post"
    :button="{ color: 'btn-warning', text: 'Edit' }"
    @close="closeEditModal"
    @main-event="editPost"
  >
    <div>
      <div class="mb-3">
        <label class="form-label">Title</label>
        <input
          type="text"
          class="form-control"
          v-model="getDataSelect.title"
          @input="isValidInput('title')"
          @blur="isValidInput('title')"
          :class="{ invalid: getDataSelect.error.title !== '' }"
        />
        <p class="text-danger" v-show="getDataSelect.error.title !== ''">
          {{ getDataSelect.error.title }}
        </p>
      </div>
      <div class="mb-3">
        <label class="form-label">Body</label>
        <input
          type="text"
          class="form-control"
          v-model="getDataSelect.body"
          @input="isValidInput('body')"
          @blur="isValidInput('body')"
          :class="{ invalid: getDataSelect.error.body !== '' }"
        />
        <p class="text-danger" v-show="getDataSelect.error.body !== ''">
          {{ getDataSelect.error.body }}
        </p>
      </div>
    </div>
  </Modal>
</template>
<script>
import Modal from "../../Modal";

import { mapGetters } from "vuex";
export default {
  components: {
    Modal,
  },
  computed: {
    ...mapGetters(["getDataSelect"]),
  },
  methods: {
    closeEditModal() {
      this.$emit("closeEditModal");
    },
    isValidInput(check) {
      if (check == "title") {
        this.$store.dispatch("input/validateDataSelect", "title");
      } else if (check == "body") {
        this.$store.dispatch("input/validateDataSelect", "body");
      } else {
        this.$store.dispatch("input/validateDataSelect", "title");
        this.$store.dispatch("input/validateDataSelect", "body");
      }
      if (!this.$store.getters.isDataSelectInputValid) {
        return false;
      } else {
        return true;
      }
    },
    editPost() {
      if (!this.isValidInput()) return;
      const { id } = this.$store.getters.getDataSelect;
      const { title, body } = this.$store.getters.getDataSelect;
      this.$emit("closeEditModal");

      this.$store
        .dispatch("posts/updatePost", {
          id: id,
          title: title,
          body: body,
        })
        .then(() => {
          this.$toast.info("Update success!", {
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
          this.$toast.error("Update fail! Can not connect server", {
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
        .finally(() => {
          this.$store.dispatch("input/resetDataSelect");
        });
    },
  },
};
</script>
<style lang="css">
.form-control.invalid {
  border-color: #dc3545;
}
</style>
