import { Separator } from "@/components/ui/separator";
import CreateQuizForm from "@/app/(dashboard)/_components/create-quiz-form";

const CreateQuiz = () => {
  return (
    <div className="p-10">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">
          Tạo bài trắc nghiệm
        </h2>
        <p className="text-muted-foreground">
          Tạo bài trắc nghiệm để chia sẻ với cộng đồng.
        </p>
      </div>
      <Separator className="my-6" />
      <CreateQuizForm />
    </div>
  );
};

export default CreateQuiz;
