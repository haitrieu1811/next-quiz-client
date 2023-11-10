"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import userApis from "@/apis/user.apis";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  bio: z.string().max(160).min(4),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      })
    )
    .optional(),
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  bio: "I own a computer.",
};

const ProfileForm = () => {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  // Query: Lấy thông tin tài khoản đăng nhập
  const getMeQuery = useQuery({
    queryKey: ["get-me"],
    queryFn: () => userApis.getMe(),
  });

  // Thông tin tài khoản
  const me = useMemo(
    () => getMeQuery.data?.data.data.user,
    [getMeQuery.data?.data.data.user]
  );

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  // Set giá trị mặc định cho form
  useEffect(() => {
    if (!me) return;
    form.setValue("username", me.username);
    form.setValue("name", me.fullname);
    form.setValue("bio", me.bio);
    form.setValue("dob", new Date(me.date_of_birth));
  }, [me, form]);

  if (!me) {
    return null;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên tài khoản</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Họ và tên</FormLabel>
              <FormControl>
                <Input placeholder="Họ và tên" {...field} />
              </FormControl>
              <FormDescription>
                Đây là tên sẽ được hiển thị trên hồ sơ của bạn và trong email..
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem>
          <FormLabel>Email</FormLabel>
          <Input type="email" value="haitrieu2524@gmail.com" disabled />
          <FormDescription>
            Bạn không thể thay đổi email sau khi đã tạo tài khoản.
          </FormDescription>
          <FormMessage />
        </FormItem>
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Giới thiệu</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Hãy kể cho chúng tôi một chút về bản thân bạn"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> other users and organizations to
                link to them.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Sinh nhật</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Ngày sinh của bạn được sử dụng để tính tuổi của bạn.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Cập nhật hồ sơ</Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
