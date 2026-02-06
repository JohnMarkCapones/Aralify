import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Top bar skeleton */}
      <div className="border-b-4 border-border bg-card px-6 py-4 flex items-center justify-between">
        <Skeleton className="h-8 w-32" />
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-9 rounded-xl" />
          <Skeleton className="h-9 w-9 rounded-full" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Greeting skeleton */}
        <Skeleton className="h-10 w-72 mb-2" />
        <Skeleton className="h-5 w-48 mb-8" />

        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="p-5 neo-brutal-border neo-brutal-shadow-sm bg-card rounded-2xl">
              <Skeleton className="h-4 w-20 mb-3" />
              <Skeleton className="h-8 w-16" />
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-7 w-48 mb-4" />
            {[...Array(3)].map((_, i) => (
              <div key={i} className="p-5 neo-brutal-border neo-brutal-shadow-sm bg-card rounded-2xl">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-xl" />
                  <div className="flex-1">
                    <Skeleton className="h-5 w-40 mb-2" />
                    <Skeleton className="h-3 w-full rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="p-5 neo-brutal-border neo-brutal-shadow-sm bg-card rounded-2xl">
              <Skeleton className="h-6 w-32 mb-4" />
              <div className="grid grid-cols-7 gap-2">
                {[...Array(7)].map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full rounded-lg" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
