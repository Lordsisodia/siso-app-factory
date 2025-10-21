import { User } from "@/types/global";
import { Dispatch, ReactNode, SetStateAction } from "react";
interface StudioLayoutProps {
    user: User;
    children: ReactNode;
    onCreateSandbox?: () => Promise<void>;
    isCreating?: boolean;
    showCreateDialog?: boolean;
    setShowCreateDialog?: Dispatch<SetStateAction<boolean>>;
}
export declare function StudioLayout({ user, children, onCreateSandbox, isCreating, showCreateDialog, setShowCreateDialog, }: StudioLayoutProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map