"use client";

import * as z from "zod";

import { USERS_MESSAGES } from "@/constants/messages";

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

export const loginSchema = userSchema.pick({
  email: true,
  password: true,
});

export type LoginSchema = z.infer<typeof loginSchema>;
