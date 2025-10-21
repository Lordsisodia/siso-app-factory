import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { authUsernameOrRedirect } from "@/lib/user";
export default async function Layout({ params, children, }) {
    await authUsernameOrRedirect((await params).username, "/studio");
    return _jsx(_Fragment, { children: children });
}
//# sourceMappingURL=component.js.map