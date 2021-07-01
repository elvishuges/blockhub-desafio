import { desafioAPI } from "./index";

export default {
  getAllUsers() {
    return desafioAPI.get("/user");
  },
  create(params) {
    return desafioAPI.post("/user", params);
  },
};
