"use client";

import * as z from "zod";

import { UserGender } from "@/constants/enum";
import { USERS_MESSAGES } from "@/constants/messages";
import { numberEnumToArray } from "@/lib/utils";

const userGenders = numberEnumToArray(UserGender);

export const userSchema = z.object({
  email: z.string().email({
    message: USERS_MESSAGES.INVALID_EMAIL,
  }),
  password: z
    .string()
    .min(8, {
      message: USERS_MESSAGES.PASSWORD_IS_WEAK,
    })
    .max(32, {
      message: USERS_MESSAGES.PASSWORD_IS_WEAK,
    }),
  fullname: z
    .string()
    .min(2, {
      message: USERS_MESSAGES.FULLNAME_LENGTH_IS_INVALID,
    })
    .max(32, {
      message: USERS_MESSAGES.FULLNAME_LENGTH_IS_INVALID,
    })
    .optional(),
  username: z
    .string()
    .min(6, {
      message: USERS_MESSAGES.USERNAME_LENGTH_IS_INVALID,
    })
    .max(32, {
      message: USERS_MESSAGES.USERNAME_LENGTH_IS_INVALID,
    })
    .optional(),
  bio: z
    .string()
    .min(6, {
      message: USERS_MESSAGES.BIO_LENGTH_IS_INVALID,
    })
    .max(255, {
      message: USERS_MESSAGES.BIO_LENGTH_IS_INVALID,
    })
    .optional(),
  gender: z
    .number()
    .min(0, {
      message: USERS_MESSAGES.GENDER_IS_INVALID,
    })
    .max(userGenders.length - 1, {
      message: USERS_MESSAGES.GENDER_IS_INVALID,
    })
    .optional(),
  phone_number: z.string().optional(),
  date_of_birth: z.date().optional(),
});

// Đăng ký
export const registerSchema = userSchema
  .pick({
    email: true,
    password: true,
  })
  .extend({
    confirm_password: z
      .string()
      .min(8, {
        message: USERS_MESSAGES.PASSWORD_IS_WEAK,
      })
      .max(32, {
        message: USERS_MESSAGES.PASSWORD_IS_WEAK,
      }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: USERS_MESSAGES.CONFIRM_PASSWORD_DOES_NOT_MATCH,
    path: ["confirm_password"],
  });

// Đăng nhập
export const loginSchema = userSchema.pick({
  email: true,
  password: true,
});

// Cập nhật thông tin người dùng
export const updateMeSchema = userSchema.pick({
  fullname: true,
  username: true,
  bio: true,
  gender: true,
  phone_number: true,
  date_of_birth: true,
});

// Đổi mật khẩu
export const changePasswordSchema = z
  .object({
    old_password: z
      .string()
      .min(8, {
        message: USERS_MESSAGES.PASSWORD_IS_WEAK,
      })
      .max(32, {
        message: USERS_MESSAGES.PASSWORD_IS_WEAK,
      }),
    password: z
      .string()
      .min(8, {
        message: USERS_MESSAGES.PASSWORD_IS_WEAK,
      })
      .max(32, {
        message: USERS_MESSAGES.PASSWORD_IS_WEAK,
      }),
    confirm_password: z
      .string()
      .min(8, {
        message: USERS_MESSAGES.PASSWORD_IS_WEAK,
      })
      .max(32, {
        message: USERS_MESSAGES.PASSWORD_IS_WEAK,
      }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: USERS_MESSAGES.CONFIRM_PASSWORD_DOES_NOT_MATCH,
    path: ["confirm_password"],
  });

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
export type UpdateMeSchema = z.infer<typeof updateMeSchema>;
export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
