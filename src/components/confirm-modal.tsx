import {
 DialogContent,
 DialogDescription,
 DialogTitle,
 DialogOverlay,
 DialogPortal,
 DialogClose,
} from "@radix-ui/react-dialog";

interface ConfirmModalRequest {
 onConfirm: () => void;
}

export function ConfirmModal({ onConfirm }: ConfirmModalRequest) {
 return (
  <DialogPortal>
   {/* O Overlay desbotado */}
   <DialogOverlay className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" />

   {/* Conteúdo centralizado */}
   <DialogContent className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] border border-zinc-900 bg-zinc-950 p-8 rounded-lg shadow-lg z-50">
    <DialogTitle className="text-2xl font-semibold">
     Confirmar exclusão
    </DialogTitle>
    <DialogDescription className="text-zinc-400 text-lg leading-relaxed">
     Você tem certeza que deseja excluir essa meta? Essa ação não pode ser
     desfeita.
    </DialogDescription>
    <div className="flex justify-end gap-4 mt-4">
     <DialogClose>
      <button type="button" className="text-gray-500">
       Cancelar
      </button>
     </DialogClose>
     <button type="button" onClick={onConfirm} className="text-red-500">
      Excluir
     </button>
    </div>
   </DialogContent>
  </DialogPortal>
 );
}
