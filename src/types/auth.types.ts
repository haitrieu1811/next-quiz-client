import { UserType } from "./user.types";
import { SuccessResponse } from "./utils.types";

// Response: Authentication response
export type AuthResponse = SuccessResponse<{
  access_token: string;
  refresh_token: string;
  user: UserType;
}>;
