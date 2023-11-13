import { Fullscreen, Play } from "lucide-react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { QuizLevel } from "@/constants/enum";
import PATH from "@/constants/path";
import { QuizType } from "@/types/quiz.types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

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
  return (
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
        <CardDescription className="mb-2 line-clamp-1">
          {quiz.description}
        </CardDescription>
        <Badge
          className={`text-white ${levels[quiz.level as QuizLevel].color}`}
        >
          {levels[quiz.level as QuizLevel].text}
        </Badge>
      </CardContent>
      <CardFooter className="flex justify-between items-center px-4">
        <Link
          href={`${PATH.PROFILE}/${quiz.author.username}`}
          className="flex items-center"
        >
          <Avatar className="w-6 h-6 select-none">
            <AvatarImage src={quiz.author.avatar} />
            <AvatarFallback className="text-xs">
              {quiz.author.username[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-zinc-500 text-xs ml-2">
            {quiz.author.username}
          </span>
        </Link>
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Fullscreen strokeWidth={1.5} width={15} />
              </TooltipTrigger>
              <TooltipContent>Xem trước</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <Play strokeWidth={1.5} width={15} />
              </TooltipTrigger>
              <TooltipContent>Bắt đầu</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Quiz;
