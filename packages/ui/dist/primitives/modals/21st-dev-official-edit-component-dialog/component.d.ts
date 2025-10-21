import { Component, User, Tag, DemoWithComponent, Demo, DemoWithTags } from "@/types/global";
export declare const isEditingCodeAtom: any;
export declare function EditComponentDialog({ component, demo, isOpen, setIsOpen, onUpdate, }: {
    component: DemoWithComponent | (Component & {
        user: User;
    });
    demo: DemoWithTags;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onUpdate: (_updatedData: Partial<Component>, demoUpdates: Partial<Demo> & {
        demo_tags?: Tag[];
    }) => Promise<void>;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=component.d.ts.map