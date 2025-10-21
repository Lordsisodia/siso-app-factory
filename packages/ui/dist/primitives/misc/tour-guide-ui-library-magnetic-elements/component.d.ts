interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    variant?: "primary" | "secondary" | "outline";
    size?: "sm" | "md" | "lg";
    onClick?: () => void;
    href?: string;
}
export declare function MagneticButton({ children, className, variant, size, onClick, href }: MagneticButtonProps): import("react/jsx-runtime").JSX.Element;
interface FloatingActionBubbleProps {
    icon: React.ReactNode;
    tooltip: string;
    onClick: () => void;
    position: {
        bottom: number;
        right: number;
    };
    delay?: number;
}
export declare function FloatingActionBubble({ icon, tooltip, onClick, position, delay }: FloatingActionBubbleProps): import("react/jsx-runtime").JSX.Element;
interface ProgressCelebrationProps {
    progress: number;
    total: number;
    title: string;
    onComplete?: () => void;
}
export declare function ProgressCelebration({ progress, total, title, onComplete }: ProgressCelebrationProps): import("react/jsx-runtime").JSX.Element;
interface SmartHoverCardProps {
    children: React.ReactNode;
    previewContent: React.ReactNode;
    className?: string;
}
export declare function SmartHoverCard({ children, previewContent, className }: SmartHoverCardProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map