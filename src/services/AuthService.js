import { desafioAPI } from "./index";

export default {
  login(params) {
    return desafioAPI.post("/login", params);
  },
  register(params) {
    return desafioAPI.post("/register", params);
  },
};
