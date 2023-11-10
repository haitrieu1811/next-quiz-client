import http from "@/lib/http";
import {
  CreateQuestionReqBody,
  CreateQuestionResponse,
  DeleteQuestionsReqBody,
  GetQuestionResponse,
  GetQuestionsByQuizIdResponse,
  UpdateQuestionResponse,
} from "@/types/question.types";
import { OnlyMessageResponse, PaginationReqQuery } from "@/types/utils.types";

export const URL_CREATE_QUESTION = "/questions";
export const URL_GET_QUESTIONS_BY_QUIZ_ID = "/questions/quiz";
export const URL_UPDATE_QUESTION = "/questions";
export const URL_DELETE_QUESTIONS = "/questions";
export const URL_GET_QUESTION = "/questions";

const questionApis = {
  // Tạo câu hỏi mới
  createQuestion(body: CreateQuestionReqBody) {
    return http.post<CreateQuestionResponse>(URL_CREATE_QUESTION, body);
  },

  // Lấy danh sách các câu hỏi của một quiz (theo quiz_id)
  getQuestionsByQuizId({
    quiz_id,
    params,
  }: {
    quiz_id: string;
    params: PaginationReqQuery;
  }) {
    return http.get<GetQuestionsByQuizIdResponse>(
      `${URL_GET_QUESTIONS_BY_QUIZ_ID}/${quiz_id}`,
      { params }
    );
  },

  // Cập nhật câu hỏi
  updateQuestion({
    question_id,
    body,
  }: {
    question_id: string;
    body: CreateQuestionReqBody;
  }) {
    return http.put<UpdateQuestionResponse>(
      `${URL_UPDATE_QUESTION}/${question_id}`,
      body
    );
  },

  // Xóa question (một hoặc nhiều)
  deleteQuestions(data: DeleteQuestionsReqBody) {
    return http.delete<OnlyMessageResponse>(`${URL_DELETE_QUESTIONS}`, {
      data,
    });
  },

  // Lấy câu hỏi theo id
  getQuestion(question_id: string) {
    return http.get<GetQuestionResponse>(`${URL_GET_QUESTION}/${question_id}`);
  },
};

export default questionApis;
