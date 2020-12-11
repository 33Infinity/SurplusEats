import axios from "axios";

const Axios = axios.create({
  baseURL: "https://us-central1-surplus-functions.cloudfunctions.net/",
  timeout: 1000,
  headers: {},
});

Axios.interceptors.request.use(
  (config: any): any | Promise<any> => {
    console.table(config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const Get = async (path: string): Promise<string> => {
  let response: string = "";
  await Axios.get(path)
    .then((res) => {
      response = res.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return response;
};

const Post = async (path: string): Promise<void> => {};

const API = {
  Get,
  Post,
};

export default API;
