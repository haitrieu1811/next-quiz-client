"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import isEmpty from "lodash/isEmpty";
import { CheckCircle, Loader2, Trash } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useContext, useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import imageApis from "@/apis/image.apis";
import questionApis from "@/apis/question.apis";
import quizApis from "@/apis/quiz.apis";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { QUIZZES_MESSAGES } from "@/constants/messages";
import { cn, isEntityError } from "@/lib/utils";
import { AppContext } from "@/providers/app-provider";
import {
  CreateQuestionSchema,
  createQuestionSchema,
} from "@/rules/question.rules";
import { AnswerType } from "@/types/question.types";
import { ErrorResponse } from "@/types/utils.types";

const CreateQuestionForm = () => {
  // Form
  const form = useForm<CreateQuestionSchema>({
    resolver: zodResolver(createQuestionSchema),
    defaultValues: {
      name: "",
      description: "",
      quiz_id: "",
      answers: [
        {
          name: "",
          description: "",
          is_correct: true,
        },
      ],
      images: [],
    },
  });

  const { user } = useContext(AppContext);
  const { toast } = useToast();
  const [currentAnswerIndex, setCurrentAnswerIndex] = useState<number>(0);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  // Query: Lấy danh sách bài trắc nghiệm của người dùng hiện tại để chọn
  const getQuizzesQuery = useQuery({
    queryKey: ["quizzes-of-logged-user", user?._id],
    queryFn: () => quizApis.getQuizzes({ user_id: user?._id as string }),
    enabled: !!user?._id,
  });

  // Danh sách bài trắc nghiệm
  const quizzes = useMemo(
    () => getQuizzesQuery.data?.data.data.quizzes || [],
    [getQuizzesQuery.data?.data.data.quizzes]
  );

  // Danh sách bài trắc nghiệm dùng để render options
  const quizzesOptions = useMemo(
    () =>
      quizzes.map((quiz) => ({
        label: quiz.name,
        value: quiz._id,
      })),
    [quizzes]
  );

  // Mutation: Tạo câu hỏi
  const createQuestionMutation = useMutation({
    mutationFn: questionApis.createQuestion,
    onSuccess: () => {
      form.reset();
      setCurrentAnswerIndex(0);
      setImageFiles([]);
      toast({
        title: QUIZZES_MESSAGES.CREATE_QUESTION_SUCCESS,
        description: QUIZZES_MESSAGES.CREATE_QUESTION_SUCCESS_DESCRIPTION,
      });
    },
    onError: (error) => {
      if (
        isEntityError<
          ErrorResponse<{ [key in keyof CreateQuestionSchema]: string }>
        >(error)
      ) {
        const formErrors = error.response?.data.data;
        if (!isEmpty(formErrors)) {
          Object.keys(formErrors).forEach((key) => {
            form.setError(key as keyof CreateQuestionSchema, {
              type: "Server",
              message: formErrors[key as keyof CreateQuestionSchema],
            });
          });
          if (formErrors.answers) {
            toast({
              title: "Lỗi",
              description: formErrors.answers,
              variant: "destructive",
            });
          }
        }
      }
    },
  });

  // Field array: Danh sách câu trả lời
  const answersFieldArray = useFieldArray({
    name: "answers",
    control: form.control,
  });

  // Thay đổi câu trả lời đúng
  const changeTrueAnswer = (id: string) => {
    answersFieldArray.fields.forEach((field, i) => {
      if (field.id === id) {
        form.setValue(`answers.${i}.is_correct`, true);
        setCurrentAnswerIndex(i);
      } else {
        form.setValue(`answers.${i}.is_correct`, false);
      }
    });
  };

  // Hình ảnh preview
  const imagesPreview = useMemo(
    () => imageFiles.map((imageFile) => URL.createObjectURL(imageFile)),
    [imageFiles]
  );

  // Handle: Thay đổi hình ảnh
  const handleChangeImages = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setImageFiles((prev) => [...prev, ...Array.from(files)]);
  };

  // Handle: Xóa hình ảnh
  const handleRemoveImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Mutation: Upload hình ảnh
  const uploadImagesMutation = useMutation({
    mutationFn: imageApis.upload,
  });

  // Kiểm tra xem có đang fetching hay không
  const isPending = useMemo(
    () => uploadImagesMutation.isPending || createQuestionMutation.isPending,
    [uploadImagesMutation.isPending, createQuestionMutation.isPending]
  );

  // Submit form
  const onSubmit = form.handleSubmit(async (data) => {
    let body = {
      ...data,
      answers: data.answers as AnswerType[],
    };
    if (imageFiles.length) {
      const form = new FormData();
      imageFiles.forEach((imageFile) => form.append("image", imageFile));
      const res = await uploadImagesMutation.mutateAsync(form);
      const { images } = res.data.data;
      const imagesId = images.map((image) => image._id);
      body.images = imagesId;
    }
    createQuestionMutation.mutate(body);
  });

  return (
    <Form {...form}>
      <TooltipProvider delayDuration={0}>
        <form onSubmit={onSubmit} className="space-y-10">
          {/* Tên */}
          <FormField
            control={form.control}
            name="name"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên câu hỏi</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập tên câu hỏi" {...field} />
                </FormControl>
                <FormDescription>
                  Tên câu hỏi nên ngắn gọn, dễ hiểu và đủ ý nghĩa.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Mô tả */}
          <FormField
            control={form.control}
            name="description"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mô tả câu hỏi</FormLabel>
                <FormControl>
                  <Textarea
                    rows={8}
                    placeholder="Nhập tên câu hỏi"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Mô tả câu hỏi nên ngắn gọn, dễ hiểu và đủ ý nghĩa. Nếu không
                  có có thể bỏ qua.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Chọn bài trắc nghiệm */}
          <FormField
            control={form.control}
            name="quiz_id"
            disabled={isPending}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Chọn bài trắc nghiệm</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[500px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? quizzesOptions.find(
                              (quiz) => quiz.value === field.value
                            )?.label
                          : "Chọn một bài trắc nghiệm"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[500px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Tìm bài trắc nghiệm..."
                        className="h-9"
                      />
                      <CommandEmpty>
                        Không tìm thấy bài trắc nghiệm nào.
                      </CommandEmpty>
                      <CommandGroup>
                        {quizzesOptions.map((quiz) => (
                          <CommandItem
                            value={quiz.label}
                            key={quiz.value}
                            onSelect={() => {
                              form.setValue("quiz_id", quiz.value);
                            }}
                          >
                            {quiz.label}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                quiz.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Chọn bài trắc nghiệm cho câu hỏi này. Hãy chắc chắn rằng câu
                  hỏi này phù hợp với bài trắc nghiệm.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Hình ảnh câu hỏi */}
          <FormField
            control={form.control}
            name="images"
            disabled={isPending}
            render={({ field }) => (
              <div>
                <div className="grid grid-cols-12 gap-3">
                  {imagesPreview.map((image) => (
                    <div key={image} className="col-span-2 relative">
                      <Image
                        src={image}
                        width={100}
                        height={100}
                        alt={image}
                        className="rounded-md mb-4 w-full h-[120px] object-cover"
                      />
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="icon"
                            variant="destructive"
                            className="absolute top-1 right-1 w-6 h-6"
                          >
                            <Trash size={12} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Xóa hình ảnh này</TooltipContent>
                      </Tooltip>
                    </div>
                  ))}
                </div>
                <FormItem>
                  <FormLabel>Hình ảnh câu hỏi</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      multiple
                      accept="image/*"
                      {...field}
                      onChange={handleChangeImages}
                    />
                  </FormControl>
                  <FormDescription>
                    Hình ảnh câu hỏi giúp người dùng dễ hình dung hơn về câu
                    hỏi.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              </div>
            )}
          />

          {/* Danh sách câu trả lời */}
          <div className="space-y-4">
            {answersFieldArray.fields.map((field, index) => (
              <div>
                <FormField
                  control={form.control}
                  key={field.id}
                  name={`answers.${index}.name`}
                  disabled={isPending}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(index !== 0 && "sr-only")}>
                        Câu trả lời
                      </FormLabel>
                      <FormDescription className={cn(index !== 0 && "sr-only")}>
                        Thêm câu trả lời cho câu hỏi này. Chỉ duy nhất một câu
                        trả lời là đúng.
                      </FormDescription>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex mt-3">
                  {index !== 0 && (
                    <Tooltip>
                      <TooltipTrigger>
                        <Button
                          type="button"
                          size="icon"
                          variant="destructive"
                          onClick={() => answersFieldArray.remove(index)}
                          disabled={isPending}
                          className="mr-3"
                        >
                          <Trash size={16} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Xóa câu trả lời</TooltipContent>
                    </Tooltip>
                  )}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        size="icon"
                        onClick={() => changeTrueAnswer(field.id)}
                        disabled={isPending}
                        className={classNames({
                          "bg-green-500 hover:bg-green-600":
                            index === currentAnswerIndex,
                        })}
                      >
                        <CheckCircle size={16} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Đánh dấu là đáp án đúng</TooltipContent>
                  </Tooltip>
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              disabled={isPending}
              onClick={() =>
                answersFieldArray.append({
                  name: "",
                  description: "",
                  is_correct: false,
                })
              }
            >
              Thêm câu trả lời
            </Button>
          </div>

          {/* Submit */}
          <Button disabled={isPending}>
            {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Tạo câu hỏi
          </Button>
        </form>
      </TooltipProvider>
    </Form>
  );
};

export default CreateQuestionForm;
