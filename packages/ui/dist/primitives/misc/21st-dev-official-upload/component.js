import { jsx as _jsx } from "react/jsx-runtime";
import { useTheme } from "next-themes";
import Image from "next/image";
import { cn } from "@/lib/utils";
const UploadIcon = ({ className }) => {
    const { resolvedTheme } = useTheme();
    return (_jsx("div", { className: "w-full flex justify-center", children: _jsx(Image, { src: resolvedTheme === "dark"
                ? "/upload-icon-dark.png"
                : "/upload-icon.png", alt: "Upload Icon", width: 40, height: 40, className: cn(className) }) }));
};
export default UploadIcon;
//# sourceMappingURL=component.js.map