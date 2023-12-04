"use client";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { Fragment, useMemo } from "react";

import quizApis from "@/apis/quiz.apis";
import Quiz from "@/components/quiz";
import QuizSkeleton from "@/components/quiz-skeleton";
import { Button } from "@/components/ui/button";

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
    <Fragment>
      <div className="py-12 space-y-4">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
          Build your component library.
        </h1>
        <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
          Beautifully designed components that you can copy and paste into your
          apps. Accessible. Customizable. Open Source.
        </p>
        <div className="flex space-x-2">
          <Button>Bắt đầu</Button>
          <Button variant="outline">
            <GitHubLogoIcon className="w-4 h-4 mr-2" />
            Github
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 py-6">
        {/* Danh sách bài trắc nghiệm */}
        {!getQuizzesQuery.isPending &&
          quizzes.map((quiz) => (
            <Quiz
              key={quiz._id}
              quiz={quiz}
              className="col-span-3 shadow-none rounded-md"
            />
          ))}

        {/* Loading */}
        {getQuizzesQuery.isPending &&
          Array(12)
            .fill(0)
            .map((_, index) => (
              <QuizSkeleton
                key={index}
                className="col-span-3 h-60 rounded-lg"
              />
            ))}
      </div>
    </Fragment>
  );
};

export default Home;
