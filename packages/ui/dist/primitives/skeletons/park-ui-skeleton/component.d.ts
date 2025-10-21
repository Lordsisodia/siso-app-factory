import type { Assign, HTMLArkProps } from '@ark-ui/react';
import { type SkeletonVariantProps } from 'styled-system/recipes';
import type { JsxStyleProps } from 'styled-system/types';
export interface SkeletonProps extends Assign<JsxStyleProps, HTMLArkProps<'div'>>, SkeletonVariantProps {
    /**
     *
     * @default false
     */
    isLoaded?: boolean;
}
export declare const Skeleton: import("react").ForwardRefExoticComponent<SkeletonProps & import("react").RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=component.d.ts.map