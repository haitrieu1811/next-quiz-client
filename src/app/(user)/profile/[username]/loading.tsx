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
      <Skeleton className="w-1/2 h-8 mb-10" />
      <div className="grid grid-cols-12 gap-5 py-6 px-10">
        {Array(8)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} className="col-span-3 h-80" />
          ))}
      </div>
    </Fragment>
  );
};

export default Loading;
