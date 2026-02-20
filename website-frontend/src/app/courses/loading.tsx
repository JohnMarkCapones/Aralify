import { Skeleton } from "@/components/ui/skeleton";

export default function CoursesLoading() {
  return (
    <div className="min-h-screen bg-background">
      <section className="border-b-4 border-border bg-card pt-28 pb-12">
        <div className="container mx-auto px-4">
          <Skeleton className="h-6 w-24 mb-4 rounded-full" />
          <Skeleton className="h-12 w-64 mb-3" />
          <Skeleton className="h-5 w-96" />
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Filter bar */}
        <div className="flex gap-3 mb-8">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-28 rounded-xl" />
          ))}
        </div>

        {/* Course grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="neo-brutal-border neo-brutal-shadow-sm bg-card rounded-2xl overflow-hidden">
              <Skeleton className="h-40 w-full" />
              <div className="p-5">
                <Skeleton className="h-4 w-20 mb-3 rounded-full" />
                <Skeleton className="h-6 w-48 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-3/4 mb-4" />
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
