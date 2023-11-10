import axios, { type AxiosInstance } from "axios";

class Http {
  instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: "http://localhost:3000",
      timeout: 1000,
      headers: { "X-Custom-Header": "foobar" },
    });
  }
}

const http = new Http().instance;
export default http;
