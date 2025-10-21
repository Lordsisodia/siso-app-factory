import { BundleExpanded } from "@/lib/api/bundles";
import { users } from "@/prisma/client";
interface BundleSliderProps {
    user: users;
    bundle: BundleExpanded;
    hideStatus?: boolean;
}
export declare function BundleItem({ user, bundle, hideStatus, }: BundleSliderProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map