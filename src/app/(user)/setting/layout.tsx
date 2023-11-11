"use client";

import Image from "next/image";
import { Fragment } from "react";

import { Separator } from "@/components/ui/separator";
import PATH from "@/constants/path";
import protectedRoute from "@/hoc/protected-route";
import SidebarNav from "./_components/sidebar-nav";

// export const metadata: Metadata = {
//   title: "Forms",
//   description: "Advanced form example using react-hook-form and Zod.",
// };

const sidebarNavItems = [
  {
    title: "Hồ sơ",
    href: PATH.SETTING,
  },
  {
    title: "Hình ảnh",
    href: PATH.SETTING_PHOTO,
  },
  {
    title: "Đổi mật khẩu",
    href: PATH.SETTING_CHANGE_PASSWORD,
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

const SettingsLayout = ({ children }: SettingsLayoutProps) => {
  return (
    <Fragment>
      <div className="md:hidden">
        <Image
          src="/examples/forms-light.png"
          width={1280}
          height={791}
          alt="Forms"
          className="block dark:hidden"
        />
        <Image
          src="/examples/forms-dark.png"
          width={1280}
          height={791}
          alt="Forms"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden space-y-6 p-10 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Cài đặt</h2>
          <p className="text-muted-foreground">
            Quản lý cài đặt tài khoản của bạn.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </Fragment>
  );
};

export default protectedRoute(SettingsLayout);
