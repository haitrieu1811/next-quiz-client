"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import isEmpty from "lodash/isEmpty";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

import userApis from "@/apis/user.apis";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { ChangePasswordSchema, changePasswordSchema } from "@/lib/rules";
import { isEntityError } from "@/lib/utils";
import { ErrorResponse } from "@/types/utils.types";

const ChangePasswordForm = () => {
  const { toast } = useToast();

  // Form
  const form = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      old_password: "",
      password: "",
      confirm_password: "",
    },
  });

  // Mutation: Đổi mật khẩu
  const changePasswordMutation = useMutation({
    mutationKey: ["change-password"],
    mutationFn: userApis.changePassword,
    onSuccess: () => {
      toast({
        title: "Đổi mật khẩu thành công",
        description: "Mật khẩu của bạn đã được thay đổi thành công",
      });
      form.reset();
    },
    onError: (error) => {
      if (isEntityError<ErrorResponse<ChangePasswordSchema>>(error)) {
        const formErrors = error.response?.data.data;
        if (!isEmpty(formErrors)) {
          Object.keys(formErrors).forEach((key) => {
            form.setError(key as keyof ChangePasswordSchema, {
              type: "Server",
              message: formErrors[key as keyof ChangePasswordSchema],
            });
          });
        }
      }
    },
  });

  // Submit form
  const onSubmit = form.handleSubmit((data) => {
    changePasswordMutation.mutate(data);
  });

  return (
    <div>
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-8">
          <FormField
            control={form.control}
            name="old_password"
            disabled={changePasswordMutation.isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mật khẩu cũ</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Mật khẩu cũ" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            disabled={changePasswordMutation.isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mật khẩu mới</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Mật khẩu mới"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirm_password"
            disabled={changePasswordMutation.isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Xác nhận mật khẩu mới</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Xác nhận mật khẩu"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">
            {changePasswordMutation.isPending && (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            )}
            Đổi mật khẩu
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ChangePasswordForm;
