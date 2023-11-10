"use client";

import { redirect } from "next/navigation";
import { useContext, useLayoutEffect } from "react";

import PATH from "@/constants/path";
import { AppContext } from "@/providers/app-provider";

export default function protectedRoute(Component: any) {
  return function ProtectedRoute(props: any) {
    const { isAuthenticated } = useContext(AppContext);

    useLayoutEffect(() => {
      if (!isAuthenticated) return redirect(PATH.LOGIN);
    }, [isAuthenticated]);

    if (!isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };
}
