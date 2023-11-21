import z from "zod";

import { QUIZZES_MESSAGES } from "@/constants/messages";

// Tạo quiz
export const createQuizSchema = z
  .object({
    name: z
      .string()
      .min(6, {
        message: QUIZZES_MESSAGES.QUIZ_NAME_LENGTH_IS_INVALID,
      })
      .max(255, {
        message: QUIZZES_MESSAGES.QUIZ_NAME_LENGTH_IS_INVALID,
      }),
    description: z.string().optional(),
    level: z.string(),
    topic_id: z.string().min(1, {
      message: QUIZZES_MESSAGES.QUIZ_TOPIC_IS_REQUIRED,
    }),
    thumbnail: z.string().optional(),
    audience: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.description && data.description !== "") {
        return data.description.length >= 20 && data.description.length <= 1000;
      }
      return true;
    },
    {
      message: QUIZZES_MESSAGES.QUIZ_DESCRIPTION_LENGTH_IS_INVALID,
      path: ["description"],
    }
  )
  .transform((data) => {
    return {
      ...data,
      description: data.description?.trim() || undefined,
    };
  });

export type CreateQuizSchema = z.infer<typeof createQuizSchema>;
