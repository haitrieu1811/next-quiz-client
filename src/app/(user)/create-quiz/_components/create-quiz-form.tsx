"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CheckIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useMemo, useRef, useState } from "react";
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
import { cn } from "@/lib/utils";
import { CreateQuizSchema, createQuizSchema } from "@/rules/quiz.rules";
import { CaretSortIcon } from "@radix-ui/react-icons";

const quizLevels = [
  { value: QuizLevel.Easy, label: "Dễ" },
  { value: QuizLevel.Medium, label: "Trung bình" },
  { value: QuizLevel.Hard, label: "Khó" },
  { value: QuizLevel.VeryHard, label: "Rất khó" },
] as const;

const CreateQuizForm = () => {
  const { toast } = useToast();
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const thumbnailRef = useRef<HTMLInputElement>(null);

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
        title: "Tạo quiz thành công",
        description: "Bạn đã tạo quiz thành công.",
      });
    },
  });

  // Submit form
  const onSubmit = form.handleSubmit((data) => {
    const body = {
      ...data,
      level: Number(data.level),
    };
    if (thumbnailFile) {
      const formData = new FormData();
      formData.append("image", thumbnailFile);
      uploadImageMutation.mutate(formData, {
        onSuccess: (data) => {
          const { images } = data.data.data;
          const { _id } = images[0];
          body.thumbnail = _id;
          createQuizMutation.mutate(body);
        },
      });
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8 px-2">
        {/* Tên */}
        <FormField
          control={form.control}
          name="name"
          disabled={
            createQuizMutation.isPending || uploadImageMutation.isPending
          }
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
          disabled={
            createQuizMutation.isPending || uploadImageMutation.isPending
          }
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
          disabled={
            createQuizMutation.isPending || uploadImageMutation.isPending
          }
          render={({ field }) => (
            <FormItem>
              <FormLabel>Độ khó</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={String(field.value)}
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
          disabled={
            createQuizMutation.isPending || uploadImageMutation.isPending
          }
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
        <Button
          type="submit"
          disabled={
            createQuizMutation.isPending || uploadImageMutation.isPending
          }
        >
          {(createQuizMutation.isPending || uploadImageMutation.isPending) && (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          )}
          Tạo quiz
        </Button>
      </form>
    </Form>
  );
};

export default CreateQuizForm;
