import http from "@/lib/http";
import {
  CreateQuizReqBody,
  CreateQuizResponse,
  DeleteQuizzesReqBody,
  GetQuizResponse,
  GetQuizzesReqQuery,
  GetQuizzesResponse,
  UpdateQuizReqBody,
  UpdateQuizResponse,
} from "@/types/quiz.types";
import { OnlyMessageResponse } from "@/types/utils.types";

const quizApis = {
  // Tạo quiz mới
  createQuiz(body: CreateQuizReqBody) {
    return http.post<CreateQuizResponse>("/quizzes", body);
  },

  // Lấy danh sách các quiz
  getQuizzes(params?: GetQuizzesReqQuery) {
    return http.get<GetQuizzesResponse>("/quizzes", { params });
  },

  // Lấy thông tin một quiz
  getQuiz(quiz_id: string) {
    return http.get<GetQuizResponse>(`/quizzes/${quiz_id}`);
  },

  // Cập nhật thông tin một quiz
  updateQuiz({ quiz_id, body }: { quiz_id: string; body: UpdateQuizReqBody }) {
    return http.patch<UpdateQuizResponse>(`/quizzes/${quiz_id}`, body);
  },

  // Xóa một hoặc nhiều quiz
  deleteQuizzes(data: DeleteQuizzesReqBody) {
    return http.delete<OnlyMessageResponse>("/quizzes", { data });
  },
};

export default quizApis;
