import { type HTMLAttributes } from "react";
import { type BadgeProps } from "@/components/1-menu-display/dietary-badges/badge";
export type AnnouncementProps = BadgeProps & {
    themed?: boolean;
};
export declare const Announcement: ({ variant, themed, className, ...props }: AnnouncementProps) => import("react/jsx-runtime").JSX.Element;
export type AnnouncementTagProps = HTMLAttributes<HTMLDivElement>;
export declare const AnnouncementTag: ({ className, ...props }: AnnouncementTagProps) => import("react/jsx-runtime").JSX.Element;
export type AnnouncementTitleProps = HTMLAttributes<HTMLDivElement>;
export declare const AnnouncementTitle: ({ className, ...props }: AnnouncementTitleProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=component.d.ts.map