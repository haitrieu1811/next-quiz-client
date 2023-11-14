"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import quizApis from "@/apis/quiz.apis";
import Quiz from "@/components/quiz";

const Home = () => {
  // Query: Danh sách các bài quiz
  const getQuizzesQuery = useQuery({
    queryKey: ["quizzes"],
    queryFn: () => quizApis.getQuizzes(),
  });

  // Danh sách các bài quiz
  const quizzes = useMemo(
    () => getQuizzesQuery.data?.data.data.quizzes || [],
    [getQuizzesQuery.data?.data.data.quizzes]
  );

  return (
    <div className="grid grid-cols-12 gap-5 py-6">
      {quizzes.map((quiz) => (
        <Quiz key={quiz._id} quiz={quiz} className="col-span-3" />
      ))}
    </div>
  );
};

export default Home;
