"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import questionApis from "@/apis/question.apis";
import { columns } from "./columns";
import DataTable from "./data-table";

type QuestionsProps = {
  quizId: string;
};

const Questions = ({ quizId }: QuestionsProps) => {
  // Query: Lấy danh sách câu hỏi của bài quiz
  const getQuestionsQuery = useQuery({
    queryKey: ["questions", quizId],
    queryFn: () => questionApis.getQuestionsByQuizId({ quiz_id: quizId }),
  });

  // Danh sách câu hỏi
  const questions = useMemo(
    () => getQuestionsQuery.data?.data.data.questions || [],
    [getQuestionsQuery.data?.data.data.questions]
  );

  return (
    <div>
      <DataTable columns={columns} data={questions} />
    </div>
  );
};

export default Questions;
