import React from "react";


interface ModalProps {
    modalIsOpen: boolean;
    setModalIsOpen: (isOpen: boolean) => void;
    children: React.ReactNode;
}

export default function CreateModal({ modalIsOpen, setModalIsOpen, children }: ModalProps) {
    if (!modalIsOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="w-1/2 h-3/4 bg-gray-200 p-6 rounded-3xl shadow-lg relative overflow-y-auto">
                {/* Close Button */}
                <button
                    className="absolute top-4 right-4 h-10 w-10 rounded-full font-bold bg-slate-500 text-white"
                    onClick={() => setModalIsOpen(false)}
                >
                    X
                </button>


                <div className="flex-1 flex justify-center items-center">{children}</div>


            </div>
        </div>
    );
}




