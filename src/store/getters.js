const getters = {
  getAllPost: (state) => {
    console.log("__", state);
    return state.posts;
  },
  getPostById: (state) => (id) => state.posts.find((p) => p.id === id),
};
export default getters;
