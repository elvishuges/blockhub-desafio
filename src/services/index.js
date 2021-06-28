var axios = require("axios");

export const desafioBaseURL = "https://api-desafioblockub.herokuapp.com/";

export const desafioAPI = axios.create({
  baseURL: desafioBaseURL,
  /* other custom settings */
  headers: {
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
