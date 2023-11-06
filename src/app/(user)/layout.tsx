import { Fragment, ReactNode } from "react";

import Footer from "@/components/footer";
import Header from "@/components/header";

const UserLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Fragment>
      <Header />
      <main className="container">{children}</main>
      <Footer />
    </Fragment>
  );
};

export default UserLayout;
