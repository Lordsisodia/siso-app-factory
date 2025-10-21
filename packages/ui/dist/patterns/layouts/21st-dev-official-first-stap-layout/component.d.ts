import { UseFormReturn } from "react-hook-form";
import { FormData } from "../config/utils";
interface NameSlugStepProps {
    form: UseFormReturn<FormData>;
    isAdmin: boolean;
    publishAsUsername: string | undefined;
    publishAsUser: {
        id: string;
    } | null | undefined;
    onContinue: () => void;
    onPublishAsChange: (username: string) => void;
}
export declare function NameSlugStep({ form, isAdmin, publishAsUsername, publishAsUser, onContinue, onPublishAsChange, }: NameSlugStepProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map