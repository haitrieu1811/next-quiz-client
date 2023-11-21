import {
  QuizAudience,
  QuizLevel,
  UserGender,
  UserRole,
  UserStatus,
} from "@/constants/enum";
import { TopicType } from "./topic.types";
import {
  PaginationReqQuery,
  PaginationType,
  SuccessResponse,
} from "./utils.types";

// Type: Tác giả của quiz
export type QuizAuthorType = {
  _id: string;
  email: string;
  fullname: string;
  username: string;
  avatar: string;
  cover: string;
  bio: string;
  gender: UserGender;
  date_of_birth: string;
  phone_number: string;
  status: UserStatus;
  role: UserRole;
  created_at: string;
  updated_at: string;
};

// Type: Quiz
export type QuizType = {
  _id: string;
  name: string;
  description: string;
  thumbnail: string;
  level: number;
  author: QuizAuthorType;
  topic: TopicType;
  audience: QuizAudience;
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
  user_id?: string;
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

// Response: Lấy thông tin một quiz thành công
export type GetQuizResponse = SuccessResponse<{
  quiz: QuizType;
}>;

// Response: Cập nhật thông tin một quiz thành công
export type UpdateQuizResponse = SuccessResponse<{
  quiz: QuizType;
}>;
