"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";

import { Dialog, DialogContent } from "@/components/ui/dialog";

const DialogLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  return (
    <Dialog defaultOpen onOpenChange={() => router.back()}>
      <DialogContent className="overflow-y-auto max-w-3xl max-h-[90vh]">
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default DialogLayout;
