import { Separator } from "@/components/ui/separator";
import { AppearanceForm } from "../_components/appearance-form";

export default function SettingsAppearancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Giao diện</h3>
        <p className="text-sm text-muted-foreground">
          Tùy chỉnh giao diện của ứng dụng..
        </p>
      </div>
      <Separator />
      <AppearanceForm />
    </div>
  );
}
