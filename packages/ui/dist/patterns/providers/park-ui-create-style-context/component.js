import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, forwardRef, useContext, } from 'react';
import { cx } from 'styled-system/css';
import { isCssProperty, styled } from 'styled-system/jsx';
const shouldForwardProp = (prop, variantKeys, options = {}) => options.forwardProps?.includes(prop) || (!variantKeys.includes(prop) && !isCssProperty(prop));
export const createStyleContext = (recipe) => {
    const StyleContext = createContext(null);
    const withRootProvider = (Component) => {
        const StyledComponent = (props) => {
            const [variantProps, otherProps] = recipe.splitVariantProps(props);
            const slotStyles = recipe(variantProps);
            return (_jsx(StyleContext.Provider, { value: slotStyles, children: _jsx(Component, { ...otherProps }) }));
        };
        return StyledComponent;
    };
    const withProvider = (Component, slot, options) => {
        const StyledComponent = styled(Component, {}, {
            shouldForwardProp: (prop, variantKeys) => shouldForwardProp(prop, variantKeys, options),
        });
        const StyledSlotProvider = forwardRef((props, ref) => {
            const [variantProps, otherProps] = recipe.splitVariantProps(props);
            const slotStyles = recipe(variantProps);
            return (_jsx(StyleContext.Provider, { value: slotStyles, children: _jsx(StyledComponent, { ...otherProps, ref: ref, className: cx(slotStyles?.[slot], props.className) }) }));
        });
        // @ts-expect-error
        StyledSlotProvider.displayName = Component.displayName || Component.name;
        return StyledSlotProvider;
    };
    const withContext = (Component, slot) => {
        const StyledComponent = styled(Component);
        const StyledSlotComponent = forwardRef((props, ref) => {
            const slotStyles = useContext(StyleContext);
            return (_jsx(StyledComponent, { ...props, ref: ref, className: cx(slotStyles?.[slot], props.className) }));
        });
        // @ts-expect-error
        StyledSlotComponent.displayName = Component.displayName || Component.name;
        return StyledSlotComponent;
    };
    return {
        withRootProvider,
        withProvider,
        withContext,
    };
};
//# sourceMappingURL=component.js.map