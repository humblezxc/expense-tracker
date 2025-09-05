import * as Dialog from "@radix-ui/react-dialog";
import React from "react";
import Button from "./Button";

interface IModal {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}

export default function Modal({open, onClose, title, children,}: IModal) {
    return (
        <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-40 bg-black/30 dark:bg-black/70 backdrop-blur-sm" />
                <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[680px] max-w-[95vw] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white dark:bg-grey dark:text-white p-6 shadow-2xl focus:outline-none">
                    <div className="mb-4 flex items-center justify-between">
                        {title ? <Dialog.Title className="text-lg font-semibold">{title}</Dialog.Title> : <div />}
                        <Dialog.Close asChild>
                            <Button variant="outline" className="px-2 py-1">Close</Button>
                        </Dialog.Close>
                    </div>
                    {children}
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
