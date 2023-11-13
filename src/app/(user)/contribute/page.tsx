"use client";

import { Separator } from "@/components/ui/separator";
import CreateQuizForm from "./_components/create-quiz-form";

const CreateQuiz = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Tạo bài quiz mới</h3>
        <p className="text-sm text-muted-foreground">
          Tạo bài quiz mới và chia sẻ với mọi người.
        </p>
      </div>
      <Separator />
      <CreateQuizForm />
    </div>
  );
};

export default CreateQuiz;
