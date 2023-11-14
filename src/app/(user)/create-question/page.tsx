import { Separator } from "@/components/ui/separator";
import CreateQuestionForm from "./_components/create-question-form";

const CreateQuestion = () => {
  return (
    <div className="p-10">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Tạo câu hỏi</h2>
        <p className="text-muted-foreground">
          Tạo câu hỏi cho bài trắc nghiệm của bạn.
        </p>
      </div>
      <Separator className="my-6" />
      <CreateQuestionForm />
    </div>
  );
};

export default CreateQuestion;
