import { Fragment } from "react";

import CreateQuestionForm from "@/app/(dashboard)/_components/create-question-form";
import { Separator } from "@/components/ui/separator";

type UpdateQuestionProps = {
  params: {
    id: string;
  };
};

const UpdateQuestion = ({ params }: UpdateQuestionProps) => {
  const { id: questionId } = params;
  return (
    <Fragment>
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Cập nhật câu hỏi</h2>
        <p className="text-muted-foreground">
          Cập nhật câu hỏi của bạn để nhận được câu trả lời chính xác nhất.
        </p>
      </div>
      <Separator className="my-6" />
      <CreateQuestionForm questionId={questionId} />
    </Fragment>
  );
};

export default UpdateQuestion;
