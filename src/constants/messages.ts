export const USERS_MESSAGES = {
  INVALID_EMAIL: "Địa chỉ email không hợp lệ",
  PASSWORD_IS_WEAK: "Mật khẩu phải từ 8 đến 50 ký tự",
  CONFIRM_PASSWORD_DOES_NOT_MATCH: "Nhập lại mật khẩu không chính xác",
  FULLNAME_LENGTH_IS_INVALID: "Họ tên phải từ 2 đến 32 ký tự",
  USERNAME_LENGTH_IS_INVALID: "Tên người dùng phải từ 6 đến 32 ký tự",
  BIO_LENGTH_IS_INVALID: "Tiểu sử phải từ 6 đến 255 ký tự",
  GENDER_IS_INVALID: "Giới tính không hợp lệ",
  PHONE_NUMBER_IS_INVALID: "Số điện thoại không hợp lệ",
} as const;

export const QUIZZES_MESSAGES = {
  QUIZ_LEVEL_IS_INVALID: "Cấp độ bài trắc nghiệm không hợp lệ",
  QUIZ_TOPIC_IS_REQUIRED: "Hãy chọn chủ đề cho bài trắc nghiệm",
  QUIZ_NAME_LENGTH_IS_INVALID: "Tên bài trắc nghiệm phải từ 6 đến 255 ký tự",
  QUIZ_DESCRIPTION_LENGTH_IS_INVALID:
    "Mô tả bài trắc nghiệm phải từ 20 đến 1000 ký tự",
  QUESTION_NAME_IS_REQUIRED: "Tên câu hỏi không được để trống",
  ANSWER_NAME_IS_REQUIRED: "Tên câu trả lời không được để trống",
  QUIZ_ID_IS_REQUIRED: "ID bài trắc nghiệm không được để trống",
  CREATE_QUESTION_SUCCESS: "Tạo câu hỏi thành công",
  CREATE_QUESTION_SUCCESS_DESCRIPTION:
    "Câu hỏi đã được thêm vào bài trắc nghiệm",
  CREATE_QUIZ_SUCCESS_TITLE: "Tạo bài trắc nghiệm thành công",
  CREATE_QUIZ_SUCCESS_DESCRIPTION: "Bài trắc nghiệm đã được tạo thành công",
} as const;
