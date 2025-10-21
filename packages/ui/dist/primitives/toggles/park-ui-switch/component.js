import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import * as StyledSwitch from './styled/switch';
export const Switch = forwardRef((props, ref) => {
    const { children, ...rootProps } = props;
    return (_jsxs(StyledSwitch.Root, { ref: ref, ...rootProps, children: [_jsx(StyledSwitch.Control, { children: _jsx(StyledSwitch.Thumb, {}) }), children && _jsx(StyledSwitch.Label, { children: children }), _jsx(StyledSwitch.HiddenInput, {})] }));
});
Switch.displayName = 'Switch';
//# sourceMappingURL=component.js.map