import { useEffect } from "react";
import { isFormValid } from "../config/utils";
export const useSubmitFormHotkeys = (form, 
// eslint-disable-next-line no-unused-vars
handleSubmit, enabled) => {
    useEffect(() => {
        const keyDownHandler = (e) => {
            const isFormComplete = isFormValid(form);
            if (isFormComplete && enabled) {
                if (e.code === "Enter" && (e.metaKey || e.ctrlKey)) {
                    e.preventDefault();
                    handleSubmit(e);
                }
            }
        };
        if (enabled) {
            window.addEventListener("keydown", keyDownHandler);
        }
        return () => {
            window.removeEventListener("keydown", keyDownHandler);
        };
    }, [form, handleSubmit, enabled]);
};
export const useSuccessDialogHotkeys = ({ isOpen, onAddAnother, onGoToComponent, }) => {
    useEffect(() => {
        const keyDownHandler = (e) => {
            if (isOpen && e.code === "KeyN") {
                e.preventDefault();
                onAddAnother();
            }
            if (isOpen && e.code === "Enter" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                onGoToComponent();
            }
        };
        window.addEventListener("keydown", keyDownHandler);
        return () => {
            window.removeEventListener("keydown", keyDownHandler);
        };
    }, [isOpen, onAddAnother, onGoToComponent]);
};
//# sourceMappingURL=component.js.map