<template lang="">
  <div class="mb-3">
    <div class="mb-3">
      <label class="form-label">Title</label>
      <input
        type="text"
        class="form-control"
        v-model="getControlInput.title"
        @input="isValidInput('title')"
        @blur="isValidInput('title')"
        :class="{ invalid: getControlInput.error.title !== '' }"
      />
      <p class="text-danger" v-show="getControlInput.error.title !== ''">
        {{ getControlInput.error.title }}
      </p>
    </div>
    <div class="mb-3">
      <label class="form-label">Body</label>
      <input
        type="text"
        class="form-control"
        v-model="getControlInput.body"
        @input="isValidInput('body')"
        @blur="isValidInput('body')"
        :class="{ invalid: getControlInput.error.body !== '' }"
      />
      <p class="text-danger" v-show="getControlInput.error.body !== ''">
        {{ getControlInput.error.body }}
      </p>
    </div>
    <button
      type="button"
      class="btn btn-primary"
      v-show="!isEdit"
      @click="addPost"
    >
      Add
    </button>
    <button
      type="button"
      class="btn btn-warning me-3"
      v-show="isEdit"
      @click="editPost"
    >
      Edit
    </button>
    <button
      type="button"
      class="btn btn-secondary"
      v-show="isEdit"
      @click="cancelEdit"
    >
      Cancels
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { v4 } from "uuid";

export default {
  computed: {
    ...mapGetters(["isEdit", "getControlInput"]),
  },
  methods: {
    ...mapActions("posts", ["addNewPost"]),
    ...mapActions("input", ["setControlInput"]),
    isValidInput(check) {
      if (check == "title") {
        this.$store.dispatch("input/validateInput", "title");
      } else if (check == "body") {
        this.$store.dispatch("input/validateInput", "body");
      } else {
        this.$store.dispatch("input/validateInput", "title");
        this.$store.dispatch("input/validateInput", "body");
      }
      if (!this.$store.getters.isControlInputValid) {
        return false;
      } else {
        return true;
      }
    },
    addPost() {
      if (!this.isValidInput()) return;

      const data = {
        id: v4(),
        title: this.getControlInput.title,
        body: this.getControlInput.body,
      };
      this.setControlInput({ title: "", body: "" });
      this.addNewPost(data)
        .then(() => {
          this.$toast.success("Add success!", {
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
          this.$toast.error("Add fail! Can not connect server", {
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
    cancelEdit() {
      this.$store.dispatch("input/setIsEdit", false);
      this.$store.dispatch("input/setDataSelect", null);
      this.$store.dispatch("input/setControlInput", { title: "", body: "" });
      this.$store.dispatch("input/setErrorEmpty");
    },
    editPost() {
      if (!this.isValidInput()) return;

      const { id } = this.$store.getters.getDataSelect;
      const { title, body } = this.$store.getters.getControlInput;
      this.cancelEdit();

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
