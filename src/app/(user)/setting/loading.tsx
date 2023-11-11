import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="w-[55px] h-[30px]" />
        <Skeleton className="w-[280px] h-[23px] mt-2" />
      </div>
      <div>
        <Skeleton className="w-[94px] h-5" />
        <Skeleton className="w-full h-8 mt-2 rounded-lg" />
      </div>
      <div>
        <Skeleton className="w-[94px] h-5" />
        <Skeleton className="w-full h-8 mt-2 rounded-lg" />
      </div>
      <div>
        <Skeleton className="w-[94px] h-5" />
        <Skeleton className="w-full h-8 mt-2 rounded-lg" />
      </div>
      <div>
        <Skeleton className="w-[94px] h-5" />
        <Skeleton className="w-full h-[120px] mt-2 rounded-lg" />
      </div>
    </div>
  );
};

export default Loading;
