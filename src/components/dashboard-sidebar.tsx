"use client";

import classNames from "classnames";
import { FlaskConical, HelpCircle, Home, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import PATH from "@/constants/path";
import BrandLogo from "./brand-logo";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

const sidebarItems = [
  {
    heading: null,
    list: [
      {
        name: "Trang chính",
        path: PATH.HOME,
        icon: Home,
      },
      {
        name: "Dashboard",
        path: PATH.DASHBOARD,
        icon: LayoutDashboard,
      },
    ],
  },
  {
    heading: "Thêm mới",
    list: [
      {
        name: "Bài trắc nghiệm",
        path: PATH.DASHBOARD_CREATE_QUIZ,
        icon: FlaskConical,
      },
      {
        name: "Câu hỏi",
        path: PATH.DASHBOARD_CREATE_QUESTION,
        icon: HelpCircle,
      },
    ],
  },
  {
    heading: "Danh sách",
    list: [
      {
        name: "Bài trắc nghiệm",
        path: PATH.DASHBOARD_LIST_QUIZ,
        icon: FlaskConical,
      },
      {
        name: "Câu hỏi",
        path: PATH.DASHBOARD_LIST_QUESTION,
        icon: HelpCircle,
      },
    ],
  },
];

const DashboardSidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="fixed top-0 left-0 bottom-0 bg-background w-64 border-r border-border">
      <div className="h-16 flex items-center pl-6">
        <BrandLogo />
      </div>
      <ScrollArea className="h-[calc(100%-96px)]">
        <div className="space-y-10">
          {sidebarItems.map((item, index) => (
            <div key={index}>
              <h3 className="font-semibold ml-6 mb-4">{item.heading}</h3>
              <ul className="px-4 space-y-1">
                {item.list.map((item, index) => (
                  <li key={index}>
                    <Button
                      asChild
                      variant="ghost"
                      className={classNames({
                        "w-full justify-start": true,
                        "bg-accent": item.path === pathname,
                      })}
                    >
                      <Link href={item.path}>
                        <item.icon size={16} />
                        <span className="ml-3">{item.name}</span>
                      </Link>
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
};

export default DashboardSidebar;
