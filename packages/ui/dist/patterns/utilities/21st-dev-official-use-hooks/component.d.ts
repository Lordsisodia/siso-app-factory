import { UseFormReturn } from "react-hook-form";
import { FormData } from "../config/utils";
export declare const useSubmitFormHotkeys: (form: UseFormReturn<FormData>, handleSubmit: (event: React.FormEvent) => void, enabled: boolean) => void;
export declare const useSuccessDialogHotkeys: ({ isOpen, onAddAnother, onGoToComponent, }: {
    isOpen: boolean;
    onAddAnother: () => void;
    onGoToComponent: () => void;
}) => void;
//# sourceMappingURL=component.d.ts.map