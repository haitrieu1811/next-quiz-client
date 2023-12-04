import { Bookmark, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CalendarIcon } from "@radix-ui/react-icons";

import fallbackThumbnail from "@/assets/images/quiz-example.jpg";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { QuizLevel } from "@/constants/enum";
import PATH from "@/constants/path";
import { generateNameId } from "@/lib/utils";
import { QuizType } from "@/types/quiz.types";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

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
      <CardHeader className="p-2">
        <Link
          href={`${PATH.PLAY}/${generateNameId({
            name: quiz.name,
            id: quiz._id,
          })}`}
        >
          <Image
            src={quiz.thumbnail ? quiz.thumbnail : fallbackThumbnail}
            width="500"
            height="500"
            className="w-full h-40 object-cover rounded-md"
            alt={quiz.name}
          />
        </Link>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <CardTitle className="mb-2">
          <Link
            href={`${PATH.PLAY}/${generateNameId({
              name: quiz.name,
              id: quiz._id,
            })}`}
          >
            <span className="line-clamp-1">{quiz.name}</span>
          </Link>
        </CardTitle>
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button asChild variant="link" className="p-0">
              <Link href={PATH.HOME} className="text-sm text-muted-foreground">
                @rumbletran
              </Link>
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex justify-between space-x-4">
              <Avatar>
                <AvatarImage src="https://github.com/vercel.png" />
                <AvatarFallback>VC</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">@nextjs</h4>
                <p className="text-sm">
                  The React Framework – created and maintained by @vercel.
                </p>
                <div className="flex items-center pt-2">
                  <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                  <span className="text-xs text-muted-foreground">
                    Joined December 2021
                  </span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </CardContent>
      <CardFooter className="flex justify-between items-center px-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <Heart size={16} />
            </Button>
            <span className="text-sm text-foreground">28</span>
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <Bookmark size={16} />
            </Button>
            <span className="text-sm text-foreground">31</span>
          </div>
        </div>
        <Badge
          className={`text-white ${levels[quiz.level as QuizLevel].color}`}
        >
          {levels[quiz.level as QuizLevel].text}
        </Badge>
      </CardFooter>
    </Card>
  );
};

export default Quiz;
