import { useState } from "react";

import dayjs from "dayjs";
// import ptBR from "dayjs/locale/pt-BR";
import { CheckCircle2, Plus, Trash2 } from "lucide-react";
import { DialogTrigger } from "@radix-ui/react-dialog";

import { Modal } from "./ui/modal";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { InOrbitIcon } from "./in-orbit-icon";
import { PendingGoals } from "./pending-goals";
import type { GetSummaryResponse } from "../http/get-summary";
import { Progress, ProgressIndicator } from "./ui/progress-bar";

// dayjs.locale(ptBR);

interface WeeklySummaryProps {
 summary: GetSummaryResponse["summary"];
}

export function WeeklySummary({ summary }: WeeklySummaryProps) {
 const fromDate = dayjs().startOf("week").format("D[ de ]MMM");
 const toDate = dayjs().endOf("week").format("D[ de ]MMM");

 const [deleteGoalModal, setDeleteGoalModal] = useState<boolean>(false);

 const openDeleteGoalModal = () => {
  setDeleteGoalModal(true);
 };

 const closeDeleteGoalModal = () => {
  setDeleteGoalModal(false);
 };

 const completedPercentage = Math.round(
  (summary.completed * 100) / summary.total
 );

 return (
  <main className="max-w-[70%] max-h-[80%] py-10 px-5 mx-auto flex flex-col gap-6">
   <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
     <InOrbitIcon />
     <span className="text-4xl font-semibold">
      {fromDate} - {toDate}
     </span>
    </div>

    <DialogTrigger asChild>
     <Button>
      <Plus className="size-4" />
      Enregistrer un objectif
     </Button>
    </DialogTrigger>
   </div>

   <div className="flex flex-col gap-3">
    <Progress value={summary.completed} max={summary.total}>
     <ProgressIndicator style={{ width: `${completedPercentage}%` }} />
    </Progress>

    <div className="flex items-center justify-between text-xl text-zinc-400">
     <span>
      Vous avez complété{" "}
      <span className="text-zinc-100">{summary.completed}</span> sur{" "}
      <span className="text-zinc-100">{summary.total}</span> objectifs cette
      semaine.
     </span>

     <span>{completedPercentage}%</span>
    </div>
   </div>

   <Separator />

   <PendingGoals />

   <div className="space-y-6">
    <h2 className="text-4xl font-medium">Votre semaine</h2>

    {summary.goalsPerDay &&
     Object.entries(summary.goalsPerDay).map(([date, goals]) => {
      const weekDay = dayjs(date).format("dddd");
      const parsedDate = dayjs(date).format("D[ de ]MMM");

      return (
       <div className="space-y-4" key={date}>
        <h3 className="text-2xl capitalize">
         {weekDay}{" "}
         <span className="text-zinc-400 text-2xl">({parsedDate})</span>
        </h3>

        <ul className="space-y-3">
         {goals.map((goal) => {
          const parsedTime = dayjs(goal.createdAt).format("HH:mm[h]");

          return (
           <li className="flex items-center gap-2" key={goal.id}>
            <CheckCircle2 className="size-4 text-pink-500" />
            <span className="text-xl text-zinc-400">
             Vous avez complété "
             <span className="text-zinc-100">{goal.title}</span>" à{" "}
             <span className="text-zinc-100">{parsedTime}</span>
            </span>
            <button onClick={openDeleteGoalModal}>
             <Trash2 className="size-4 text-pink-500" />
            </button>
           </li>
          );
         })}
        </ul>
       </div>
      );
     })}

    <Modal
     isOpen={deleteGoalModal}
     title="Êtes-vous sûr de vouloir supprimer votre objectif ?"
     onConfirm={closeDeleteGoalModal}
     onCancel={closeDeleteGoalModal}
    />
   </div>
  </main>
 );
}
