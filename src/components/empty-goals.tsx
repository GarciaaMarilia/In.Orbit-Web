import { Plus } from "lucide-react";
import { DialogTrigger } from "@radix-ui/react-dialog";

import { Button } from "./ui/button";
import logo from "../assets/in-orbit-logo.svg";
import rocketLaunchIllustration from "../assets/rocket-launch-illustration.svg";

export function EmptyGoals() {
 return (
  <main className="h-screen flex flex-col items-center justify-center gap-8">
   <img src={logo} alt="in.orbit" />

   <img
    src={rocketLaunchIllustration}
    alt="Illustration d'une femme contrôlant le lancement d'une fusée à l'aide d'une télécommande"
   />

   <p className="text-zinc-300 leading-relaxed max-w-80 text-center">
    Vous n'avez encore enregistré aucun objectif, pourquoi ne pas en ajouter un
    dès maintenant ?
   </p>

   <DialogTrigger asChild>
    <Button>
     <Plus className="size-4" />
     Enregistrer un objectif
    </Button>
   </DialogTrigger>
  </main>
 );
}
