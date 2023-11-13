"use client";

import PropTypes from "prop-types";

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
    title: "Tạo quiz",
    href: PATH.CONTRIBUTE_CREATE_QUIZ,
  },
  {
    title: "Tạo câu hỏi",
    href: PATH.CONTRIBUTE_CREATE_QUESTION,
  },
  {
    title: "Tạo chủ đề",
    href: PATH.CONTRIBUTE_CREATE_TOPIC,
  },
];

interface ContributeLayoutProps {
  children: React.ReactNode;
}

const Contribute = ({ children }: ContributeLayoutProps) => {
  return (
    <div className="hidden space-y-6 p-10 md:block">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Đóng góp</h2>
        <p className="text-muted-foreground">
          Đóng góp cho cộng đồng bằng cách tạo bài quiz và câu hỏi mới.
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
  );
};

Contribute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default protectedRoute(Contribute);
