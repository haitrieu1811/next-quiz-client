import { promises as fs } from "fs";
import { Metadata } from "next";
import path from "path";
import { z } from "zod";

import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { taskSchema } from "./_data/schema";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
};

// Simulate a database read for tasks.
async function getTasks() {
  const data = await fs.readFile(
    path.join(
      process.cwd(),
      "src/app/(dashboard)/dashboard/list/quiz/_data/tasks.json"
    )
  );

  const tasks = JSON.parse(data.toString());

  return z.array(taskSchema).parse(tasks);
}

export default async function MyQuizzes() {
  const tasks = await getTasks();

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-10 md:flex">
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Bài trắc nghiệm của bạn
          </h2>
          <p className="text-muted-foreground">
            Quản lý bài trắc nghiệm của bạn.
          </p>
        </div>
        <Separator />
      </div>
      <DataTable data={tasks} columns={columns} />
    </div>
  );
}
