import http from "@/lib/http";
import { OnlyMessageResponse, PaginationReqQuery } from "@/types/utils.types";
import {
  CreateTopicReqBody,
  CreateTopicResponse,
  DeleteTopicsReqBody,
  GetTopicsResponse,
  UpdateTopicReqBody,
  UpdateTopicResponse,
} from "../types/topic.types";

export const URL_CREATE_QUIZ_TOPIC = "/topics";
export const URL_UPDATE_QUIZ_TOPIC = "/topics";

const quizApis = {
  // Tạo chủ đề quiz mới
  createTopic(body: CreateTopicReqBody) {
    return http.post<CreateTopicResponse>(URL_CREATE_QUIZ_TOPIC, body);
  },

  // Cập nhật chủ đề quiz
  updateTopic({
    body,
    topicId,
  }: {
    body: UpdateTopicReqBody;
    topicId: string;
  }) {
    return http.patch<UpdateTopicResponse>(
      `${URL_UPDATE_QUIZ_TOPIC}/${topicId}`,
      body
    );
  },

  // Lấy danh sách chủ đề quiz
  getTopics(params: PaginationReqQuery) {
    return http.get<GetTopicsResponse>(URL_UPDATE_QUIZ_TOPIC, { params });
  },

  // Xóa chủ đề quiz (một hoặc nhiều)
  deleteTopics(data: DeleteTopicsReqBody) {
    return http.delete<OnlyMessageResponse>(URL_UPDATE_QUIZ_TOPIC, { data });
  },
};

export default quizApis;
