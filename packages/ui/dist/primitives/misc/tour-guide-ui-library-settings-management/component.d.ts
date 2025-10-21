interface Setting {
    id: string;
    category: string;
    name: string;
    value: string;
    type: "text" | "number" | "boolean" | "password" | "file";
    description: string;
    lastModified: string;
    modifiedBy: string;
}
interface SettingsManagementProps {
    initialData: Setting[];
}
export default function SettingsManagement({ initialData }: SettingsManagementProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map