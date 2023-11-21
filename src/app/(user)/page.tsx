"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import quizApis from "@/apis/quiz.apis";
import Quiz from "@/components/quiz";
import QuizSkeleton from "@/components/quiz-skeleton";

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
    <div className="grid grid-cols-12 gap-6 py-6">
      {/* Danh sách bài trắc nghiệm */}
      {!getQuizzesQuery.isPending &&
        quizzes.map((quiz) => (
          <Quiz key={quiz._id} quiz={quiz} className="col-span-3" />
        ))}

      {/* Loading bài trắc nghiệm */}
      {getQuizzesQuery.isPending &&
        Array(12)
          .fill(0)
          .map((_, index) => (
            <QuizSkeleton key={index} className="col-span-3 h-60 rounded-lg" />
          ))}
    </div>
  );
};

export default Home;
