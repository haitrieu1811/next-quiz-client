import axios, { type AxiosInstance } from "axios";

import { URL_LOGIN, URL_LOGOUT, URL_REGISTER } from "@/apis/user.apis";
import { AuthResponse } from "@/types/auth.types";
import { UserType } from "@/types/user.types";
import {
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  getUserFromLS,
  resetAuthLS,
  setAccessTokenToLS,
  setRefreshTokenToLS,
  setUserToLS,
} from "./auth";

class Http {
  instance: AxiosInstance;
  private access_token: string | null = null;
  private refresh_token: string | null = null;
  private user: UserType | null = null;

  constructor() {
    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
      timeout: 10000,
      headers: { "X-Custom-Header": "foobar" },
    });

    this.access_token = getAccessTokenFromLS();
    this.refresh_token = getRefreshTokenFromLS();
    this.user = getUserFromLS();

    // Add a request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        // Do something before request is sent
        if ((this, this.access_token && config.headers)) {
          config.headers.Authorization = `Bearer ${this.access_token}`;
        }
        return config;
      },
      (error) => {
        // Do something with request error
        return Promise.reject(error);
      }
    );

    // Add a response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        const { url } = response.config;
        if ((url && url === URL_LOGIN) || url === URL_REGISTER) {
          const { access_token, refresh_token, user } = (
            response.data as AuthResponse
          ).data;
          this.access_token = access_token;
          this.refresh_token = refresh_token;
          this.user = user;
          setAccessTokenToLS(access_token);
          setRefreshTokenToLS(refresh_token);
          setUserToLS(user);
        }
        if (url === URL_LOGOUT) {
          this.access_token = null;
          this.refresh_token = null;
          this.user = null;
          resetAuthLS();
        }
        return response;
      },
      (error) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
      }
    );
  }
}

const http = new Http().instance;
export default http;
