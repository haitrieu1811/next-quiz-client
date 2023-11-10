"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
import AccountDropdown from "./account-dropdown";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

const quizzes: { title: string; href: string; description: string }[] = [
  {
    title: "Địa lý",
    href: PATH.QUIZZES,
    description: "Kiểm tra kiến thức về địa lý trong nươc và quốc tế của bạn.",
  },
  {
    title: "Bóng đá",
    href: "/docs/primitives/hover-card",
    description:
      "Kiểm tra kiến thức bóng đá Việt Nam và bóng đá quốc tế thông qua từng câu hỏi ở từng cấp độ từ dễ cho đến khó.",
  },
];

const isAuthenticated = false;

const Header = () => {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 left-0 right-0 z-[999] bg-background border-b border-b-border">
      <nav className="container py-2 flex justify-between items-center">
        <Link
          href={PATH.HOME}
          className="font-semibold text-lg flex items-center capitalize"
        >
          Next quiz
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href={PATH.HOME} legacyBehavior passHref>
                <NavigationMenuLink
                  className={classNames(navigationMenuTriggerStyle(), {
                    "text-zinc-500 dark:text-zinc-400": pathname !== PATH.HOME,
                  })}
                >
                  Trang chủ
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={classNames({
                  "text-zinc-500 dark:text-zinc-400": pathname !== PATH.QUIZZES,
                })}
              >
                Bài trắc nghiệm
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-3 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {quizzes.map((quiz) => (
                    <li key={quiz.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={quiz.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-semibold">
                            {quiz.title}
                          </div>
                          <p className="line-clamp-2 text-sm text-muted-foreground">
                            {quiz.description}
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
                <NavigationMenuLink
                  className={classNames(navigationMenuTriggerStyle(), {
                    "text-zinc-500 dark:text-zinc-400":
                      pathname !== PATH.RANKING,
                  })}
                >
                  Bảng xếp hạng
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href={PATH.CONTRIBUTE} legacyBehavior passHref>
                <NavigationMenuLink
                  className={classNames(navigationMenuTriggerStyle(), {
                    "text-zinc-500 dark:text-zinc-400":
                      pathname !== PATH.CONTRIBUTE,
                  })}
                >
                  Đóng góp
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center">
          <div className="mr-5">
            <ModeToggle />
          </div>
          {isAuthenticated && <AccountDropdown />}
          {!isAuthenticated && (
            <Button variant="secondary" className="rounded-full h-8" asChild>
              <Link href={PATH.LOGIN}>Đăng nhập</Link>
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
