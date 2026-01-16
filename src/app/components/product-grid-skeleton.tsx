import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductGridSkeletonProps {
  columns: number;
}

export function ProductGridSkeleton({ columns }: ProductGridSkeletonProps) {
  const gridColsClass =
    {
      1: "grid-cols-1",
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    }[columns] || "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className="flex-1 overflow-y-auto">
      <div className={`grid gap-4 p-4 sm:p-6 ${gridColsClass}`}>
        {Array.from({ length: 9 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            {/* Image Placeholder */}
            <div className="relative bg-muted">
              <Skeleton className="h-48 w-full" />
            </div>

            {/* Content Placeholder */}
            <div className="p-4">
              <Skeleton className="mb-2 h-3 w-1/3" />
              <Skeleton className="mb-2 h-5 w-3/4" />
              <div className="mb-3 flex gap-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Skeleton key={j} className="h-3 w-3 rounded-full" />
                ))}
              </div>
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
