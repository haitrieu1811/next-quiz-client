import { Separator } from "@/components/ui/separator";
import { NotificationsForm } from "../_components/notifications-form";

export default function SettingsNotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Thông báo</h3>
        <p className="text-sm text-muted-foreground">
          Định cấu hình cách bạn nhận thông báo.
        </p>
      </div>
      <Separator />
      <NotificationsForm />
    </div>
  );
}
