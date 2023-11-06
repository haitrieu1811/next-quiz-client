import { History, Key, LogOut, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AccountDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Avatar className="w-8 h-8 select-none">
          <AvatarImage src="https://github.com/shadcn.png" sizes="sm" />
          <AvatarFallback className="text-xs">CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={10} className="w-48">
        <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User strokeWidth={1.5} width={15} className="mr-3" /> Thông tin tài
          khoản
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Key strokeWidth={1.5} width={15} className="mr-3" /> Đổi mật khẩu
        </DropdownMenuItem>
        <DropdownMenuItem>
          <History strokeWidth={1.5} width={15} className="mr-3" /> Lịch sử trả
          lời
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut strokeWidth={1.5} width={15} className="mr-3" /> Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountDropdown;
