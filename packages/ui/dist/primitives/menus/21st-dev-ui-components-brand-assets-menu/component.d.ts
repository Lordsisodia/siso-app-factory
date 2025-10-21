import React from "react";
interface BrandAssetsMenuProps {
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
}
export declare function BrandAssetsMenu({ isVisible, setIsVisible, }: BrandAssetsMenuProps): import("react/jsx-runtime").JSX.Element | null;
export declare const useBrandAssetsMenu: () => {
    isVisible: boolean;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    toggleMenu: (e: React.MouseEvent) => void;
};
export {};
//# sourceMappingURL=component.d.ts.map