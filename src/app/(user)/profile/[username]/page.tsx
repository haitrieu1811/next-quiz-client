"use client";

import { useQuery } from "@tanstack/react-query";
import { MoreHorizontal } from "lucide-react";
import { Fragment, useMemo } from "react";

import userApis from "@/apis/user.apis";
import Quiz from "@/components/quiz";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ProfileProps = {
  params: {
    username: string;
  };
};

const Profile = ({ params }: ProfileProps) => {
  const { username } = params;

  // Query: Lấy thông tin user theo username
  const getUserQuery = useQuery({
    queryKey: ["user", username],
    queryFn: () => userApis.getUserByUsername(username),
    enabled: !!username,
  });

  // User
  const user = useMemo(
    () => getUserQuery.data?.data.data.user,
    [getUserQuery.data?.data.data.user]
  );

  return (
    <Fragment>
      {user && (
        <div>
          <div
            className="h-56 rounded-b-2xl bg-center bg-cover bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"
            style={{
              backgroundImage: `${
                user.cover_url ? `url(${user.cover_url})` : undefined
              }`,
            }}
          />
          <div className="flex justify-between items-center p-10">
            <div className="flex items-center">
              <Avatar className="w-40 h-40">
                <AvatarImage
                  src={user.avatar_url || undefined}
                  alt={user.username}
                />
                <AvatarFallback className="text-3xl">
                  {user.username[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="ml-10">
                <h4 className="font-bold text-4xl text-foreground">
                  {user.fullname}
                </h4>
                <div className="text-zinc-500 my-3">@{user.username}</div>
                <div className="text-zinc-500">{user.bio}</div>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="secondary">
                  <MoreHorizontal strokeWidth={1} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Tạo bài quiz</DropdownMenuItem>
                <DropdownMenuItem>Tạo câu hỏi</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="p-10">
            <Tabs defaultValue="home">
              <TabsList>
                <TabsTrigger value="home">Trang chủ</TabsTrigger>
                <TabsTrigger value="favourite">Yêu thích</TabsTrigger>
                <TabsTrigger value="liked">Đã thích</TabsTrigger>
                <TabsTrigger value="community">Cộng đồng</TabsTrigger>
              </TabsList>
              <TabsContent value="home">
                <div className="grid grid-cols-12 gap-5 py-6">
                  {Array(8)
                    .fill(0)
                    .map((_, index) => (
                      <Quiz key={index} className="col-span-3" />
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="favourite">
                Change your password here.
              </TabsContent>
              <TabsContent value="liked">
                Change your password here.
              </TabsContent>
              <TabsContent value="community">
                Change your password here.
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Profile;
