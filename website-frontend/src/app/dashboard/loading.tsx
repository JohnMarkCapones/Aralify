import { StackingLoader } from "@/components/ui/stacking-loader";

export default function DashboardLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <StackingLoader text="Loading your dashboard..." />
    </div>
  );
}
