import { UserGender, UserRole, UserStatus } from "@/constants/enum";
import { SuccessResponse } from "./utils.types";

// Type: User
export type UserType = {
  _id: string;
  email: string;
  fullname: string;
  username: string;
  avatar: string | null;
  cover: string | null;
  bio: string;
  gender: UserGender;
  date_of_birth: string;
  phone_number: string;
  status: UserStatus;
  role: UserRole;
  created_at: string;
  updated_at: string;
};

// Request: Đăng nhập
export type LoginReqBody = {
  email: string;
  password: string;
};

// Request: Đăng ký
export type RegisterReqBody = {
  email: string;
  password: string;
  confirm_password: string;
};

// Request: Cập nhật thông tin người dùng hiện tại
export type UpdateMeReqBody = {
  fullname?: string;
  avatar?: string;
  cover?: string;
  bio?: string;
  gender?: UserGender;
  phone_number?: string;
  date_of_birth?: string;
};

// Request: Đổi mật khẩu
export type ChangePasswordReqBody = {
  old_password: string;
  password: string;
  confirm_password: string;
};

// Response: Lấy thông tin người dùng hiện tại
export type GetMeResponse = SuccessResponse<{
  user: UserType;
}>;

// Response: Cập nhật thông tin người dùng hiện tại
export type UpdateMeResponse = SuccessResponse<{
  user: UserType;
}>;
