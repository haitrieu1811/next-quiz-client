import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { QuizLevel } from "@/constants/enum";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CreateQuizForm = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      level: QuizLevel.Easy,
      topic: "",
    },
  });

  // Submit form
  const onSubmit = form.handleSubmit((data) => {
    console.log(">>> data", data);
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên bài quiz</FormLabel>
              <FormControl>
                <Input placeholder="Nhập tên bài quiz" {...field} />
              </FormControl>
              <FormDescription>
                Đây là tên hiển thị công khai của bạn. Nó có thể là tên thật
                hoặc bút danh của bạn.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mô tả quiz</FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  placeholder="Nhập mô tả bài quiz"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Đây là tên hiển thị công khai của bạn. Nó có thể là tên thật
                hoặc bút danh của bạn.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Độ khó</FormLabel>
              <FormControl>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Chọn độ khó" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={QuizLevel.Easy.toString()}>
                      Dễ
                    </SelectItem>
                    <SelectItem value={QuizLevel.Medium.toString()}>
                      Trung bình
                    </SelectItem>
                    <SelectItem value={QuizLevel.Hard.toString()}>
                      Khó
                    </SelectItem>
                    <SelectItem value={QuizLevel.VeryHard.toString()}>
                      Rất khó
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>
                Đây là tên hiển thị công khai của bạn. Nó có thể là tên thật
                hoặc bút danh của bạn.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default CreateQuizForm;
