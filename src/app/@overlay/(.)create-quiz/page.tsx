import CreateQuizForm from "@/app/(user)/create-quiz/_components/create-quiz-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const CreateQuiz = () => {
  return (
    <div>
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">
          Tạo bài trắc nghiệm
        </h2>
        <p className="text-muted-foreground">
          Tạo bài trắc nghiệm để chia sẻ với cộng đồng.
        </p>
      </div>
      <Separator className="my-6" />
      <ScrollArea className="h-[500px]">
        <CreateQuizForm />
      </ScrollArea>
    </div>
  );
};

export default CreateQuiz;
