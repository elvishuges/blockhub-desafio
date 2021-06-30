var axios = require("axios");
import { getToken } from "@/store/utils/token";

export const desafioBaseURL = "https://api-desafio-blockub.herokuapp.com/";

export const desafioAPI = axios.create({
  baseURL: desafioBaseURL,
  /* other custom settings */
  headers: {
    Authorization: "Bearer " + getToken(),
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
