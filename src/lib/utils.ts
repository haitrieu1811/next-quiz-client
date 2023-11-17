import axios, { AxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { HttpStatusCode } from "@/constants/enum";
import { ErrorResponse } from "@/types/utils.types";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const isAxiosErrror = <T>(err: unknown): err is AxiosError<T> => {
  return axios.isAxiosError(err);
};

export const isEntityError = <FormError>(
  err: unknown
): err is AxiosError<FormError> => {
  return (
    isAxiosErrror(err) &&
    err.response?.status === HttpStatusCode.UnprocessableEntity
  );
};

export const isUnauthorizedError = <UnauthorizedError>(
  err: unknown
): err is AxiosError<UnauthorizedError> => {
  return (
    isAxiosErrror(err) && err.response?.status === HttpStatusCode.Unauthorized
  );
};

export const isExpiredTokenError = <UnauthorizedError>(
  err: unknown
): err is AxiosError<UnauthorizedError> => {
  return (
    isUnauthorizedError<ErrorResponse<{}>>(err) &&
    err.response?.data.message === "Jwt expired"
  );
};

export const numberEnumToArray = (numberEnum: {
  [key: string]: string | number;
}) => {
  return Object.values(numberEnum).filter(
    (item) => typeof item === "number"
  ) as number[];
};

export const convertMomentToVietnamese = (timeString: string): string => {
  return timeString
    .replace("a few seconds ago", "vài giây trước")
    .replace("seconds ago", "giây trước")
    .replace("a minute ago", "1 phút trước")
    .replace("minutes ago", "phút trước")
    .replace("an hour ago", "1 giờ trước")
    .replace("hours ago", "giờ trước")
    .replace("a day ago", "1 ngày trước")
    .replace("days ago", "ngày trước")
    .replace("a month ago", "1 tháng trước")
    .replace("months ago", "tháng trước")
    .replace("a year ago", "1 năm trước")
    .replace("years ago", "năm trước");
};
