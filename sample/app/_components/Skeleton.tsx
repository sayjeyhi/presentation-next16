import { Card, CardContent, CardHeader } from "@/components/ui/card";

// Loading skeletons
export function CountSkeleton() {
  return (
    <div className="text-center">
      <div className="h-12 w-20 mx-auto bg-muted animate-pulse rounded"></div>
      <div className="h-4 w-24 mx-auto mt-2 bg-muted animate-pulse rounded"></div>
    </div>
  );
}

export function PostsSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className="overflow-hidden py-0">
          <div className="aspect-video w-full bg-muted animate-pulse"></div>
          <CardHeader>
            <div className="h-6 bg-muted animate-pulse rounded w-3/4"></div>
            <div className="h-4 bg-muted animate-pulse rounded w-1/2 mt-2"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="h-4 bg-muted animate-pulse rounded"></div>
              <div className="h-4 bg-muted animate-pulse rounded"></div>
              <div className="h-4 bg-muted animate-pulse rounded w-2/3"></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
