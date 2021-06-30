import { desafioAPI } from "./index";

export default {
  getAllHours() {
    return desafioAPI.get("/hours");
  },
};
