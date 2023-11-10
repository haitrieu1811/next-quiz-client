import http from "@/lib/http";
import { getRefreshTokenFromLS } from "@/lib/localStorage";
import { AuthResponse } from "@/types/auth.types";
import {
  ChangePasswordReqBody,
  GetMeResponse,
  LoginReqBody,
  RegisterReqBody,
  UpdateMeReqBody,
} from "../types/user.types";

export const URL_LOGIN = "/users/login";
export const URL_REGISTER = "/users/register";
export const URL_LOGOUT = "/users/logout";
export const URL_REFRESH_TOKEN = "/users/refresh-token";
export const URL_GET_ME = "/users/me";
export const URL_UPDATE_ME = "/users/me";
export const URL_CHANGE_PASSWORD = "/users/change-password";

const userApis = {
  // Đăng nhập
  login(body: LoginReqBody) {
    return http.post<AuthResponse>(URL_LOGIN, body);
  },

  // Đăng ký
  register(body: RegisterReqBody) {
    return http.post(URL_REGISTER, body);
  },

  // Đăng xuất
  logout() {
    const refresh_token = getRefreshTokenFromLS();
    if (!refresh_token) return;
    return http.post(URL_LOGOUT, { refresh_token });
  },

  // Lấy thông tin người dùng hiện tại
  getMe() {
    return http.get<GetMeResponse>(URL_GET_ME);
  },

  // Cập nhật thông tin người dùng hiện tại
  updateMe(body: UpdateMeReqBody) {
    return http.patch(URL_UPDATE_ME, body);
  },

  // Đổi mật khẩu
  changePassword(body: ChangePasswordReqBody) {
    return http.patch(URL_CHANGE_PASSWORD, body);
  },
};

export default userApis;
