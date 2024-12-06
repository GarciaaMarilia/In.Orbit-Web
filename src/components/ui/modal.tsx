import { forwardRef, type ComponentProps } from "react";

type ModalProps = ComponentProps<"div"> & {
 isOpen: boolean;
 title: string;
 onConfirm?: () => void;
 onCancel?: () => void;
};

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
 ({ isOpen, title, onConfirm, onCancel, ...props }, ref) => {
  if (!isOpen) return null;

  return (
   <div
    {...props}
    ref={ref}
    className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
   >
    <div className="bg-black/40 rounded-lg shadow-lg max-w-lg w-full">
     <div className="px-6 py-4">
      <h2 className="text-lg font-semibold">{title}</h2>
     </div>

     <div className=" px-4 py-3 flex justify-end space-x-2">
      <button
       type="button"
       onClick={onCancel}
       className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
      >
       Annuler
      </button>
      <button
       type="button"
       onClick={onConfirm}
       className="px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded hover:bg-pink-700"
      >
       Confirmer
      </button>
     </div>
    </div>
   </div>
  );
 }
);

Modal.displayName = "Modal";
