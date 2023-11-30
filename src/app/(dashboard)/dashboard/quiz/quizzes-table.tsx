"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import quizApis from "@/apis/quiz.apis";
import DataTable from "@/components/data-table";
import { columns } from "./columns";

const QuizzesTable = () => {
  // Query: Lấy danh sách bài trắc nghiệm
  const getQuizzesQuery = useQuery({
    queryKey: ["get-quizzes-dashboard"],
    queryFn: () => quizApis.getUserQuizzes(),
  });

  // Danh sách bài trắc nghiệm
  const quizzes = useMemo(
    () => getQuizzesQuery.data?.data.data.quizzes ?? [],
    [getQuizzesQuery.data?.data.data.quizzes]
  );

  return <DataTable columns={columns} data={quizzes} />;
};

export default QuizzesTable;
