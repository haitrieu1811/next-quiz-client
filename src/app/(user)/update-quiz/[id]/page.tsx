import PropTypes from "prop-types";

import CreateQuizForm from "@/app/(user)/create-quiz/_components/create-quiz-form";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Questions from "../_components/questions";

type UpdateQuizProps = {
  params: {
    id: string;
  };
};

const UpdateQuiz = ({ params }: UpdateQuizProps) => {
  const { id: quiz_id } = params;

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
          <CreateQuizForm quiz_id={quiz_id} />
        </TabsContent>
        <TabsContent value="questions" className="py-10">
          <Questions quiz_id={quiz_id} />
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
