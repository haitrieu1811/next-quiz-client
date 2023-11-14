import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CalendarIcon, Loader2, MoreVertical } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { Fragment, useContext, useState } from "react";

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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { QuizLevel } from "@/constants/enum";
import PATH from "@/constants/path";
import { AppContext } from "@/providers/app-provider";
import { QuizType } from "@/types/quiz.types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

moment.locale("vi");

interface QuizProps {
  className?: string;
  quiz: QuizType;
}

const levels = {
  [QuizLevel.Easy]: {
    color: "bg-green-500 dark:bg-green-700",
    text: "Dễ",
  },
  [QuizLevel.Medium]: {
    color: "bg-yellow-500 dark:bg-yellow-700",
    text: "Trung bình",
  },
  [QuizLevel.Hard]: {
    color: "bg-red-500 dark:bg-red-700",
    text: "Khó",
  },
  [QuizLevel.VeryHard]: {
    color: "bg-red-500 dark:bg-red-700",
    text: "Rất khó",
  },
};

const Quiz = ({ className, quiz }: QuizProps) => {
  const queryClient = useQueryClient();
  const { user } = useContext(AppContext);
  const { toast } = useToast();
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
        queryKey: ["get-quizzes"],
      });
    },
  });

  // Handle: Xóa quiz
  const handleDelete = () => {
    deleteQuizMutation.mutate(quiz._id);
  };

  return (
    <Fragment>
      <Card className={className}>
        <CardHeader className="p-4">
          <Link href={PATH.HOME}>
            <div
              className="h-40 bg-muted bg-center bg-cover rounded-lg"
              style={{
                backgroundImage: `${
                  quiz.thumbnail ? `url(${quiz.thumbnail})` : undefined
                }`,
              }}
            />
          </Link>
        </CardHeader>
        <CardContent className="px-4">
          <CardTitle className="mb-2">
            <Link href={PATH.HOME}>
              <span className="line-clamp-1">{quiz.name}</span>
            </Link>
          </CardTitle>
          <CardDescription className="min-h-[20px] mb-2 line-clamp-1">
            {quiz.description}
          </CardDescription>
          <Badge
            className={`text-white ${levels[quiz.level as QuizLevel].color}`}
          >
            {levels[quiz.level as QuizLevel].text}
          </Badge>
        </CardContent>
        <CardFooter className="flex justify-between items-center px-4">
          <div>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Avatar className="w-7 h-7 select-none cursor-pointer">
                  <AvatarImage src={quiz.author.avatar} />
                  <AvatarFallback className="text-xs">
                    {quiz.author.username[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="flex space-x-4">
                  <Link href={`${PATH.PROFILE}/${quiz.author.username}`}>
                    <Avatar>
                      <AvatarImage src={quiz.author.avatar} />
                      <AvatarFallback>
                        {quiz.author.username[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                  <div className="space-y-1 flex-1">
                    <Link href={`${PATH.PROFILE}/${quiz.author.username}`}>
                      <h4 className="text-sm font-semibold hover:underline">
                        @{quiz.author.username}
                      </h4>
                    </Link>
                    <p className="text-sm">{quiz.author.bio}</p>
                    <div className="flex items-center pt-2">
                      <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                      <span className="text-xs text-muted-foreground">
                        tham gia từ {moment(quiz.author.created_at).fromNow()}
                      </span>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="secondary" className="w-8 h-8">
                <MoreVertical size={14} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Tùy chọn</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Bắt đầu</DropdownMenuItem>
              <DropdownMenuItem>Lưu</DropdownMenuItem>
              <DropdownMenuItem>Thích</DropdownMenuItem>
              <DropdownMenuItem>Xem trước</DropdownMenuItem>
              {user?._id === quiz.author._id && (
                <Fragment>
                  <DropdownMenuItem asChild>
                    <Link
                      href={`${PATH.UPDATE_QUIZ}/${quiz._id}`}
                      scroll={false}
                    >
                      Sửa
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setAlertDialogOpen(true)}>
                    Xóa
                  </DropdownMenuItem>
                </Fragment>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </CardFooter>
      </Card>

      <AlertDialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn có chắc muốn xóa quiz này?</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn sẽ không thể khôi phục lại quiz này sau khi xóa.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteQuizMutation.isPending}>
              Hủy
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleteQuizMutation.isPending}
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
};

export default Quiz;
