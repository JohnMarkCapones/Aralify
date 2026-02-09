import { Skeleton } from "@/components/ui/skeleton";

export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-background">
      <section className="border-b-4 border-border bg-card pt-28 pb-12">
        <div className="container mx-auto px-4">
          <Skeleton className="h-6 w-16 mb-4 rounded-full" />
          <Skeleton className="h-12 w-48 mb-3" />
          <Skeleton className="h-5 w-80" />
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="neo-brutal-border neo-brutal-shadow-sm bg-card rounded-2xl overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <div className="p-5">
                <div className="flex gap-2 mb-3">
                  <Skeleton className="h-5 w-16 rounded-full" />
                  <Skeleton className="h-5 w-20 rounded-full" />
                </div>
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-2/3 mb-4" />
                <div className="flex items-center gap-3">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
