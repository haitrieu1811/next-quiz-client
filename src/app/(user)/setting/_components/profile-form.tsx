"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { isEmpty } from "lodash";
import { Loader2 } from "lucide-react";
import { useContext, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

import userApis from "@/apis/user.apis";
import DateSelect from "@/components/date-select";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { UpdateMeSchema, updateMeSchema } from "@/lib/rules";
import { isEntityError } from "@/lib/utils";
import { AppContext } from "@/providers/app-provider";
import { ErrorResponse } from "@/types/utils.types";

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
  const { setUser } = useContext(AppContext);

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
    onSuccess: (data) => {
      const { user } = data.data.data;
      setUser(user);
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
                  rows={5}
                  disabled={updateMeMutation.isPending}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Đây là một nơi tuyệt vời để nói về bản thân bạn. Bạn có thể kể
                về sở thích, sở trường, kinh nghiệm làm việc, hoặc bất cứ điều
                gì bạn muốn.
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
            <FormItem>
              <FormLabel>Ngày sinh</FormLabel>
              <FormControl>
                <DateSelect {...field} />
              </FormControl>
              <FormDescription>
                Ngày sinh của bạn sẽ được hiển thị trên hồ sơ của bạn.
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
