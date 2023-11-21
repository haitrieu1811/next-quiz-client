import { Fragment, ReactNode } from "react";

import DashboardSidebar from "@/components/dashboard-sidebar";
import DashboardHeader from "@/components/dashboard-header";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Fragment>
      <DashboardSidebar />
      <DashboardHeader />
      <main className="ml-64 mt-16">{children}</main>
    </Fragment>
  );
};

export default Layout;
