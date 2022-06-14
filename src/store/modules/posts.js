import { addPost, deletePost, fetchAllPost, updatePost } from "@/api/posts";

const state = {
  posts: [],
  shouldDeletePost: false,
};

const mutations = {
  SET_POSTS: (state, posts) => {
    state.posts = posts;
  },
  ADD_NEW_POST: (state, post) => {
    state.posts.push(post);
  },
  UPDATE_POST: (state, post) => {
    state.posts = state.posts.map((p) => {
      if (p.id === post.id) {
        return post;
      } else {
        return p;
      }
    });
  },
  DELETE_POST: (state, id) => {
    state.posts = state.posts.filter((p) => p.id !== id);
  },
  SHOULD_DELETE_POST: (state, status) => {
    state.shouldDeletePost = status;
  },
};

const actions = {
  getPostsFromDB({ commit }) {
    fetchAllPost().then((response) => {
      commit("SET_POSTS", response.data.slice(0, 4));
    });
  },

  addNewPost({ commit }, data) {
    return addPost(data).then((response) => {
      commit("ADD_NEW_POST", { ...response.data, id: data.id });
    });
  },

  updatePost({ commit }, data) {
    return updatePost({ ...data, id: 1 }).then((response) => {
      console.log(response);
      commit("UPDATE_POST", data);
    });
  },

  deletePost({ commit }, id) {
    return deletePost(id).then((response) => {
      if (response.status == 200) {
        commit("DELETE_POST", id);
      } else alert("Somethings went wrong!");
    });
  },

  shouldDeletePost({ commit }, status) {
    commit("SHOULD_DELETE_POST", status);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
