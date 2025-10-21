import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box } from 'styled-system/jsx';
import { CodePreview } from '~/components/code-preview';
import { highlight } from '~/lib/shiki';
import { LivePreview } from '../live-preview';
export const Pre = async (props) => {
    // @ts-expect-error it exists
    const lang = props.children?.props.className?.replace('language-', '');
    // @ts-expect-error it exists
    const rawCode = props.children?.props.children.toString();
    const hasPreview = rawCode.startsWith('// live');
    const code = rawCode.replace('// live', '').trim();
    const html = await highlight(code, lang);
    return (_jsxs(Box, { borderWidth: "1px", borderRadius: "l3", overflow: "hidden", children: [hasPreview && (_jsx(Box, { p: { base: '4', md: '6' }, borderBottomWidth: "1px", className: "not-prose", children: _jsx(LivePreview, { code: code }) })), _jsx(CodePreview, { html: html, code: code })] }));
};
//# sourceMappingURL=component.js.map