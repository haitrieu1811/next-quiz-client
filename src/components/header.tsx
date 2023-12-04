"use client";

import classNames from "classnames";
import Link from "next/link";
import { useContext } from "react";

import PATH from "@/constants/path";
import useIsClient from "@/hooks/useIsClient";
import { AppContext } from "@/providers/app-provider";
import { usePathname } from "next/navigation";
import AccountDropdown from "./account-dropdown";
import BrandLogo from "./brand-logo";
import { ModeToggle } from "./mode-toggle";
import { buttonVariants } from "./ui/button";

const pages = [
  {
    href: PATH.HOME,
    name: "Trang chủ",
  },
  {
    href: PATH.QUIZZES,
    name: "Bài trắc nghiệm",
  },
  {
    href: PATH.RANKING,
    name: "Bảng xếp hạng",
  },
];

const Header = () => {
  const { isAuthenticated } = useContext(AppContext);
  const isClient = useIsClient();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 left-0 right-0 z-10 bg-background border-b">
      <nav className="px-6 h-14 container flex justify-between items-center">
        {/* Logo */}
        <BrandLogo />
        {/* Menu */}
        <div className="flex space-x-8">
          {pages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className={classNames({
                "transition-colors text-foreground/60 text-sm font-medium":
                  true,
                "text-foreground/80": page.href === pathname,
                "hover:text-foreground/80": page.href !== pathname,
              })}
            >
              {page.name}
            </Link>
          ))}
        </div>
        <div className="flex items-center space-x-5">
          <ModeToggle />
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
