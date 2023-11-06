"use client";

import Link from "next/link";
import { forwardRef } from "react";

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
import { cn } from "@/lib/utils";
import AccountDropdown from "./account-dropdown";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Địa lý",
    href: "/docs/primitives/alert-dialog",
    description: "Kiểm tra kiến thức về địa lý trong nươc và quốc tế của bạn.",
  },
  {
    title: "Bóng đá",
    href: "/docs/primitives/hover-card",
    description:
      "Kiểm tra kiến thức bóng đá Việt Nam và bóng đá quốc tế thông qua từng câu hỏi ở từng cấp độ từ dễ cho đến khó.",
  },
];

const ListItem = forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-semibold leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const Header = () => {
  return (
    <header className="sticky top-0 left-0 right-0 bg-background border-b">
      <nav className="container py-2 flex justify-between items-center">
        <Link href={PATH.HOME}>LOGO</Link>
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
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {components.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
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
        <div>
          <AccountDropdown />
        </div>
      </nav>
    </header>
  );
};

export default Header;
