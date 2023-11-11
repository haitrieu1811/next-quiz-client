import axios, { InternalAxiosRequestConfig, type AxiosInstance } from "axios";

import {
  URL_LOGIN,
  URL_LOGOUT,
  URL_REFRESH_TOKEN,
  URL_REGISTER,
  URL_UPDATE_ME,
} from "@/apis/user.apis";
import { AuthResponse, RefreshTokenResponse } from "@/types/auth.types";
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
import { HttpStatusCode } from "@/constants/enum";
import { isExpiredTokenError, isUnauthorizedError } from "./utils";
import { ErrorResponse } from "@/types/utils.types";

class Http {
  instance: AxiosInstance;
  private access_token: string | null = null;
  private refresh_token: string | null = null;
  private user: UserType | null = null;
  private refresh_token_request: Promise<string> | null = null;

  constructor() {
    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
      timeout: 10000,
      headers: { "X-Custom-Header": "foobar" },
    });

    this.access_token = getAccessTokenFromLS();
    this.refresh_token = getRefreshTokenFromLS();
    this.user = getUserFromLS();

    this.instance.interceptors.request.use(
      (config) => {
        if ((this, this.access_token && config.headers)) {
          config.headers.Authorization = `Bearer ${this.access_token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response) => {
        const { url, method } = response.config;
        if (
          url &&
          method &&
          [URL_LOGIN, URL_REGISTER, URL_UPDATE_ME].includes(url) &&
          ["post", "put", "patch"].includes(method)
        ) {
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
      async (error) => {
        // Thông báo lỗi nếu không phải lỗi 422 (Lỗi validate) hoặc 401 (Sai, thiếu hoặc hết hạn access token)
        if (
          ![
            HttpStatusCode.UnprocessableEntity,
            HttpStatusCode.Unauthorized,
          ].includes(error.response?.status as number)
        ) {
          const data: any | undefined = error.response?.data;
          const message = data?.message || error.message;
          // toast.error(message);
        }
        // Xử lý lỗi 401 (Sai, thiếu hoặc hết hạn access token)
        if (
          isUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(
            error
          )
        ) {
          const config =
            error.response?.config ||
            ({ headers: {} } as InternalAxiosRequestConfig);
          const { url } = config;
          // Xử lý khi hết hạn token
          if (isExpiredTokenError(error) && url !== URL_REFRESH_TOKEN) {
            this.refresh_token_request = this.refresh_token_request
              ? this.refresh_token_request
              : this.handleRefreshToken().finally(() => {
                  setTimeout(() => {
                    this.refresh_token_request = null;
                  }, 10000);
                });
            return this.refresh_token_request.then((access_token) => {
              config.headers.Authorization = `Bearer ${access_token}`;
              // Tiếp tục request cũ nếu bị lỗi
              return this.instance({
                ...config,
                headers: {
                  ...config.headers,
                  Authorization: `Bearer ${access_token}`,
                },
              });
            });
          }
          resetAuthLS();
          this.access_token = "";
          this.refresh_token = "";
          this.user = null;
          // toast.error(error.response?.data.data?.message || error.response?.data.message);
        }
        return Promise.reject(error);
      }
    );
  }

  // Xử lý refresh token
  private handleRefreshToken = async () => {
    return this.instance
      .post<RefreshTokenResponse>(URL_REFRESH_TOKEN, {
        refresh_token: this.refresh_token,
      })
      .then((res) => {
        const { access_token, refresh_token } = res.data.data;
        setAccessTokenToLS(access_token);
        setRefreshTokenToLS(refresh_token);
        this.access_token = access_token;
        this.refresh_token = refresh_token;
        return access_token;
      })
      .catch((error) => {
        resetAuthLS();
        this.access_token = "";
        this.refresh_token = "";
        throw error;
      });
  };
}

const http = new Http().instance;
export default http;
