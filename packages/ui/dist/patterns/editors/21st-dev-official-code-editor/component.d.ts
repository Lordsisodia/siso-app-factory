import { UseFormReturn } from "react-hook-form";
import { FormData } from "../config/utils";
type EditorFieldName = keyof Pick<FormData, "code" | "tailwind_config" | "globals_css"> | `demos.${number}.demo_code`;
interface EditorStepProps {
    form: UseFormReturn<FormData>;
    isDarkTheme: boolean;
    fieldName: EditorFieldName;
    value: string;
    onChange: (value: string) => void;
    language?: string;
}
export declare function EditorStep({ form, isDarkTheme, fieldName, value, onChange, language, }: EditorStepProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map