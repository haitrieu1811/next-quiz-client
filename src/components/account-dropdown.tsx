import { useMutation } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { useContext, useMemo } from "react";

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
  const { setIsAuthenticated, setUser, user } = useContext(AppContext);
  const { toast } = useToast();

  // Paths
  const paths = useMemo(
    () => [
      {
        name: "Trang cá nhân",
        path: `${PATH.PROFILE}/${user?.username}`,
      },
      {
        name: "Cài đặt",
        path: PATH.SETTING,
      },
      {
        name: "Đổi mật khẩu",
        path: PATH.SETTING_CHANGE_PASSWORD,
      },
      {
        name: "Lịch sử trả lời",
        path: PATH.HISTORY,
      },
      {
        name: "Dashboard",
        path: PATH.DASHBOARD,
      },
    ],
    [user?.username]
  );

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

  // Handle: Đăng xuất
  const logout = () => {
    logoutMutation.mutate();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="w-8 h-8 select-none cursor-pointer">
          <AvatarImage
            src={user?.avatar_url || undefined}
            sizes="sm"
            className="object-cover"
          />
          <AvatarFallback className="text-xs">
            {user?.username[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={10} className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.username}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {paths.map((path) => (
          <DropdownMenuItem key={path.path} asChild className="cursor-pointer">
            <Link href={path.path}>{path.name}</Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="cursor-pointer">
          <LogOut width={15} className="mr-3" /> Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountDropdown;
