import { UseFormReturn } from "react-hook-form";
import { FormData } from "@/components/features/publish/config/utils";
interface ImportFormProps {
    form: UseFormReturn<FormData>;
    isDarkTheme: boolean;
    currentDemoIndex: number;
    previewKey: string;
    shouldBlurPreview: boolean;
    onRestartPreview: () => void;
    onDemoCodeChange: (value: string) => void;
    formStep: "detailedForm" | "demoCode";
    onEditDemoCode: () => void;
    onSaveDemoCode: () => void;
}
export declare function ImportForm({ form, isDarkTheme, currentDemoIndex, previewKey, shouldBlurPreview, onRestartPreview, onDemoCodeChange, formStep, onEditDemoCode, onSaveDemoCode, }: ImportFormProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map