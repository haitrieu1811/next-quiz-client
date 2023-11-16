import http from "@/lib/http";
import { UploadImagesResponse } from "@/types/image.types";
import { OnlyMessageResponse } from "@/types/utils.types";

const imageApis = {
  // Tải ảnh lên
  upload(body: FormData) {
    return http.post<UploadImagesResponse>("/images/upload", body);
  },

  // Xóa ảnh
  delete(id: string) {
    return http.delete<OnlyMessageResponse>(`/images/${id}`);
  },
};

export default imageApis;
