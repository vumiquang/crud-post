<template lang="">
  <div
    class="modal"
    style="display: block; background-color: rgba(0, 0, 0, 0.5)"
    @click="closeModal($event)"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content" ref="modal">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            {{ title }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="$emit('close')"
          ></button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="$emit('close')"
          >
            Close
          </button>
          <button
            type="button"
            class="btn"
            @click="$emit('main-event')"
            :class="button.color"
          >
            {{ button.text }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: () => "Modal",
    },
    button: {
      type: Object,
      default: () => {
        return { color: "btn-warning", text: "Button" };
      },
    },
  },
  methods: {
    closeModal(event) {
      if (event.target.contains(this.$refs.modal)) {
        this.$emit("close");
      }
    },
  },
};
</script>

<style lang="css" scoped></style>
