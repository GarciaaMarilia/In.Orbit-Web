import { Loader2 } from "lucide-react";
import { Dialog } from "@radix-ui/react-dialog";
import { useQuery } from "@tanstack/react-query";

import { getSummary } from "./http/get-summary";
import { CreateGoal } from "./components/create-goal";
import { EmptyGoals } from "./components/empty-goals";
import { WeeklySummary } from "./components/weekly-summary";

export function App() {
 const { data, isLoading } = useQuery({
  queryKey: ["summary"],
  queryFn: getSummary,
 });

 if (isLoading || !data) {
  return (
   <div className="h-screen flex items-center justify-center">
    <Loader2 className="text-zinc-500 animate-spin size-10" />
   </div>
  );
 }

console.log(data.summary)
 return (
  <Dialog>
   {data && data.summary?.total > 0 ? (
    <WeeklySummary summary={data.summary} />
   ) : (
    <EmptyGoals />
   )}

   <CreateGoal />
  </Dialog>
 );
}
