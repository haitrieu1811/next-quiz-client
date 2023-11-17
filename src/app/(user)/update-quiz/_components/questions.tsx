"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import questionApis from "@/apis/question.apis";
import { columns } from "./columns";
import DataTable from "./data-table";

type QuestionsProps = {
  quiz_id: string;
};

const Questions = ({ quiz_id }: QuestionsProps) => {
  // Query: Lấy danh sách câu hỏi của bài quiz
  const getQuestionsQuery = useQuery({
    queryKey: ["questions", quiz_id],
    queryFn: () => questionApis.getQuestionsByQuizId({ quiz_id }),
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
