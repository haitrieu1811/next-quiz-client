"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Github, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

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

type FormSchema = LoginSchema;

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit = handleSubmit(
    (data) => {
      console.log(">>> data", data);
    },
    (error) => {
      console.log(">>> error", error);
    }
  );

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
                      disabled={isLoading}
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
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
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
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
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
