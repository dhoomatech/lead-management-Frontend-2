"use client";

import { ReactNode } from "react";

interface ModalProps {
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  onClose: () => void;
}

export function Modal({ title, children, footer, onClose }: ModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl p-7 w-[480px] max-w-[95vw] shadow-2xl">
        <h3 className="text-lg font-bold text-gray-900 mb-5">{title}</h3>
        {children}
        {footer && <div className="flex justify-end gap-2.5 mt-6">{footer}</div>}
      </div>
    </div>
  );
}
