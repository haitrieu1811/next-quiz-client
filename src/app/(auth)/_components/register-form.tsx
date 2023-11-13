"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import isEmpty from "lodash/isEmpty";
import { Github, Loader2 } from "lucide-react";
import { useContext } from "react";
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
import { RegisterSchema, registerSchema } from "@/rules/user.rules";
import { isEntityError } from "@/lib/utils";
import { AppContext } from "@/providers/app-provider";
import { ErrorResponse } from "@/types/utils.types";

type FormSchema = RegisterSchema;

const RegisterForm = () => {
  const { setIsAuthenticated, setUser } = useContext(AppContext);
  const { toast } = useToast();

  // Form
  const form = useForm<FormSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const { control, handleSubmit, setError } = form;

  // Mutation: Đăng ký
  const registerMutation = useMutation({
    mutationKey: ["register"],
    mutationFn: userApis.register,
    onSuccess: (data) => {
      const { user } = data.data.data;
      setUser(user);
      setIsAuthenticated(true);
      toast({
        title: "Đăng ký thành công",
        description: "Chào mừng bạn đến với Next Quiz.",
      });
    },
    onError: (error) => {
      if (isEntityError<ErrorResponse<FormSchema>>(error)) {
        const formErrors = error.response?.data.data;
        if (!isEmpty(formErrors)) {
          Object.keys(formErrors).forEach((key) => {
            setError(key as keyof FormSchema, {
              type: "Server",
              message: formErrors[key as keyof FormSchema],
            });
          });
        }
      }
    },
  });

  // Submit form
  const onSubmit = handleSubmit((data) => {
    registerMutation.mutate(data);
  });

  return (
    <div className="grid gap-6">
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4">
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      placeholder="Email của bạn"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      disabled={registerMutation.isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Mật khẩu</FormLabel>
                  <FormControl>
                    <Input
                      id="password"
                      placeholder="Mật khẩu của bạn"
                      type="password"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      disabled={registerMutation.isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Nhập lại mật khẩu</FormLabel>
                  <FormControl>
                    <Input
                      id="password_confirm"
                      placeholder="Nhập lại mật khẩu của bạn"
                      type="password"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      disabled={registerMutation.isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={registerMutation.isPending}>
              {registerMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Tạo tài khoản với Email
            </Button>
          </div>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Hoặc tạo tài khoản với
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        disabled={registerMutation.isPending}
      >
        {registerMutation.isPending ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Github className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </Button>
    </div>
  );
};

export default RegisterForm;
