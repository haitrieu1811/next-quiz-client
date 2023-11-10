import { PaginationType, SuccessResponse } from "./utils.types";

// Type: Chủ đề quiz
export type TopicType = {
  _id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
};

// Request: Tạo chủ đề quiz mới
export type CreateTopicReqBody = {
  name: string;
  description: string;
};

// Request: Cập nhật chủ đề quiz mới
export type UpdateTopicReqBody = {
  name?: string;
  description?: string;
};

// Request: Xóa chủ đề quiz
export type DeleteTopicsReqBody = {
  topic_ids: string[];
};

// Response: Tạo chủ đề quiz mới thành công
export type CreateTopicResponse = SuccessResponse<{
  topic: TopicType;
}>;

// Response: Tạo chủ đề quiz mới thành công
export type UpdateTopicResponse = SuccessResponse<{
  topic: TopicType;
}>;

// Response: Lấy danh sách chủ đề quiz thành công
export type GetTopicsResponse = SuccessResponse<{
  topics: TopicType[];
  pagination: PaginationType;
}>;
