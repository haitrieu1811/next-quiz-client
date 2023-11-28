"use client";

import { DotsHorizontalIcon, TimerIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Lock, Users } from "lucide-react";
import moment from "moment";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { QuizAudience, QuizLevel } from "@/constants/enum";
import { convertMomentToVietnamese } from "@/lib/utils";
import { QuizType } from "@/types/quiz.types";

const badgeLevel = (level: QuizLevel) => {
  switch (level) {
    case QuizLevel.Easy:
      return <Badge className="bg-green-500">Dễ</Badge>;
    case QuizLevel.Medium:
      return <Badge className="bg-yellow-500">Trung bình</Badge>;
    case QuizLevel.Hard:
      return <Badge className="bg-red-500">Khó</Badge>;
    case QuizLevel.VeryHard:
      return <Badge className="bg-red-500">Rất khó</Badge>;
    default:
      return;
  }
};

const badgeAudience = (audience: QuizAudience) => {
  switch (audience) {
    case QuizAudience.Everyone:
      return (
        <div className="flex items-center">
          <Users size={16} className="mr-2 text-muted-foreground" />
          Mọi người
        </div>
      );
    case QuizAudience.OnlyMe:
      return (
        <div className="flex items-center">
          <Lock size={16} className="mr-2 text-muted-foreground" />
          Chỉ mình tôi
        </div>
      );
    default:
      return;
  }
};

export const columns: ColumnDef<QuizType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tên bài trắc nghiệm
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center">
        <Badge variant="outline" className="mr-4">
          {row.original.topic.name}
        </Badge>
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "level",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Độ khó
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => badgeLevel(row.getValue("level")),
  },
  {
    accessorKey: "audience",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Đối tượng
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => badgeAudience(row.getValue("audience")),
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tạo lúc
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <TimerIcon className="text-muted-foreground" />{" "}
        <span>
          {convertMomentToVietnamese(
            moment(row.getValue("created_at")).fromNow()
          )}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cập nhật lúc
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <TimerIcon className="text-muted-foreground" />{" "}
        <span>
          {convertMomentToVietnamese(
            moment(row.getValue("updated_at")).fromNow()
          )}
        </span>
      </div>
    ),
  },
  {
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem>Cập nhật</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-500 dark:text-red-600">
            Xóa
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
