import { desafioAPI } from "./index";

export default {
  getAllProjects() {
    return desafioAPI.get("/project");
  },
};
