import { QuizLevel } from "@/constants/enum";
import {
  PaginationReqQuery,
  PaginationType,
  SuccessResponse,
} from "./utils.types";

// Type: Quiz
export type QuizType = {
  _id: string;
  name: string;
  thumbnail: string | null;
  level: number;
  topic: string | null;
  description: string;
  created_at: string;
  updated_at: string;
};

// Request: Tạo quiz mới
export type CreateQuizReqBody = {
  name: string;
  level: QuizLevel;
  topic?: string;
  description?: string;
  thumbnail?: string;
};

// Request: Lấy danh sách các quiz
export type GetQuizzesReqQuery = PaginationReqQuery & {
  name?: string;
  level?: number;
  topic?: string;
};

// Request: Cập nhật thông tin một quiz
export type UpdateQuizReqBody = {
  name?: string;
  level?: QuizLevel;
  topic?: string;
  description?: string;
  thumbnail?: string;
};

// Request: Xóa một hoặc nhiều quiz
export type DeleteQuizzesReqBody = {
  quiz_ids: string[];
};

// Response: Tạo quiz mới thành công
export type CreateQuizResponse = SuccessResponse<{
  quiz: QuizType;
}>;

// Response: Lấy danh sách các quiz thành công
export type GetQuizzesResponse = SuccessResponse<{
  quizzes: QuizType[];
  pagination: PaginationType;
}>;

// Response: Cập nhật thông tin một quiz thành công
export type UpdateQuizResponse = SuccessResponse<{
  quiz: QuizType;
}>;
