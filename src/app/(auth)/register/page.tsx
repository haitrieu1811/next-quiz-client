import RegisterForm from "../_components/register-form";

const Register = () => {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Tạo tài khoản</h1>
        <p className="text-sm text-muted-foreground">
          Nhập email và mật khẩu để tạo tài khoản
        </p>
      </div>
      <RegisterForm />
    </div>
  );
};

export default Register;
