import { Fragment, ReactNode } from "react";

import Header from "@/components/header";

const UserLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Fragment>
      <Header />
      <main className="container">{children}</main>
    </Fragment>
  );
};

export default UserLayout;
