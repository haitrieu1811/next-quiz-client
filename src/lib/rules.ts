"use client";

import * as z from "zod";

import { USERS_MESSAGES } from "@/constants/messages";

// User
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
});

// Đăng ký
export const registerSchema = userSchema
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

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
