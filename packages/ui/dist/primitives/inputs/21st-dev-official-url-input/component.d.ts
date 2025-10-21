import { UseFormReturn } from "react-hook-form";
interface UrlFormData {
    url: string;
}
interface UrlInputProps {
    form: UseFormReturn<UrlFormData>;
    isLoading: boolean;
    onFetch: (url: string) => Promise<void>;
}
export declare function UrlInput({ form, isLoading, onFetch }: UrlInputProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map