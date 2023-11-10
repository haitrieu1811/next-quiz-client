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
