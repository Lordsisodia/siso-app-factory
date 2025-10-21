import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Body, Button, Container, Head, Heading, Html, Preview, Section, Text, } from "@react-email/components";
export const SubmissionStatusEmail = ({ componentName, demoName, status, feedback, username, componentUrl, }) => {
    const fullComponentName = demoName
        ? `${componentName}. Demo: ${demoName}`
        : componentName;
    const getStatusData = () => {
        switch (status) {
            case "featured":
                return {
                    title: "Your submission has been featured! 🌟",
                    message: `Congratulations! Your component "${fullComponentName}" has been featured on 21st.dev. This means your work will be showcased to the entire community.`,
                    buttonText: "View Your Featured Component",
                    showShareButton: true,
                };
            case "posted":
                return {
                    title: "Your submission has been approved",
                    message: `Your component "${fullComponentName}" has been published and is available via direct link. However, it's not featured in our public listings yet as it doesn't fully meet our quality guidelines. If you'd like your component to be featured, please review our guidelines and make necessary improvements.`,
                    buttonText: "View Your Component",
                    showShareButton: false,
                };
            case "rejected":
                return {
                    title: "Update on your submission",
                    message: `We've reviewed your component "${fullComponentName}" and unfortunately, we cannot accept it in its current form. Please see the feedback below for more details.`,
                    buttonText: "Submit a New Component",
                    showShareButton: false,
                };
            default:
                return {
                    title: "Update on your submission",
                    message: `We have an update regarding your component "${fullComponentName}" on 21st.dev.`,
                    buttonText: "Check Status",
                    showShareButton: false,
                };
        }
    };
    const statusData = getStatusData();
    const createShareUrl = (url) => {
        const shareText = `Check out my component ${componentName} that was just featured on @21st_dev!`;
        return `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`;
    };
    return (_jsxs(Html, { children: [_jsx(Head, {}), _jsx(Preview, { children: statusData.title }), _jsx(Body, { style: main, children: _jsx(Container, { style: container, children: _jsxs(Section, { style: section, children: [_jsx(Heading, { style: h1, children: statusData.title }), _jsxs(Text, { style: text, children: ["Hello ", username, ","] }), _jsx(Text, { style: text, children: statusData.message }), feedback && (_jsxs(_Fragment, { children: [_jsx(Text, { style: feedbackTitle, children: "Feedback from our team:" }), _jsx(Text, { style: feedbackText, children: feedback })] })), componentUrl && (_jsxs(_Fragment, { children: [_jsx(Button, { style: button, href: componentUrl, children: statusData.buttonText }), statusData.showShareButton && (_jsxs(_Fragment, { children: [_jsx(Text, { style: shareText, children: "Proud of your work? Share it with the community!" }), _jsx(Button, { style: twitterButton, href: createShareUrl(componentUrl), children: "Share on X" })] }))] })), _jsx(Text, { style: text, children: "Thank you for contributing to the 21st.dev community!" }), _jsxs(Text, { style: footer, children: ["Best regards,", _jsx("br", {}), "The 21st.dev Team"] })] }) }) })] }));
};
const main = {
    backgroundColor: "#f9fafb",
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};
const container = {
    margin: "0 auto",
    padding: "24px",
    maxWidth: "580px",
};
const section = {
    padding: "32px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
};
const h1 = {
    color: "#111827",
    fontSize: "24px",
    fontWeight: "600",
    lineHeight: "1.3",
    margin: "0 0 24px",
};
const text = {
    color: "#374151",
    fontSize: "16px",
    lineHeight: "1.6",
    margin: "0 0 20px",
};
const shareText = {
    color: "#4b5563",
    fontSize: "16px",
    lineHeight: "1.4",
    margin: "32px 0 12px",
    textAlign: "center",
    fontWeight: "500",
};
const feedbackTitle = {
    color: "#111827",
    fontSize: "16px",
    fontWeight: "600",
    margin: "24px 0 8px",
};
const feedbackText = {
    color: "#4b5563",
    fontSize: "15px",
    lineHeight: "1.6",
    margin: "0 0 20px",
    padding: "16px",
    backgroundColor: "#f3f4f6",
    borderRadius: "6px",
    borderLeft: "4px solid #d1d5db",
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
    margin: "32px 0 0",
    border: "1px solid rgba(0,0,0,0.1)",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
};
const twitterButton = {
    backgroundColor: "#1DA1F2",
    borderRadius: "8px",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "500",
    textDecoration: "none",
    textAlign: "center",
    display: "block",
    padding: "12px 24px",
    margin: "8px 0 32px",
    border: "1px solid rgba(29,161,242,0.1)",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
};
const footer = {
    color: "#6b7280",
    fontSize: "14px",
    margin: "32px 0 0",
    lineHeight: "1.6",
};
export default SubmissionStatusEmail;
//# sourceMappingURL=component.js.map