import Link from "next/link";
import LoginForm from "../_components/login-form";

const Login = () => {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Đăng nhập</h1>
        <p className="text-sm text-muted-foreground">
          Nhập thông tin đăng nhập của bạn.
        </p>
      </div>
      <LoginForm />
      <p className="px-8 text-center text-sm text-muted-foreground">
        Bạn quên mật khẩu?{" "}
        <Link
          href="/terms"
          className="underline underline-offset-4 hover:text-primary"
        >
          Lấy lại mật khẩu
        </Link>{" "}
        .
      </p>
    </div>
  );
};

export default Login;
