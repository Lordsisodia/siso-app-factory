import { UseFormReturn } from "react-hook-form";
import type { TemplateFormData } from "./schema";
interface TemplateDetailsFormProps {
    form: UseFormReturn<TemplateFormData>;
    onNameChange: (name: string) => void;
}
export declare function TemplateDetailsForm({ form, onNameChange, }: TemplateDetailsFormProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map