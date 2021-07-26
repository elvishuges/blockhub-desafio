import { getToken, setToken, removeToken } from "../utils/token";
import AuthService from "@/services/AuthService";

const state = {
  token: getToken(),
  usuario: {},
};

const getters = {
  isAuthenticated: (state) => !!state.token,
  token: (state) => state.token,
};

const actions = {
  AUTH_LOGIN_REQUEST: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      const requestParams = {
        email: payload.email,
        password: payload.password,
      };
      AuthService.login(requestParams)
        .then((rsp) => {
          setToken(rsp.data.access_token);
          commit("AUTH_LOGIN_SUCCESS", rsp);
          resolve(true);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  AUTH_REGISTER_REQUEST: ({ commit }, payload) => {
    console.log("#PAYLOAD REGISTER#", payload);
    return new Promise((resolve, reject) => {
      const requestParams = {
        name: payload.name,
        email: payload.email,
        password: payload.password,
      };
      AuthService.register(requestParams)
        .then((rsp) => {
          console.log("register rsp", rsp);
          commit("AUTH_REGISTER_SUCCESS");
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  AUTH_LOGOUT: ({ commit }) => {
    return new Promise((resolve) => {
      commit("AUTH_LOGOUT");
      removeToken();
      resolve();
    });
  },
};

const mutations = {
  AUTH_LOGIN_SUCCESS: (state, resp) => {
    state.token = resp.data.token;
  },
  AUTH_REGISTER_SUCCESS: (state) => {
    state.token = "";
  },
  AUTH_LOGOUT: (state) => {
    state.token = "";
    state.usuario = {};
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
