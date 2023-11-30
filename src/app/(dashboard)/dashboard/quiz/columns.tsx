"use client";

import { DotsHorizontalIcon, TimerIcon } from "@radix-ui/react-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Loader2, Lock, Users } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { Fragment, useState } from "react";

import quizApis from "@/apis/quiz.apis";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import { useToast } from "@/components/ui/use-toast";
import { QuizAudience, QuizLevel } from "@/constants/enum";
import PATH from "@/constants/path";
import { convertMomentToVietnamese, generateNameId } from "@/lib/utils";
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
    cell: ({ row }) => {
      const { _id, name } = row.original;
      const { toast } = useToast();
      const queryClient = useQueryClient();
      const [alertDialogOpen, setAlertDialogOpen] = useState<boolean>(false);

      // Mutation: Xóa quiz theo id
      const deleteQuizMutation = useMutation({
        mutationFn: quizApis.deleteQuiz,
        onSuccess: () => {
          toast({
            title: "Xóa quiz thành công",
            description: "Quiz đã được xóa khỏi hệ thống",
          });
          queryClient.invalidateQueries({
            queryKey: ["get-quizzes-dashboard"],
          });
        },
      });

      // Handle: Xóa quiz
      const handleDelete = () => {
        deleteQuizMutation.mutate(_id);
      };

      return (
        <Fragment>
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
              <DropdownMenuItem asChild>
                <Link
                  href={`${PATH.DASHBOARD_UPDATE_QUIZ}/${generateNameId({
                    name,
                    id: _id,
                  })}`}
                >
                  Cập nhật
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-500 dark:text-red-600"
                onClick={() => setAlertDialogOpen(true)}
              >
                Xóa
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Bạn có chắc muốn xóa bài trắc nghiệm này?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Bạn sẽ không thể khôi phục lại bài trắc nghiệm này sau khi
                  xóa.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={deleteQuizMutation.isPending}>
                  Hủy
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  disabled={deleteQuizMutation.isPending}
                  className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                >
                  {deleteQuizMutation.isPending && (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  Xóa
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Fragment>
      );
    },
  },
];
