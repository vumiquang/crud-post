const getters = {
  getAllPost: (state) => state.posts.posts,
  getPostById: (state) => (id) => state.posts.posts.find((p) => p.id === id),
  isEdit: (state) => state.input.isEdit,
  getControlInput: (state) => state.input.controlInput,
  getDataSelect: (state) => state.input.dataSelected,
  getShouldDeletePost: (state) => state.posts.shouldDeletePost,
  isControlInputValid: (state) => {
    if (state.input.controlInput.error.title !== "") return false;
    if (state.input.controlInput.error.body !== "") return false;
    return true;
  },
};

export default getters;
