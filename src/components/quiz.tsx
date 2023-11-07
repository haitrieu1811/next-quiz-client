import Image from "next/image";

import quizExample from "@/assets/images/quiz-example.jpg";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface QuizProps {
  className?: string;
}

const Quiz = ({ className }: QuizProps) => {
  return (
    <Card className={className}>
      <CardHeader>
        <Image src={quizExample} alt="" className="rounded-lg mb-4" />
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <Badge className="bg-red-500 dark:bg-red-700 text-white">Hard</Badge>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="secondary">Bắt đầu</Button>
      </CardFooter>
    </Card>
  );
};

export default Quiz;
