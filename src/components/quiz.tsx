import { Fullscreen, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import quizExample from "@/assets/images/quiz-example.jpg";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PATH from "@/constants/path";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface QuizProps {
  className?: string;
}

const Quiz = ({ className }: QuizProps) => {
  return (
    <Card className={className}>
      <CardHeader className="p-4">
        <Link href={PATH.HOME}>
          <Image src={quizExample} alt="" className="rounded-xl" />
        </Link>
      </CardHeader>
      <CardContent className="px-4">
        <CardTitle className="mb-2">
          <Link href={PATH.HOME}>
            <span className="line-clamp-1">Quiz Title</span>
          </Link>
        </CardTitle>
        <CardDescription className="mb-2 line-clamp-1">
          Card Description
        </CardDescription>
        <Badge className="bg-red-500 dark:bg-red-700 text-white">Hard</Badge>
      </CardContent>
      <CardFooter className="flex justify-between items-center px-4">
        <Link href={PATH.HOME} className="flex items-center">
          <Avatar className="w-6 h-6 select-none">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="text-xs">CN</AvatarFallback>
          </Avatar>
          <span className="text-zinc-500 text-xs ml-2">haitrieu1811</span>
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
