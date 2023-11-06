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
        <p>Card Content</p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="secondary">Bắt đầu</Button>
      </CardFooter>
    </Card>
  );
};

export default Quiz;
