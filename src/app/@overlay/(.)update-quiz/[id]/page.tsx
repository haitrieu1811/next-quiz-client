import PropTypes from "prop-types";
import { Fragment } from "react";

import CreateQuizForm from "@/app/(user)/create-quiz/_components/create-quiz-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

type UpdateQuizProps = {
  params: {
    id: string;
  };
};

const UpdateQuiz = ({ params }: UpdateQuizProps) => {
  const { id: quiz_id } = params;

  return (
    <Fragment>
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">
          Cập nhật bài trắc nghiệm
        </h2>
        <p className="text-muted-foreground">
          Cập nhật bài trắc nghiệm để chia sẻ với cộng đồng.
        </p>
      </div>
      <Separator className="my-6" />
      <ScrollArea className="h-[500px]">
        <CreateQuizForm quiz_id={quiz_id} />
      </ScrollArea>
    </Fragment>
  );
};

UpdateQuiz.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default UpdateQuiz;
