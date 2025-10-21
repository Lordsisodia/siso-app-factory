import { UseFormReturn } from "react-hook-form";
import { FormData } from "../../config/utils";
interface NameSlugFormProps {
    form: UseFormReturn<FormData>;
    publishAsUserId?: string;
    isSlugReadOnly: boolean;
    placeholderName: string;
}
export declare function NameSlugForm({ form, publishAsUserId, isSlugReadOnly, placeholderName, }: NameSlugFormProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map