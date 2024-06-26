import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const FavDestinationLoading = () => {
  return (
    <>
      {[...Array(4)].map((_, index) => (
        <Card key={index} className="w-full rounded">
          <CardHeader className="p-2 pb-0">
            <div className="relative">
              <Skeleton className="absolute top-0 right-0 w-2/5 h-6 rounded-s-xl" />
              <Skeleton className="rounded w-full sm:h-36 md:h-32 lg:h-28 object-cover" />
            </div>
            <CardTitle className="flex items-center gap-2 font-medium text-sm">
              <Skeleton className="w-full h-6" />
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs leading-5 px-2">
            <Skeleton className="w-1/2 h-4 mt-1" />
            <Skeleton className="w-2/3 h-4 mt-1" />
            <Skeleton className="w-full h-4 mt-1" />
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default FavDestinationLoading;
