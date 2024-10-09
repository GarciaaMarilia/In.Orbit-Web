import { Plus, Trash } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { ConfirmModal } from "./confirm-modal";
import { deleteGoal } from "../http/delete-goal";
import { OutlineButton } from "./ui/outline-button";
import { getPendingGoals } from "../http/get-pending-goals";
import { createGoalCompletion } from "../http/create-goal-completion";

export function PendingGoals() {
 const queryClient = useQueryClient();
 const { data, isLoading } = useQuery({
  queryKey: ["pending-goals"],
  queryFn: getPendingGoals,
 });

 if (isLoading || !data) {
  return null;
 }

 async function handleCreateGoalCompletion(goalId: string) {
  await createGoalCompletion({ goalId });
  queryClient.invalidateQueries({ queryKey: ["pending-goals"] });
  queryClient.invalidateQueries({ queryKey: ["summary"] });
 }

 async function handleDelete(goalId: string) {
  await deleteGoal({ goalId });
  queryClient.invalidateQueries({ queryKey: ["pending-goals"] });
  queryClient.invalidateQueries({ queryKey: ["summary"] });
 }

 return (
  <div className="flex flex-wrap gap-3">
   {data.pendingGoals.map((goal) => (
    <div key={goal.id} className="flex items-center gap-2">
     <OutlineButton
      onClick={() => handleCreateGoalCompletion(goal.id)}
      disabled={goal.completionCount >= goal.desiredWeeklyFrequency}
     >
      <Plus className="size-4 text-zinc-600" />
      {goal.title}
     </OutlineButton>

     {/* Trigger para abrir o modal de confirmação */}
     <DialogPrimitive.Root>
      <DialogPrimitive.Trigger asChild>
       <Trash className="size-4 text-white cursor-pointer" />
      </DialogPrimitive.Trigger>

      {/* O modal de confirmação */}
      <ConfirmModal onConfirm={() => handleDelete(goal.id)} />
     </DialogPrimitive.Root>
    </div>
   ))}
  </div>
 );
}
