import { QUIZZES_MESSAGES } from "@/constants/messages";
import * as z from "zod";

// Tạo câu hỏi
export const createQuestionSchema = z.object({
  quiz_id: z.string().min(1, {
    message: QUIZZES_MESSAGES.QUIZ_ID_IS_REQUIRED,
  }),
  name: z.string().min(1, {
    message: QUIZZES_MESSAGES.QUESTION_NAME_IS_REQUIRED,
  }),
  description: z.string().optional(),
  images: z.array(z.string()).optional(),
  answers: z.array(
    z.object({
      name: z.string().min(1, {
        message: QUIZZES_MESSAGES.ANSWER_NAME_IS_REQUIRED,
      }),
      description: z.string(),
      is_correct: z.boolean(),
    })
  ),
});

export type CreateQuestionSchema = z.infer<typeof createQuestionSchema>;
