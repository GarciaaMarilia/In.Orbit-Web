import { z } from "zod";
import { toast } from "sonner";
import { X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";

import {
 RadioGroup,
 RadioGroupIndicator,
 RadioGroupItem,
} from "./ui/radio-group";
import {
 DialogClose,
 DialogContent,
 DialogDescription,
 DialogTitle,
} from "./ui/dialog";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { createGoal } from "../http/create-goal";

const createGoalSchema = z.object({
 title: z.string().min(1, "Indiquez l'activité que vous souhaitez pratiquer"),
 desiredWeeklyFrequency: z.coerce.number().min(1).max(7),
});

type CreateGoalSchema = z.infer<typeof createGoalSchema>;

export function CreateGoal() {
 const emojis = ["😕", "😐", "🙂", "😊", "😀", "😃", "😁"];
 const queryClient = useQueryClient();

 const {
  register,
  handleSubmit,
  formState: { errors },
  control,
  reset,
 } = useForm<CreateGoalSchema>({
  resolver: zodResolver(createGoalSchema),
 });

 async function handleCreateGoal({
  title,
  desiredWeeklyFrequency,
 }: CreateGoalSchema) {
  try {
   await createGoal({
    title,
    desiredWeeklyFrequency,
   });

   reset();

   queryClient.invalidateQueries({ queryKey: ["pending-goals"] });
   queryClient.invalidateQueries({ queryKey: ["summary"] });

   toast.success("Objectif créé avec succès !");
  } catch {
   toast.error(
    "Erreur lors de la création de l'objectif, veuillez réessayer !"
   );
  }
 }

 return (
  <DialogContent>
   <div className="flex flex-col gap-6 h-full">
    <div className="space-y-3">
     <div className="flex items-center justify-between">
      <DialogTitle>Enregistrer un objectif</DialogTitle>

      <DialogClose>
       <X className="size-5 text-zinc-600" />
      </DialogClose>
     </div>

     <DialogDescription>
      Ajoutez des activités qui vous font du bien et que vous souhaitez
      continuer à pratiquer chaque semaine."
     </DialogDescription>
    </div>

    <form
     onSubmit={handleSubmit(handleCreateGoal)}
     className="flex-1 flex flex-col justify-between"
    >
     <div className="space-y-6">
      <div className="flex flex-col gap-2">
       <Label htmlFor="title">Quelle est l'activité ?</Label>

       <Input
        id="title"
        autoFocus
        placeholder="Faire de l'exercice, méditer, etc..."
        {...register("title")}
       />

       {errors.title && (
        <p className="text-sm text-red-400">{errors.title.message}</p>
       )}
      </div>

      <div className="flex flex-col gap-2">
       <Label htmlFor="desiredWeeklyFrequency">Combien de fois par semaine ?</Label>

       <Controller
        control={control}
        name="desiredWeeklyFrequency"
        defaultValue={5}
        render={({ field }) => {
         return (
          <RadioGroup
           value={String(field.value)}
           onValueChange={field.onChange}
          >
           {Array.from({ length: 7 }).map((_, i) => {
            const frequency = String(i + 1);

            return (
             <RadioGroupItem key={frequency} value={frequency}>
              <RadioGroupIndicator />
              <span className="text-zinc-300 text-sm font-medium leading-none">
               {frequency}x par semaine
              </span>
              <span className="text-lg leading-none">{emojis[i]} </span>
             </RadioGroupItem>
            );
           })}
          </RadioGroup>
         );
        }}
       />
      </div>
     </div>

     <div className="flex items-center gap-3 mt-auto">
      <DialogClose asChild>
       <Button variant="secondary" className="flex-1">
        Fermer
       </Button>
      </DialogClose>

      <Button type="submit" className="flex-1">
       Enregistrer
      </Button>
     </div>
    </form>
   </div>
  </DialogContent>
 );
}
