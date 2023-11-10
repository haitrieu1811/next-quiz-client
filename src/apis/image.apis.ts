import http from "@/lib/http";
import { UploadImagesResponse } from "@/types/image.types";

export const URL_UPLOAD_IMAGE = "/images/upload";

const imageApis = {
  // Tải ảnh lên
  upload(body: FormData) {
    return http.post<UploadImagesResponse>(URL_UPLOAD_IMAGE, body);
  },
};

export default imageApis;
