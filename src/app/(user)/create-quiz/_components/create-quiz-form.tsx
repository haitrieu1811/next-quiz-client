"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import isUndefined from "lodash/isUndefined";
import omitBy from "lodash/omitBy";
import { CheckIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import PropTypes from "prop-types";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import imageApis from "@/apis/image.apis";
import quizApis from "@/apis/quiz.apis";
import topicApis from "@/apis/topic.apis";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { QuizLevel } from "@/constants/enum";
import { QUIZZES_MESSAGES } from "@/constants/messages";
import { cn } from "@/lib/utils";
import { CreateQuizSchema, createQuizSchema } from "@/rules/quiz.rules";

const quizLevels = [
  { value: QuizLevel.Easy, label: "Dễ" },
  { value: QuizLevel.Medium, label: "Trung bình" },
  { value: QuizLevel.Hard, label: "Khó" },
  { value: QuizLevel.VeryHard, label: "Rất khó" },
] as const;

type CreateQuizFormProps = {
  quizId?: string;
};

const CreateQuizForm = ({ quizId }: CreateQuizFormProps) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const thumbnailRef = useRef<HTMLInputElement>(null);

  // Query: Lấy thông tin quiz (ở chế độ chỉnh sửa)
  const getQuizQuery = useQuery({
    queryKey: ["get-quiz", quizId],
    queryFn: () => quizApis.getQuiz(quizId as string),
    enabled: !!quizId,
  });

  // Thông tin quiz (ở chế độ chỉnh sửa)
  const quiz = useMemo(
    () => getQuizQuery.data?.data.data.quiz,
    [getQuizQuery.data?.data.data.quiz]
  );

  // Handle: Thay đổi ảnh đại diện
  const handleChangeThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    setThumbnailFile(files ? files[0] : null);
  };

  // Review ảnh đại diện
  const thumbnailReview = useMemo(
    () => (thumbnailFile ? URL.createObjectURL(thumbnailFile) : ""),
    [thumbnailFile]
  );

  // Query: Lấy danh sách chủ đề
  const getTopicsQuery = useQuery({
    queryKey: ["get-topics"],
    queryFn: () => topicApis.getTopics(),
  });

  // Danh sách chủ đề
  const topics = useMemo(
    () => getTopicsQuery.data?.data.data.topics || [],
    [getTopicsQuery.data?.data.data.topics]
  );

  // Danh sách chủ đề cho Select
  const topicOptions = useMemo(
    () =>
      topics.map((topic) => ({
        label: topic.name,
        value: topic._id,
      })),
    [topics]
  );

  // Form
  const form = useForm<CreateQuizSchema>({
    resolver: zodResolver(createQuizSchema),
    defaultValues: {
      name: "",
      description: "",
      topic_id: "",
      level: String(QuizLevel.Easy),
    },
  });

  // Set giá trị mặc định cho form (ở chế độ chỉnh sửa)
  useEffect(() => {
    if (!quiz) return;
    form.setValue("name", quiz.name);
    form.setValue("description", quiz.description);
    form.setValue("topic_id", quiz.topic._id);
    form.setValue("level", String(quiz.level));
  }, [quiz]);

  // Mutation: Upload ảnh
  const uploadImageMutation = useMutation({
    mutationKey: ["upload-image"],
    mutationFn: imageApis.upload,
  });

  // Mutation: Tạo quiz
  const createQuizMutation = useMutation({
    mutationKey: ["create-quiz"],
    mutationFn: quizApis.createQuiz,
    onSuccess: () => {
      form.reset();
      form.setValue("level", String(QuizLevel.Easy));
      setThumbnailFile(null);
      thumbnailRef.current?.value && (thumbnailRef.current.value = "");
      toast({
        title: QUIZZES_MESSAGES.CREATE_QUIZ_SUCCESS_TITLE,
        description: QUIZZES_MESSAGES.CREATE_QUIZ_SUCCESS_DESCRIPTION,
      });
    },
  });

  // Mutation: Cập nhật bài trắc nghiệm
  const updateQuizMutation = useMutation({
    mutationFn: quizApis.updateQuiz,
    onSuccess: () => {
      setThumbnailFile(null);
      thumbnailRef.current?.value && (thumbnailRef.current.value = "");
      toast({
        title: "Cập nhật bài trắc nghiệm thành công",
        description: "Bạn đã cập nhật quiz thành công.",
      });
      queryClient.invalidateQueries({
        queryKey: ["get-quizzes"],
      });
    },
  });

  // Submit form
  const onSubmit = form.handleSubmit(async (data) => {
    const body = {
      ...data,
      level: Number(data.level),
    };
    if (thumbnailFile) {
      const formData = new FormData();
      formData.append("image", thumbnailFile);
      const res = await uploadImageMutation.mutateAsync(formData);
      const { images } = res.data.data;
      const { _id } = images[0];
      body.thumbnail = _id;
    }
    if (!quiz) {
      createQuizMutation.mutate(body);
    } else {
      const updateBody = omitBy(body, isUndefined);
      updateQuizMutation.mutate({ quiz_id: quiz._id, body: updateBody });
    }
  });

  // isLoading
  const isLoading =
    createQuizMutation.isPending ||
    updateQuizMutation.isPending ||
    uploadImageMutation.isPending;

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        {/* Tên */}
        <FormField
          control={form.control}
          name="name"
          disabled={isLoading}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Tên bài quiz" {...field} />
              </FormControl>
              <FormDescription>
                Tên bài quiz phải có ít nhất 5 kí tự.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Mô tả */}
        <FormField
          control={form.control}
          name="description"
          disabled={isLoading}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mô tả</FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  className="resize-none"
                  placeholder="Mô tả bài quiz"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Mô tả bài quiz phải có ít nhất 10 kí tự.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Độ khó */}
        <FormField
          control={form.control}
          name="level"
          disabled={isLoading}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Độ khó</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={String(field.value)}
              >
                <FormControl>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Chọn độ khó" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {quizLevels.map((level) => (
                    <SelectItem key={level.value} value={String(level.value)}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Độ khó của bài quiz phải được xác định. Hãy chọn độ khó phù hợp
                với bài quiz của bạn.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Chủ đề */}
        <FormField
          control={form.control}
          name="topic_id"
          disabled={isLoading}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block">Chủ đề</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? topicOptions.find(
                            (topic) => topic.value === field.value
                          )?.label
                        : "Chọn chủ đề"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search chủ đề..."
                      className="h-9"
                    />
                    <CommandEmpty>Không tìm thấy chủ đề.</CommandEmpty>
                    <CommandGroup>
                      {topicOptions.map((topic) => (
                        <CommandItem
                          value={topic.label}
                          key={topic.value}
                          onSelect={() => {
                            form.setValue("topic_id", topic.value);
                          }}
                        >
                          {topic.label}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              topic.value === field.value
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
                Chủ đề của bài quiz phải được xác định. Hãy chọn chủ đề phù hợp
                với bài quiz của bạn.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Hình ảnh */}
        <FormField
          control={form.control}
          name="thumbnail"
          render={({ field }) => (
            <FormItem>
              {/* Hiển thị nếu có thumbnail và không có ảnh review */}
              {quiz && quiz.thumbnail && !thumbnailReview && (
                <Image
                  src={quiz.thumbnail}
                  width={120}
                  height={50}
                  alt={quiz.name}
                  className="rounded-lg mb-5"
                />
              )}
              {thumbnailReview && (
                <Image
                  src={thumbnailReview}
                  width={120}
                  height={50}
                  alt={thumbnailReview}
                  className="rounded-lg mb-5"
                />
              )}
              <FormLabel>Hình ảnh</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  {...field}
                  ref={thumbnailRef}
                  onChange={handleChangeThumbnail}
                />
              </FormControl>
              <FormDescription>
                Hình ảnh bài quiz phải được xác định. Hãy chọn hình ảnh phù hợp
                với bài quiz của bạn.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit */}
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {quiz ? "Cập nhật bài trắc nghiệm" : "Tạo quiz"}
        </Button>
      </form>
    </Form>
  );
};

CreateQuizForm.propTypes = {
  quiz_id: PropTypes.string,
};

export default CreateQuizForm;
