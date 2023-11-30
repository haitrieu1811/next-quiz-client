import PropTypes from "prop-types";
import { Fragment } from "react";

import CreateQuizForm from "@/app/(dashboard)/_components/create-quiz-form";
import { Separator } from "@/components/ui/separator";
import { getIdFromNameId } from "@/lib/utils";

type UpdateQuizProps = {
  params: {
    nameId: string;
  };
};

const UpdateQuiz = ({ params }: UpdateQuizProps) => {
  const { nameId } = params;
  const quizId = getIdFromNameId(nameId);
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
      <CreateQuizForm quizId={quizId} />
    </Fragment>
  );
};

UpdateQuiz.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default UpdateQuiz;
