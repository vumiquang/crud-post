const dataModel = {
  title: "",
  body: "",
  error: {
    title: "",
    body: "",
  },
  validate: {
    title: {
      required: {
        status: true,
        msg: "This field is required !",
      },
    },
    body: {
      required: {
        status: true,
        msg: "This field is required !",
      },
    },
  },
};

const validateFunction = (fieldValidate, input) => {
  let msg = "";
  if (fieldValidate.required !== undefined && fieldValidate.required.status) {
    msg = input === "" ? fieldValidate.required.msg : "";
  }
  return msg;
};

const state = {
  isEdit: false,
  dataSelected: JSON.parse(JSON.stringify(dataModel)),
  controlInput: JSON.parse(JSON.stringify(dataModel)),
};

const mutations = {
  SET_IS_EDIT: (state, status) => {
    state.isEdit = status;
  },
  SET_DATA_SELECT: (state, data) => {
    const { id, title, body } = data;
    state.dataSelected = {
      ...JSON.parse(JSON.stringify(dataModel)),
      id,
      body,
      title,
    };
  },
  SET_CONTROL_INPUT: (state, { title, body }) => {
    if (typeof title !== "undefined") state.dataSelected.title = title;
    if (typeof body !== "undefined") state.dataSelected.body = body;
  },
  VALIDATE_INPUT: (state, name) => {
    state.controlInput.error[name] = validateFunction(state.controlInput.validate[name],state.controlInput[name]);
  },
  VALIDATE_DATA_SELECT: (state, name) => {
    state.dataSelected.error[name] = validateFunction(state.dataSelected.validate[name],state.dataSelected[name]);
  },
  SET_ERROR_EMPTY: (state) => {
    state.controlInput.error.title = "";
    state.controlInput.error.body = "";
  },
  RESET_INPUT: (state) => {
    state.controlInput = JSON.parse(JSON.stringify(dataModel));
  },
  RESET_DATA_SELECT: (state) => {
    state.dataSelected = JSON.parse(JSON.stringify(dataModel));
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
  validateDataSelect({ commit }, name) {
    commit("VALIDATE_DATA_SELECT", name);
  },
  setErrorEmpty({ commit }) {
    commit("SET_ERROR_EMPTY");
  },
  resetInput({ commit }) {
    commit("RESET_INPUT");
  },
  resetDataSelect({ commit }) {
    commit("RESET_DATA_SELECT");
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
