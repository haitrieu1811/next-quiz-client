"use client";

import Link from "next/link";
import { useContext } from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import PATH from "@/constants/path";
import useIsClient from "@/hooks/useIsClient";
import { AppContext } from "@/providers/app-provider";
import AccountDropdown from "./account-dropdown";
import { ModeToggle } from "./mode-toggle";
import { buttonVariants } from "./ui/button";

const createNewPages: { title: string; href: string; description: string }[] = [
  {
    title: "Thêm mới bài trắc nghiệm",
    href: PATH.CREATE_QUIZ,
    description:
      "Tạo bài trắc nghiệm với nhiều câu hỏi đóng góp cho cộng đồng.",
  },
  {
    title: "Thêm câu hỏi",
    href: PATH.CREATE_QUESTION,
    description: "Tạo câu hỏi cho bài trắc nghiệm với nhiều lựa chọn trả lời.",
  },
];

const quizPages: { title: string; href: string; description: string }[] = [
  {
    title: "Bóng đá",
    href: PATH.CREATE_QUIZ,
    description:
      "Tổng hợp các câu hỏi về bóng đá, giúp bạn kiểm tra kiến thức về bóng đá của mình.",
  },
  {
    title: "Địa lý",
    href: PATH.CREATE_QUESTION,
    description: "Tổng hợp các câu hỏi về địa lý của Việt Nam và thế giới.",
  },
  {
    title: "Lịch sử",
    href: PATH.CREATE_QUESTION,
    description: "Tổng hợp các câu hỏi về lịch sử của Việt Nam và thế giới.",
  },
  {
    title: "Lập trình",
    href: PATH.CREATE_QUESTION,
    description: "Tổng hợp các câu hỏi về lập trình.",
  },
];

const Header = () => {
  const { isAuthenticated } = useContext(AppContext);
  const isClient = useIsClient();

  return (
    <header className="sticky top-0 left-0 right-0 z-10 bg-background border-b border-b-border">
      <nav className="px-6 h-14 container flex justify-between items-center">
        {/* Logo */}
        <Link href={PATH.HOME} className="flex items-center space-x-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            className="h-6 w-6"
          >
            <rect width={256} height={256} fill="none" />
            <line
              x1={208}
              y1={128}
              x2={128}
              y2={208}
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={16}
            />
            <line
              x1={192}
              y1={40}
              x2={40}
              y2={192}
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={16}
            />
          </svg>
          <span className="font-bold tracking-tight text-lg flex items-center lowercase">
            Nextquiz
          </span>
        </Link>
        {/* Navigation menu */}
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href={PATH.HOME} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Trang chủ
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Thêm mới</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {createNewPages.map((page) => (
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href={page.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">
                            {page.title}
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {page.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Trắc nghiệm</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {quizPages.map((page) => (
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href={page.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">
                            {page.title}
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {page.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href={PATH.RANKING} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Xếp hạng
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        {/* Actions */}
        <div className="flex items-center">
          <div className="mr-5">
            <ModeToggle />
          </div>
          {isAuthenticated && isClient && <AccountDropdown />}
          {!isAuthenticated && isClient && (
            <Link
              href={PATH.LOGIN}
              className={buttonVariants({ variant: "secondary" })}
            >
              Đăng nhập
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
