import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { LoadingSpinner } from "./loading-spinner";
export function LoadingDialog({ isOpen, message }) {
    return (_jsx(Dialog, { open: isOpen, children: _jsxs(DialogContent, { hideCloseButton: true, className: "w-[425px] h-40 flex flex-col items-center justify-center gap-4", children: [_jsx(LoadingSpinner, {}), _jsx("p", { className: "text-center text-sm text-muted-foreground", children: message })] }) }));
}
//# sourceMappingURL=component.js.map