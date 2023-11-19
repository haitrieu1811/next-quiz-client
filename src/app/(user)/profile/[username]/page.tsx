"use client";

import { useQuery } from "@tanstack/react-query";
import { Fragment, useContext, useMemo } from "react";

import quizApis from "@/apis/quiz.apis";
import userApis from "@/apis/user.apis";
import Quiz from "@/components/quiz";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppContext } from "@/providers/app-provider";

type ProfileProps = {
  params: {
    username: string;
  };
};

const Profile = ({ params }: ProfileProps) => {
  const { username } = params;
  const { user: profile } = useContext(AppContext);

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

  // Query: Danh sách các bài quiz
  const getQuizzesQuery = useQuery({
    queryKey: ["quizzes-of-logged-user", user?._id],
    queryFn: () => quizApis.getQuizzes({ user_id: user?._id }),
    enabled: !!user?._id,
  });

  // Danh sách các bài quiz
  const quizzes = useMemo(
    () => getQuizzesQuery.data?.data.data.quizzes || [],
    [getQuizzesQuery.data?.data.data.quizzes]
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

          <div className="flex justify-between items-center py-10">
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
          </div>

          <div className="py-10">
            <Tabs defaultValue="home">
              <TabsList>
                <TabsTrigger value="home">Trang chủ</TabsTrigger>
                <TabsTrigger value="favourite">Yêu thích</TabsTrigger>
                <TabsTrigger value="liked">Đã thích</TabsTrigger>
                <TabsTrigger value="community">Cộng đồng</TabsTrigger>
              </TabsList>
              <TabsContent value="home">
                <div className="grid grid-cols-12 gap-5 py-6">
                  {quizzes.map((quiz) => (
                    <Quiz key={quiz._id} quiz={quiz} className="col-span-3" />
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
