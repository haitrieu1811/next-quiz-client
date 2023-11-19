import PropTypes from "prop-types";

import CreateQuizForm from "@/app/(user)/create-quiz/_components/create-quiz-form";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Questions from "../_components/questions";
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
    <div className="p-10">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">
          Cập nhật bài trắc nghiệm
        </h2>
        <p className="text-muted-foreground">
          Cập nhật bài trắc nghiệm để chia sẻ với cộng đồng.
        </p>
      </div>
      <Separator className="my-6" />
      <Tabs defaultValue="info">
        <TabsList>
          <TabsTrigger value="info">Thông tin bài trắc nghiệm</TabsTrigger>
          <TabsTrigger value="questions">Danh sách câu hỏi</TabsTrigger>
        </TabsList>
        <TabsContent value="info" className="py-10">
          <CreateQuizForm quizId={quizId} />
        </TabsContent>
        <TabsContent value="questions" className="py-10">
          <Questions quizId={quizId} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

UpdateQuiz.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default UpdateQuiz;
