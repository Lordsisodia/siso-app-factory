import { type ElementType, type ForwardRefExoticComponent, type PropsWithoutRef, type RefAttributes } from 'react';
type Props = Record<string, unknown>;
type Recipe = {
    (props?: Props): Props;
    splitVariantProps: (props: Props) => [Props, Props];
};
type Slot<R extends Recipe> = keyof ReturnType<R>;
type Options = {
    forwardProps?: string[];
};
export declare const createStyleContext: <R extends Recipe>(recipe: R) => {
    withRootProvider: <P extends {}>(Component: ElementType) => (props: P) => import("react/jsx-runtime").JSX.Element;
    withProvider: <T, P extends {
        className?: string | undefined;
    }>(Component: ElementType, slot: Slot<R>, options?: Options) => ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>;
    withContext: <T, P_1 extends {
        className?: string | undefined;
    }>(Component: ElementType, slot: Slot<R>) => ForwardRefExoticComponent<PropsWithoutRef<P_1> & RefAttributes<T>>;
};
export {};
//# sourceMappingURL=component.d.ts.map