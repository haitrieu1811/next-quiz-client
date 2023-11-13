import http from "@/lib/http";
import {
  CreateQuizReqBody,
  CreateQuizResponse,
  DeleteQuizzesReqBody,
  GetQuizzesReqQuery,
  GetQuizzesResponse,
  UpdateQuizResponse,
} from "@/types/quiz.types";
import { OnlyMessageResponse } from "@/types/utils.types";

export const URL_CREATE_QUIZ = "/quizzes";
export const URL_GET_QUIZZES = "/quizzes";
export const URL_UPDATE_QUIZ = "/quizzes";
export const URL_DELETE_QUIZZES = "/quizzes";

const quizApis = {
  // Tạo quiz mới
  createQuiz(body: CreateQuizReqBody) {
    return http.post<CreateQuizResponse>(URL_CREATE_QUIZ, body);
  },

  // Lấy danh sách các quiz
  getQuizzes(params?: GetQuizzesReqQuery) {
    return http.get<GetQuizzesResponse>(URL_GET_QUIZZES, { params });
  },

  // Cập nhật thông tin một quiz
  updateQuiz({ quiz_id, body }: { quiz_id: string; body: CreateQuizReqBody }) {
    return http.patch<UpdateQuizResponse>(
      `${URL_UPDATE_QUIZ}/${quiz_id}`,
      body
    );
  },

  // Xóa một hoặc nhiều quiz
  deleteQuizzes(data: DeleteQuizzesReqBody) {
    return http.delete<OnlyMessageResponse>(URL_DELETE_QUIZZES, { data });
  },
};

export default quizApis;
