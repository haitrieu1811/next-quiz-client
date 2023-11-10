import { PaginationType, SuccessResponse } from "./utils.types";

// Type: Answer
export type AnswerType = {
  name: string;
  description: string;
  is_correct: boolean;
  images: string[];
};

// Type: Question
export type QuestionType = {
  _id: string;
  quiz_id: string;
  name: string;
  description: string;
  images: string[];
  answers: AnswerType[];
  created_at: string;
  updated_at: string;
};

// Request: Tạo câu hỏi mới
export type CreateQuestionReqBody = {
  quiz_id: string;
  name: string;
  description?: string;
  images?: string[];
  answers: AnswerType[];
};

// Request: Xóa câu hỏi (một hoặc nhiều)
export type DeleteQuestionsReqBody = {
  question_ids: string[];
};

// Response: Tạo câu hỏi mới thành công
export type CreateQuestionResponse = SuccessResponse<{
  question: QuestionType;
}>;

// Response: Lấy danh sách các câu hỏi của một quiz (theo quiz_id)
export type GetQuestionsByQuizIdResponse = SuccessResponse<{
  questions: QuestionType[];
  pagination: PaginationType;
}>;

// Response: Cập nhật câu hỏi mới thành công
export type UpdateQuestionResponse = SuccessResponse<{
  question: QuestionType;
}>;

// Response: Lấy câu hỏi theo id
export type GetQuestionResponse = SuccessResponse<{
  question: QuestionType;
}>;