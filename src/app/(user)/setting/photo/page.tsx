import { Separator } from "@/components/ui/separator";
import PhotoForm from "../_components/photo-form";

const Photo = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Hình ảnh</h3>
        <p className="text-sm text-muted-foreground">
          Ảnh đại diện và ảnh bìa của bạn sẽ được hiển thị trên trang cá nhân
          của bạn.
        </p>
      </div>
      <Separator />
      <PhotoForm />
    </div>
  );
};

export default Photo;
