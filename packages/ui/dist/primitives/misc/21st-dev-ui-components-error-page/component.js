import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const ErrorPage = ({ error }) => {
    return (_jsxs("div", { className: "flex flex-col items-center justify-center min-h-screen", children: [_jsx("h1", { className: "text-3xl font-bold mb-4", children: "Oops! Something went wrong" }), _jsx("p", { className: "text-xl mb-8 text-muted-foreground", children: "We encountered an error while loading this page." }), _jsx("p", { className: "text-sm text-muted-foreground", children: error.message })] }));
};
export default ErrorPage;
//# sourceMappingURL=component.js.map