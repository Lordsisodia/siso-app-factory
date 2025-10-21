import { UseFormReturn } from "react-hook-form";
import { SandboxStatus } from "../../../sandbox/hooks/use-sandbox";
import { FormData } from "../../config/utils";
export declare const ComponentForm: ({ form, status, handleSubmit, hotkeysEnabled, isSlugReadOnly, publishAsUserId, showOptionalFields, placeholderName, isFirstStep, }: {
    form: UseFormReturn<FormData>;
    status: SandboxStatus;
    handleSubmit?: (event: React.FormEvent) => void;
    isSubmitting?: boolean;
    hotkeysEnabled?: boolean;
    isSlugReadOnly?: boolean;
    publishAsUserId?: string;
    showOptionalFields?: boolean;
    placeholderName?: string;
    isFirstStep?: boolean;
}) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=component.d.ts.map