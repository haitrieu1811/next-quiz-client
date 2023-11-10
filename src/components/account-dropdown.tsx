import { useMutation } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext } from "react";

import userApis from "@/apis/user.apis";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PATH from "@/constants/path";
import { AppContext } from "@/providers/app-provider";
import { useToast } from "./ui/use-toast";

const AccountDropdown = () => {
  const router = useRouter();
  const { setIsAuthenticated, setUser, user } = useContext(AppContext);
  const { toast } = useToast();

  // Mutation: Đăng xuất
  const logoutMutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: userApis.logout,
    onSuccess: () => {
      setIsAuthenticated(false);
      setUser(null);
      toast({
        title: "Đăng xuất thành công",
        description: "Bạn đã đăng xuất khỏi tài khoản của mình.",
      });
    },
  });

  const logout = () => {
    logoutMutation.mutate();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Avatar className="w-8 h-8 select-none">
          <AvatarImage src="https://github.com/shadcn.png" sizes="sm" />
          <AvatarFallback className="text-xs">CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={10} className="w-48">
        <DropdownMenuLabel>{user?.username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => router.push(PATH.SETTING)}
          className="cursor-pointer"
        >
          Cài đặt
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          Đổi mật khẩu
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          Lịch sử trả lời
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="cursor-pointer">
          <LogOut width={15} className="mr-3" /> Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountDropdown;
