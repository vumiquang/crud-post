const state = {
  isEdit: false,
  dataSelected: null,
  controlInput: {
    title: "",
    body: "",
    error: {
      title: "",
      body: "",
    },
    validate: function (name) {
      if (this[name] === "") this.error[name] = "This field is required!";
      else this.error[name] = "";
    },
  },
};

const mutations = {
  SET_IS_EDIT: (state, status) => {
    state.isEdit = status;
  },
  SET_DATA_SELECT: (state, data) => {
    state.dataSelected = data;
  },
  SET_CONTROL_INPUT: (state, { title, body }) => {
    if (typeof title !== "undefined") state.controlInput.title = title;
    if (typeof body !== "undefined") state.controlInput.body = body;
  },
  VALIDATE_INPUT: (state, name) => {
    state.controlInput.validate(name);
  },
  SET_ERROR_EMPTY: (state) => {
    state.controlInput.error.title = "";
    state.controlInput.error.body = "";
  },
};

const actions = {
  setIsEdit({ commit }, status) {
    commit("SET_IS_EDIT", status);
  },
  setDataSelect({ commit }, data) {
    commit("SET_DATA_SELECT", data);
  },
  setControlInput({ commit }, data) {
    commit("SET_CONTROL_INPUT", data);
  },
  validateInput({ commit }, name) {
    commit("VALIDATE_INPUT", name);
  },
  setErrorEmpty({ commit }) {
    commit("SET_ERROR_EMPTY");
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
