"use client";

import Link from "next/link";

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

const components: { title: string; href: string; description: string }[] = [
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

const Header = () => {
  return (
    <header className="sticky top-0 left-0 right-0 bg-background border-b">
      <nav className="container py-2 flex justify-between items-center">
        <Link href={PATH.HOME} className="font-bold text-lg flex items-center">
          NEXT QUIZ
        </Link>
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
              <NavigationMenuTrigger>Bài trắc nghiệm</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-2 p-2 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {components.map((component) => (
                    <li key={component.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={component.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-semibold">
                            {component.title}
                          </div>
                          <p className="line-clamp-2 text-sm text-muted-foreground">
                            {component.description}
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
                  Bảng xếp hạng
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center">
          <ModeToggle />
          <AccountDropdown />
        </div>
      </nav>
    </header>
  );
};

export default Header;
