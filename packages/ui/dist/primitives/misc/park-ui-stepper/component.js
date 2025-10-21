import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Circle, Stack } from 'styled-system/jsx';
import { Heading } from './styled/heading';
export const Steps = (props) => {
    return (_jsxs(Stack, { gap: "8", position: "relative", children: [_jsx(Box, { width: "1px", height: "full", bg: "border.subtle", position: "absolute", left: "4", top: "0" }), props.children] }));
};
export const Step = (props) => {
    const { number, title, children } = props;
    return (_jsxs(Box, { children: [_jsxs(Stack, { direction: "row", gap: "4", children: [_jsx(Circle, { size: "8", color: "fg.default", bg: "bg.default", borderWidth: "1px", zIndex: "1", boxShadow: "0 0 0 12px var(--colors-bg-surface)", fontWeight: "semibold", children: number }), _jsx(Heading, { as: "h3", my: "0!", children: title })] }), _jsx(Box, { ps: "12", css: { '&> :last-child': { mb: '0' } }, children: children })] }));
};
//# sourceMappingURL=component.js.map