import { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import PATH from "@/constants/path";
import QuizzesTable from "./quizzes-table";

export const metadata: Metadata = {
  title: "Danh sách bài trắc nghiệm",
  description: "Quản lý bài trắc nghiệm của bạn",
};

const MyQuizzes = () => {
  return (
    <div className="p-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Danh sách bài trắc nghiệm
          </h1>
          <p className="text-muted-foreground">
            Danh sách bài trắc nghiệm của bạn
          </p>
        </div>
        <Button asChild>
          <Link href={PATH.DASHBOARD_CREATE_QUIZ}>Thêm bài trắc nghiệm</Link>
        </Button>
      </div>
      <Separator className="my-6" />
      <QuizzesTable />
    </div>
  );
};

export default MyQuizzes;
