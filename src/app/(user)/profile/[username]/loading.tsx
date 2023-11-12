import { Fragment } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <Fragment>
      <Skeleton className="h-56 rounded-b-2xl" />
      <div className="flex items-center p-10">
        <Skeleton className="w-40 h-40 rounded-full" />
        <div className="ml-10">
          <Skeleton className="h-10 w-56" />
          <Skeleton className="h-5 my-3 w-40" />
          <Skeleton className="h-5 my-3 w-28" />
        </div>
      </div>
      <Skeleton className="w-3/4 h-8 mb-10" />
    </Fragment>
  );
};

export default Loading;
