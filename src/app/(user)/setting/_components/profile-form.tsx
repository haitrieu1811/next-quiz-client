"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

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
import { useToast } from "@/components/ui/use-toast";
import { UpdateMeSchema, updateMeSchema } from "@/lib/rules";
import { cn, isEntityError } from "@/lib/utils";
import { ErrorResponse } from "@/types/utils.types";
import { isEmpty } from "lodash";

type FormSchema = UpdateMeSchema;

const ProfileForm = () => {
  // Form
  const form = useForm<FormSchema>({
    resolver: zodResolver(updateMeSchema),
    defaultValues: {
      username: "",
      fullname: "",
      bio: "",
      phone_number: "",
      date_of_birth: new Date(),
    },
  });

  const { handleSubmit, control, setValue, setError } = form;
  const { toast } = useToast();

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

  // Mutation: Cập nhật thông tin tài khoản
  const updateMeMutation = useMutation({
    mutationKey: ["update-me"],
    mutationFn: userApis.updateMe,
    onSuccess: () => {
      getMeQuery.refetch();
      toast({
        title: "Cập nhật thông tin thành công",
        description: "Thông tin sẽ được hiển thị trên hồ sơ của bạn.",
      });
    },
    onError: (error) => {
      if (isEntityError<ErrorResponse<FormSchema>>(error)) {
        const formErrors = error.response?.data.data;
        if (!isEmpty(formErrors)) {
          Object.keys(formErrors).forEach((key) => {
            setError(key as keyof FormSchema, {
              type: "Server",
              message: formErrors[key as keyof FormSchema]?.toString(),
            });
          });
        }
      }
    },
  });

  // Submit form
  const onSubmit = handleSubmit((data) => {
    if (!me) return;
    Object.keys(data).forEach((key) => {
      const _key = key as keyof FormSchema;
      if (data[_key] === me[_key]) {
        delete data[_key];
      }
    });
    updateMeMutation.mutate(data);
  });

  // Set giá trị mặc định cho form
  useEffect(() => {
    if (!me) return;
    setValue("username", me.username);
    setValue("fullname", me.fullname);
    setValue("bio", me.bio);
    setValue("phone_number", me.phone_number);
    setValue("date_of_birth", new Date(me.date_of_birth));
  }, [me, setValue]);

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        {/* Username */}
        <FormField
          control={control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên tài khoản</FormLabel>
              <FormControl>
                <Input
                  placeholder="shadcn"
                  disabled={updateMeMutation.isPending}
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
        {/* Fullname */}
        <FormField
          control={control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Họ và tên</FormLabel>
              <FormControl>
                <Input
                  placeholder="Họ và tên"
                  disabled={updateMeMutation.isPending}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Đây là tên sẽ được hiển thị trên hồ sơ của bạn và trong email..
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Email */}
        <FormItem>
          <FormLabel>Email</FormLabel>
          <Input type="email" value="haitrieu2524@gmail.com" disabled />
          <FormDescription>
            Bạn không thể thay đổi email sau khi đã tạo tài khoản.
          </FormDescription>
          <FormMessage />
        </FormItem>
        {/* Phone number */}
        <FormField
          control={control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số điện thoại</FormLabel>
              <FormControl>
                <Input
                  placeholder="Số điện thoại"
                  disabled={updateMeMutation.isPending}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Đây là số điện thoại mà chúng tôi sẽ liên lạc với bạn nếu cần.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Bio */}
        <FormField
          control={control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Giới thiệu</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Hãy kể cho chúng tôi một chút về bản thân bạn"
                  className="resize-none"
                  disabled={updateMeMutation.isPending}
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
        {/* Date of birth */}
        <FormField
          control={control}
          name="date_of_birth"
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
                        <span>Chọn ngày sinh</span>
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
        {/* Submit */}
        <Button type="submit">
          {updateMeMutation.isPending && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Cập nhật hồ sơ
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
