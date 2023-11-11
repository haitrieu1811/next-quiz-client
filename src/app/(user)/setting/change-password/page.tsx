import { Separator } from "@/components/ui/separator";
import ChangePasswordForm from "../_components/change-password-form";

const Profile = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Thay đổi mật khẩu</h3>
        <p className="text-sm text-muted-foreground">
          Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho bất kỳ ai.
        </p>
      </div>
      <Separator />
      <ChangePasswordForm />
    </div>
  );
};

export default Profile;
