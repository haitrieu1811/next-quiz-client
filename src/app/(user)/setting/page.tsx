import { Separator } from "@/components/ui/separator";
import ProfileForm from "./_components/profile-form";

const Profile = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Hồ sơ</h3>
        <p className="text-sm text-muted-foreground">
          Đây là cách người khác sẽ nhìn thấy bạn trên trang web.
        </p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  );
};

export default Profile;
