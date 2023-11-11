import { SuccessResponse } from "./utils.types";

// Type: Image
export type ImageType = {
  _id: string;
  name: string;
  created_at: string;
  updated_at: string;
};

// Response: Tải ảnh lên thành công
export type UploadImagesResponse = SuccessResponse<{
  images: ImageType[];
}>;
