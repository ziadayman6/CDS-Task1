import { type ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  title?: string;
  children?: ReactNode;
  onClose: () => void;
  onConfirm: () => void;
}

function Modal({ isOpen, title, children, onClose, onConfirm }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 ">
      <div className="bg-white dark:bg-[#1a273b] rounded-lg shadow-lg p-6 w-[90%] max-w-md border-b-yellow-500 dark:border-b-yellow-600 border-b-4">
        {title && (
          <h2 className="text-lg dark:text-white font-bold mb-4">{title}</h2>
        )}
        <div className="mb-6 dark:text-white">{children}</div>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border-[1px] cursor-pointer border-yellow-500 dark:border-yellow-600 text-yellow-500 dark:text-yellow-600 hover:text-white hover:bg-yellow-500 dark:hover:bg-yellow-600"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-500 text-white dark:bg-red-800 cursor-pointer"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
