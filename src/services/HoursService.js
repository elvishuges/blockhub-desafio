import { desafioAPI } from "./index";

export default {
  getAllHours() {
    return desafioAPI.get("/hours");
  },
  create(params) {
    return desafioAPI.post("/hours", params);
  },
};
