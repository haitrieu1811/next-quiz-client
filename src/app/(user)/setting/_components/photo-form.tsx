"use client";

import { useMutation } from "@tanstack/react-query";
import isEmpty from "lodash/isEmpty";
import { Loader2 } from "lucide-react";
import {
  ChangeEvent,
  FormEvent,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

import imageApis from "@/apis/image.apis";
import userApis from "@/apis/user.apis";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { AppContext } from "@/providers/app-provider";
import classNames from "classnames";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const PhotoForm = () => {
  const [avatarFile, setAtavarFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const { toast } = useToast();
  const { user, setUser } = useContext(AppContext);
  const avatarRef = useRef<HTMLInputElement>(null);
  const coverRef = useRef<HTMLInputElement>(null);

  // Review ảnh đại diện
  const avatarReview = useMemo(
    () => (avatarFile ? URL.createObjectURL(avatarFile) : ""),
    [avatarFile]
  );

  // Review ảnh bìa
  const coverReview = useMemo(
    () => (coverFile ? URL.createObjectURL(coverFile) : ""),
    [coverFile]
  );

  // Handle: Thay đổi ảnh đại diện
  const handleChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setAtavarFile(files ? files[0] : null);
  };

  // Handle: Thay đổi ảnh bìa
  const handleChangeCover = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setCoverFile(files ? files[0] : null);
  };

  // Mutation: Tải ảnh lên server
  const uploadImageMutation = useMutation({
    mutationKey: ["upload-image"],
    mutationFn: imageApis.upload,
  });

  // Mutation: Cập nhật tài khoản
  const updateMeMutation = useMutation({
    mutationKey: ["update-me"],
    mutationFn: userApis.updateMe,
  });

  // Submit form
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let body: {
      avatar?: string;
      cover?: string;
    } = {};
    const formData = new FormData();
    if (avatarFile) {
      formData.append("image", avatarFile);
      const res = await uploadImageMutation.mutateAsync(formData);
      const { images } = res.data.data;
      const { _id } = images[0];
      body.avatar = _id;
    }
    if (coverFile) {
      formData.append("image", coverFile);
      const res = await uploadImageMutation.mutateAsync(formData);
      const { images } = res.data.data;
      const { _id } = images[0];
      body.cover = _id;
    }
    if (isEmpty(body)) return;
    updateMeMutation.mutate(body, {
      onSuccess: (data) => {
        setUser(data.data.data.user);
        toast({
          title: "Cập nhật thành công",
          description: "Hình ảnh của bạn đã được cập nhật thành công",
        });
        setAtavarFile(null);
        setCoverFile(null);
        avatarRef.current!.value = "";
        coverRef.current!.value = "";
      },
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <Avatar className="w-20 h-20">
        <AvatarImage
          src={avatarReview ? avatarReview : user?.avatar_url || undefined}
          alt={user?.username}
          className="object-cover"
        />
        <AvatarFallback>{user?.username[0].toUpperCase()}</AvatarFallback>
      </Avatar>

      <div className="space-y-3">
        <Label className="mb-1">Ảnh đại diện</Label>
        <Input
          ref={avatarRef}
          type="file"
          accept=".jpeg,.jpg,.png"
          onChange={handleChangeAvatar}
          disabled={uploadImageMutation.isPending || updateMeMutation.isPending}
        />
      </div>

      <div
        className="w-56 h-32 rounded-lg bg-cover bg-center bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"
        style={{
          backgroundImage: `${
            coverReview || user?.cover_url
              ? `url(${coverReview || user?.cover_url})`
              : undefined
          }`,
        }}
      />

      <div className="space-y-3">
        <Label>Ảnh bìa</Label>
        <Input
          ref={coverRef}
          type="file"
          accept=".jpeg,.jpg,.png"
          onChange={handleChangeCover}
          disabled={uploadImageMutation.isPending || updateMeMutation.isPending}
        />
      </div>

      <div
        className={classNames({
          "cursor-not-allowed":
            uploadImageMutation.isPending || updateMeMutation.isPending,
        })}
      >
        <Button
          type="submit"
          disabled={uploadImageMutation.isPending || updateMeMutation.isPending}
        >
          {(uploadImageMutation.isPending || updateMeMutation.isPending) && (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          )}
          Cập nhật hình ảnh
        </Button>
      </div>
    </form>
  );
};

export default PhotoForm;
