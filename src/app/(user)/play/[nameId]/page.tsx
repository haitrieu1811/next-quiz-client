"use client";

import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import { CheckCheck, HelpCircle, MoveLeft, MoveRight } from "lucide-react";
import Image from "next/image";
import { Fragment, useEffect, useMemo, useState } from "react";

import questionApis from "@/apis/question.apis";
import quizApis from "@/apis/quiz.apis";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { getIdFromNameId } from "@/lib/utils";
import {
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
  TooltipContent,
} from "@/components/ui/tooltip";

type PlayProps = {
  params: {
    nameId: string;
  };
};

const Play = ({ params }: PlayProps) => {
  const { nameId } = params;
  const quizId = getIdFromNameId(nameId);
  const [progressTime, setProgressTime] = useState<number>(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  // Query: Thông tin bài trắc nghiệm
  const getQuizQuery = useQuery({
    queryKey: ["get-quiz", quizId],
    queryFn: () => quizApis.getQuiz(quizId),
  });

  // Query: Danh sách câu hỏi
  const getQuestionsQuery = useQuery({
    queryKey: ["get-questions", quizId],
    queryFn: () => questionApis.getQuestionsByQuizId({ quiz_id: quizId }),
  });

  // Thông tin bài trắc nghiệm
  const quiz = useMemo(
    () => getQuizQuery.data?.data.data.quiz,
    [getQuizQuery.data?.data.data.quiz]
  );

  // Danh sách câu hỏi
  const questions = useMemo(
    () => getQuestionsQuery.data?.data.data.questions || [],
    [getQuestionsQuery.data?.data.data.questions]
  );

  // Số lượng câu hỏi
  const questionsCount = useMemo(
    () => getQuestionsQuery.data?.data.data.pagination.total_rows || 0,
    [getQuestionsQuery.data?.data.data.pagination.total_rows]
  );

  // Câu hỏi hiện tại
  const currentQuestion = useMemo(
    () => questions[currentQuestionIndex],
    [questions, currentQuestionIndex]
  );

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      if (progressTime === 100) return;
      setProgressTime((prev) => prev + 1 / 3);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // Handle: Chuyển câu hỏi
  const handleChangeQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  // Handle: Chuyển câu hỏi tiếp theo
  const handleNextQuestion = () => {
    if (currentQuestionIndex === questionsCount - 1) return;
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  // Handle: Chuyển câu hỏi trước đó
  const handlePrevQuestion = () => {
    if (currentQuestionIndex === 0) return;
    setCurrentQuestionIndex((prev) => prev - 1);
  };

  return (
    <TooltipProvider>
      {quiz && (
        <div className="py-10">
          <Progress value={progressTime} />
          <h1 className="text-center font-semibold text-3xl mt-6">
            {quiz.name}
          </h1>
          {quiz.description && (
            <div className="mt-6 text-center text-zinc-800 dark:text-zinc-400">
              {quiz.description}
            </div>
          )}
          <Separator className="my-10" />
          <div className="grid grid-cols-12 gap-12">
            <div className="col-span-8">
              <div>
                <div className="grid grid-cols-12 gap-3 mb-5">
                  {currentQuestion?.images?.length > 0 &&
                    currentQuestion?.images?.map((image) => (
                      <Image
                        key={image._id}
                        width={150}
                        height={150}
                        src={image.url}
                        alt={image.url}
                        className="col-span-4 w-full rounded-lg"
                      />
                    ))}
                </div>
                <h3 className="font-medium">
                  Câu {currentQuestionIndex + 1}: {currentQuestion?.name}
                </h3>
              </div>
              <form action="">
                <div className="space-y-4 mt-6">
                  {currentQuestion &&
                    currentQuestion.answers.map((answer, index) => (
                      <div key={index}>
                        <input
                          type="radio"
                          name="answer"
                          id={`answer-${index}`}
                          className="peer appearance-none hidden"
                        />
                        <label
                          htmlFor={`answer-${index}`}
                          className="flex items-center border rounded-lg p-4 cursor-pointer text-muted-foreground peer-checked:border-muted-foreground"
                        >
                          {answer.name}{" "}
                          {answer.description && (
                            <Tooltip>
                              <TooltipTrigger className="ml-3">
                                <HelpCircle size={16} />
                              </TooltipTrigger>
                              <TooltipContent>
                                {answer.description}
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </label>
                      </div>
                    ))}
                </div>
                <div className="flex justify-center space-x-4 mt-10">
                  <div
                    className={classNames({
                      "cursor-not-allowed": currentQuestionIndex === 0,
                    })}
                  >
                    <Button
                      type="button"
                      variant="secondary"
                      disabled={currentQuestionIndex === 0}
                      onClick={handlePrevQuestion}
                    >
                      <MoveLeft size={16} />
                      <span className="text-sm ml-3">Câu trước</span>
                    </Button>
                  </div>
                  <div
                    className={classNames({
                      "cursor-not-allowed":
                        currentQuestionIndex === questionsCount - 1,
                    })}
                  >
                    <Button
                      type="button"
                      variant="secondary"
                      disabled={currentQuestionIndex === questionsCount - 1}
                      onClick={handleNextQuestion}
                    >
                      <span className="text-sm mr-3">Câu sau</span>
                      <MoveRight size={16} />
                    </Button>
                  </div>
                  <Button>
                    <span className="text-sm mr-3">Nộp bài</span>
                    <CheckCheck size={16} />
                  </Button>
                </div>
              </form>
            </div>
            <div className="col-span-4">
              <div className="grid grid-cols-12 gap-4">
                {Array(questionsCount)
                  .fill(0)
                  .map((_, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      onClick={() => handleChangeQuestion(index)}
                      className={classNames({
                        "col-span-2": true,
                        "bg-foreground text-muted":
                          index === currentQuestionIndex,
                      })}
                    >
                      <span className="text-sm">{index + 1}</span>
                    </Button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </TooltipProvider>
  );
};

export default Play;
