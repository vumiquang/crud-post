import { addPost, deletePost, fetchAllPost, updatePost } from "@/api/posts";

const state = {
  posts: [],
};

const mutations = {
  SET_POSTS: (state, posts) => {
    state.posts = posts;
  },
  ADD_NEW_POST: (state, post) => {
    state.posts.push(post);
  },
  UPDATE_POST: (state, post) => {
    state.posts.forEach((p) => {
      if (p.id === post.id) p = post;
    });
  },
  DELETE_POST: (state, id) => {
    state.posts = state.posts.filter((p) => p.id !== id);
  },
};

const actions = {
  getPostsFromDB({ commit }) {
    fetchAllPost().then((response) =>
      commit("SET_POSTS", response.data.slice(0, 10))
    );
  },

  addNewPost({ commit }, data) {
    addPost(data).then((response) => {
      commit("ADD_NEW_POST", { ...response.data, id: data.id });
    });
  },

  updatePost({ commit }, data) {
    updatePost(data).then((response) => {
      commit("UPDATE_POST", { ...response.data, id: data.id });
    });
  },

  deletePost({ commit }, id) {
    deletePost(id).then((response) => {
      console.log(response.json());
      commit("DELETE_POST", id);
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
