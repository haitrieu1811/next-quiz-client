import { UserType } from "@/types/user.types";

export const setAccessTokenToLS = (acesssToken: string) => {
  return localStorage.setItem("access_token", acesssToken);
};

export const getAccessTokenFromLS = () => {
  return localStorage.getItem("access_token");
};

export const removeAccessTokenFromLS = () => {
  return localStorage.removeItem("access_token");
};

export const setRefreshTokenToLS = (refreshToken: string) => {
  return localStorage.setItem("refresh_token", refreshToken);
};

export const getRefreshTokenFromLS = () => {
  return localStorage.getItem("refresh_token");
};

export const removeRefreshTokenFromLS = () => {
  return localStorage.removeItem("refresh_token");
};

export const setUserToLS = (user: UserType) => {
  return localStorage.setItem("user", JSON.stringify(user));
};

export const getUserFromLS = (): UserType | null => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};

export const removeUserFromLS = () => {
  return localStorage.removeItem("user_info");
};

export const resetAuthLS = () => {
  removeAccessTokenFromLS();
  removeRefreshTokenFromLS();
  removeUserFromLS();
};
