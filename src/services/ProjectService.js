import { desafioAPI } from "./index";

export default {
  getAllProjects() {
    return desafioAPI.get("/project");
  },
  create(params) {
    return desafioAPI.post("/project", params);
  },
};
