import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const LoadingPost = ({ className }: { className?: string }) => {
  return (
    <Card className={`w-full ${className}`}>
      <CardContent className="px-6 space-y-2">
        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="h-10 w-10" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex items-center gap-4">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
        </div>
      </CardContent>
    </Card>
  );
};

export default LoadingPost;
