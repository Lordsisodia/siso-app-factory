interface EditProfileDialogProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    user: {
        name: string;
        username: string;
        image_url: string;
        display_name?: string | null;
        display_username?: string | null;
        display_image_url?: string | null;
        bio?: string | null;
        website_url?: string | null;
        github_url?: string | null;
        twitter_url?: string | null;
    };
    onUpdate: () => void;
}
export declare function EditProfileDialog({ isOpen, setIsOpen, user, onUpdate, }: EditProfileDialogProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map