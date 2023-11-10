"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Github, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import isEmpty from "lodash/isEmpty";

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
import { LoginSchema, loginSchema } from "@/lib/rules";
import { isEntityError } from "@/lib/utils";
import { ErrorResponse } from "@/types/utils.types";
import { useContext } from "react";
import { AppContext } from "@/providers/app-provider";
import { useToast } from "@/components/ui/use-toast";

type FormSchema = LoginSchema;

const LoginForm = () => {
  const { setIsAuthenticated, setUser } = useContext(AppContext);
  const { toast } = useToast();

  // Form
  const form = useForm<FormSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = form;

  // Mutation: Đăng nhập
  const loginMutation = useMutation({
    mutationFn: userApis.login,
    onSuccess: (data) => {
      const { user } = data.data.data;
      setIsAuthenticated(true);
      setUser(user);
      toast({
        title: "Đăng nhập thành công",
        description: "Chào mừng bạn đến với Next Quiz",
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
    loginMutation.mutate(data);
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
                      type="text"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      disabled={loginMutation.isPending}
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
                  <FormControl>
                    <Input
                      id="password"
                      placeholder="Mật khẩu của bạn"
                      type="password"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      disabled={loginMutation.isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={loginMutation.isPending}>
              {loginMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Đăng nhập với Email
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
            Hoặc đăng nhập với
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Github className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </Button>
    </div>
  );
};

export default LoginForm;
