import { desafioAPI } from "./index";

export default {
  getAllUsers() {
    return desafioAPI.get("/user");
  },
};
