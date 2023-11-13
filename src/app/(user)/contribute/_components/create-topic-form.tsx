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
import { Button } from "@/components/ui/button";

const CreateTopicForm = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
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
              <FormLabel>Tên chủ đề</FormLabel>
              <FormControl>
                <Input placeholder="Nhập tên chủ đề" {...field} />
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
              <FormLabel>Mô tả chủ đề</FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  placeholder="Nhập mô tả chủ đề"
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

        <Button type="submit">Tạo chủ đề</Button>
      </form>
    </Form>
  );
};

export default CreateTopicForm;
