"use client";

import { UserType } from "@/types/user.types";

export const setAccessTokenToLS = (acesssToken: string) => {
  if (typeof window === "undefined") return;
  return localStorage.setItem("access_token", acesssToken);
};

export const getAccessTokenFromLS = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
};

export const removeAccessTokenFromLS = () => {
  if (typeof window === "undefined") return;
  return localStorage.removeItem("access_token");
};

export const setRefreshTokenToLS = (refreshToken: string) => {
  if (typeof window === "undefined") return;
  return localStorage.setItem("refresh_token", refreshToken);
};

export const getRefreshTokenFromLS = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("refresh_token");
};

export const removeRefreshTokenFromLS = () => {
  if (typeof window === "undefined") return;
  return localStorage.removeItem("refresh_token");
};

export const setUserToLS = (user: UserType) => {
  if (typeof window === "undefined") return;
  return localStorage.setItem("user", JSON.stringify(user));
};

export const getUserFromLS = (): UserType | null => {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};

export const removeUserFromLS = () => {
  if (typeof window === "undefined") return;
  return localStorage.removeItem("user");
};

export const resetAuthLS = () => {
  removeAccessTokenFromLS();
  removeRefreshTokenFromLS();
  removeUserFromLS();
};
