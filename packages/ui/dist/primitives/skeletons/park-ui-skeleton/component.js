'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { ark } from '@ark-ui/react/factory';
import { forwardRef } from 'react';
import { styled } from 'styled-system/jsx';
import { skeleton } from 'styled-system/recipes';
const StyledSkeleton = styled(ark.div, skeleton);
export const Skeleton = forwardRef((props, ref) => {
    const { isLoaded, ...otherProps } = props;
    if (isLoaded) {
        return _jsx(styled.div, { animation: "fade-in", ref: ref, ...otherProps });
    }
    return _jsx(StyledSkeleton, { ref: ref, ...otherProps });
});
Skeleton.displayName = 'Skeleton';
//# sourceMappingURL=component.js.map