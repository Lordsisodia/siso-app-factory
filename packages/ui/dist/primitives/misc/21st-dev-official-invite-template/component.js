import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Body, Button, Container, Head, Heading, Html, Img, Preview, Section, Text, } from "@react-email/components";
export const InviteEmail = ({ inviteUrl }) => {
    return (_jsxs(Html, { children: [_jsx(Head, {}), _jsx(Preview, { children: "You're off the waitlist - welcome to 21st.dev's Magic beta! \uD83C\uDF89" }), _jsx(Body, { style: main, children: _jsxs(Container, { style: container, children: [_jsx(Img, { src: "https://21st.dev/magic-agent-og-image.png", width: 580, height: 300, alt: "Magic Agent", style: {
                                ...image,
                                display: "block",
                                margin: "0 auto 24px",
                            } }), _jsxs(Section, { style: section, children: [_jsx(Heading, { style: {
                                        ...h1,
                                        padding: "0",
                                    }, children: "Welcome to the future of UI development! \u2728" }), _jsx(Text, { style: text, children: "Your time on the waitlist is over - get ready to experience the magic of AI-powered UI development! \uD83E\uDE84" }), _jsx(Text, { style: text, children: "You are invited to be an early user of 21st.dev's Magic Agent beta. Our product is early, and we're excited to have you help shape its future. Every piece of feedback will make Magic better for everyone." }), _jsx(Button, { style: button, href: inviteUrl, children: "Join the Magic \u2728" }), _jsx(Text, { style: text, children: "We can't wait to see what you'll build with Magic! \uD83D\uDE80" }), _jsxs(Text, { style: footer, children: ["Best wishes,", _jsx("br", {}), "Serafim", _jsx("br", {}), _jsx("span", { style: subtitle, children: "Co-founder of 21st.dev" })] })] })] }) })] }));
};
const main = {
    backgroundColor: "#ffffff",
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};
const container = {
    margin: "0 auto",
    padding: "0 0 48px",
    maxWidth: "580px",
};
const image = {
    borderRadius: "8px",
    marginBottom: "24px",
    width: "100%",
    height: "auto",
};
const section = {
    padding: "32px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
};
const h1 = {
    color: "#111827",
    fontSize: "28px",
    fontWeight: "600",
    lineHeight: "1.3",
    margin: "0 0 24px",
};
const text = {
    color: "#6b7280",
    fontSize: "16px",
    lineHeight: "1.6",
    margin: "0 0 20px",
};
const button = {
    backgroundColor: "#000000",
    borderRadius: "8px",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "500",
    textDecoration: "none",
    textAlign: "center",
    display: "block",
    padding: "12px 24px",
    margin: "32px 0",
    border: "1px solid rgba(0,0,0,0.1)",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
};
const footer = {
    color: "#6b7280",
    fontSize: "14px",
    margin: "32px 0 0",
    lineHeight: "1.6",
};
const subtitle = {
    color: "#6b7280",
    fontSize: "13px",
    fontStyle: "italic",
};
export default InviteEmail;
//# sourceMappingURL=component.js.map