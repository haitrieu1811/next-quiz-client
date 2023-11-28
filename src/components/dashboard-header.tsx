"use client";

import { Search } from "@/app/(dashboard)/_components/search";
import useIsClient from "@/hooks/useIsClient";
import AccountDropdown from "./account-dropdown";
import { ModeToggle } from "./mode-toggle";

const DashboardHeader = () => {
  const isClient = useIsClient();
  return (
    <div className="border-b fixed top-0 left-64 right-0 bg-background z-10">
      <div className="flex h-16 items-center px-4">
        <div className="ml-auto flex items-center space-x-5">
          <Search />
          {isClient && <ModeToggle />}
          {isClient && <AccountDropdown />}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
