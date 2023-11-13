"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";

import { Dialog, DialogContent } from "@/components/ui/dialog";

const OverlayLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  return (
    <Dialog defaultOpen modal onOpenChange={() => router.back()}>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default OverlayLayout;
