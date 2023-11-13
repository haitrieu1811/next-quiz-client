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
  QUIZ_LEVEL_IS_INVALID: "Cấp độ bài quiz không hợp lệ",
  QUIZ_TOPIC_IS_REQUIRED: "Hãy chọn chủ đề cho bài quiz",
  QUIZ_NAME_LENGTH_IS_INVALID: "Tên bài quiz phải từ 6 đến 255 ký tự",
  QUIZ_DESCRIPTION_LENGTH_IS_INVALID:
    "Mô tả bài quiz phải từ 20 đến 1000 ký tự",
};
