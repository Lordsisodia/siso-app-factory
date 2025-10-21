import React from "react";
import { User } from "@/types/global";
import { Avatar } from "./avatar";
interface UserAvatarProps extends React.ComponentPropsWithoutRef<typeof Avatar> {
    src?: string | null;
    alt?: string;
    size?: number;
    user?: User;
    isClickable?: boolean;
    className?: string;
    skipLink?: boolean;
}
export declare function UserAvatar({ src, alt, size, user, isClickable, className, skipLink, ...props }: UserAvatarProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map