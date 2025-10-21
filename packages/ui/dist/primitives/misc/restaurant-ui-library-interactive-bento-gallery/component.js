"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
const MediaPreview = ({ item, className, onClick }) => {
    const videoRef = useRef(null);
    const [isInView, setIsInView] = useState(false);
    const [isBuffering, setIsBuffering] = useState(item.type === "video");
    useEffect(() => {
        if (item.type !== "video")
            return;
        const node = videoRef.current;
        if (!node)
            return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => setIsInView(entry.isIntersecting));
        }, { root: null, rootMargin: "50px", threshold: 0.1 });
        observer.observe(node);
        return () => observer.disconnect();
    }, [item.type]);
    useEffect(() => {
        const node = videoRef.current;
        if (!node || item.type !== "video")
            return;
        let mounted = true;
        const playVideo = async () => {
            if (!mounted || !isInView)
                return;
            try {
                if (node.readyState >= 3) {
                    setIsBuffering(false);
                    await node.play();
                }
                else {
                    setIsBuffering(true);
                    await new Promise((resolve) => {
                        const handle = () => {
                            node.removeEventListener("canplay", handle);
                            resolve();
                        };
                        node.addEventListener("canplay", handle);
                    });
                    if (mounted) {
                        setIsBuffering(false);
                        await node.play();
                    }
                }
            }
            catch (error) {
                console.warn("Video playback failed", error);
            }
        };
        if (isInView) {
            void playVideo();
        }
        else {
            node.pause();
        }
        return () => {
            mounted = false;
            node.pause();
            node.removeAttribute("src");
            node.load();
        };
    }, [isInView, item.type]);
    if (item.type === "video") {
        return (_jsxs("div", { className: cn("relative overflow-hidden", className), children: [_jsx("video", { ref: videoRef, className: "h-full w-full object-cover", playsInline: true, muted: true, loop: true, preload: "auto", onClick: onClick, style: { opacity: isBuffering ? 0.8 : 1, transition: "opacity 0.2s" }, children: _jsx("source", { src: item.url, type: "video/mp4" }) }), isBuffering && (_jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/15", children: _jsx("div", { className: "h-6 w-6 animate-spin rounded-full border-2 border-white/50 border-t-white" }) }))] }));
    }
    return (_jsx("img", { src: item.url, alt: item.title, className: cn("h-full w-full cursor-pointer object-cover", className), loading: "lazy", decoding: "async", onClick: onClick }));
};
const GalleryModal = ({ selectedItem, isOpen, onClose, setSelectedItem, mediaItems }) => {
    const [dockPosition, setDockPosition] = useState({ x: 0, y: 0 });
    if (!isOpen)
        return null;
    return (_jsxs(_Fragment, { children: [_jsxs(motion.div, { initial: { scale: 0.98 }, animate: { scale: 1 }, exit: { scale: 0.98 }, transition: { type: "spring", stiffness: 400, damping: 30 }, className: "fixed inset-0 z-50 h-full w-full rounded-none bg-black/40 backdrop-blur-lg sm:h-[90vh] md:h-[600px] md:rounded-xl", children: [_jsx("div", { className: "flex h-full flex-col", children: _jsx("div", { className: "flex-1 bg-gray-50/50 p-3 sm:p-4", children: _jsx(AnimatePresence, { mode: "wait", children: _jsxs(motion.div, { className: "relative mx-auto flex aspect-video h-auto max-h-[70vh] w-full max-w-[90%] overflow-hidden rounded-xl bg-gray-900/20 shadow-xl sm:max-w-[85%] md:max-w-3xl", initial: { y: 20, scale: 0.97, opacity: 0 }, animate: { y: 0, scale: 1, opacity: 1, transition: { type: "spring", stiffness: 500, damping: 30 } }, exit: { y: 20, scale: 0.97, opacity: 0, transition: { duration: 0.15 } }, children: [_jsx(MediaPreview, { item: selectedItem, className: "h-full w-full" }), _jsxs("div", { className: "absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 via-black/20 to-transparent p-4 text-white", children: [_jsx("h3", { className: "text-lg font-semibold md:text-xl", children: selectedItem.title }), _jsx("p", { className: "mt-1 text-sm text-white/80", children: selectedItem.desc })] })] }, selectedItem.id) }) }) }), _jsx(motion.button, { type: "button", className: "absolute right-3 top-3 rounded-full bg-white/80 p-2 text-gray-700 backdrop-blur hover:bg-white", onClick: onClose, whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: _jsx(X, { className: "h-4 w-4" }) })] }), _jsx(motion.div, { drag: true, dragMomentum: false, dragElastic: 0.1, initial: false, animate: { x: dockPosition.x, y: dockPosition.y }, onDragEnd: (_, info) => setDockPosition((prev) => ({ x: prev.x + info.offset.x, y: prev.y + info.offset.y })), className: "fixed bottom-4 left-1/2 z-[60] -translate-x-1/2 touch-none", children: _jsx(motion.div, { className: "cursor-grab rounded-xl border border-blue-400/30 bg-sky-400/20 px-3 py-2 shadow-lg backdrop-blur active:cursor-grabbing", children: _jsx("div", { className: "-space-x-2 flex items-center", children: mediaItems.map((item, index) => (_jsxs(motion.button, { type: "button", onClick: (event) => {
                                event.stopPropagation();
                                setSelectedItem(item);
                            }, style: { zIndex: selectedItem.id === item.id ? 30 : mediaItems.length - index }, className: cn("relative h-10 w-10 overflow-hidden rounded-lg", selectedItem.id === item.id ? "ring-2 ring-white shadow-lg" : "hover:ring-2 hover:ring-white/40"), initial: { rotate: index % 2 === 0 ? -12 : 12 }, animate: {
                                scale: selectedItem.id === item.id ? 1.2 : 1,
                                rotate: selectedItem.id === item.id ? 0 : index % 2 === 0 ? -12 : 12,
                                y: selectedItem.id === item.id ? -8 : 0,
                            }, whileHover: { scale: 1.2, rotate: 0, y: -10 }, children: [_jsx(MediaPreview, { item: item, className: "h-full w-full" }), selectedItem.id === item.id && (_jsx(motion.div, { layoutId: "activeGlow", className: "absolute -inset-2 bg-white/30 blur-lg", initial: { opacity: 0 }, animate: { opacity: 1 } }))] }, item.id))) }) }) })] }));
};
export function InteractiveBentoGallery({ mediaItems, title, description }) {
    const [selectedItem, setSelectedItem] = useState(null);
    const [items, setItems] = useState(mediaItems);
    const [isDragging, setIsDragging] = useState(false);
    return (_jsxs("div", { className: "mx-auto max-w-4xl space-y-6 px-4 py-8", children: [_jsxs("div", { className: "text-center", children: [_jsx(motion.h2, { className: "text-3xl font-bold tracking-tight text-foreground md:text-4xl", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, children: title }), _jsx(motion.p, { className: "mt-2 text-base text-muted-foreground", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 }, children: description })] }), _jsx(AnimatePresence, { mode: "wait", children: selectedItem ? (_jsx(GalleryModal, { selectedItem: selectedItem, isOpen: true, onClose: () => setSelectedItem(null), setSelectedItem: setSelectedItem, mediaItems: items })) : (_jsx(motion.div, { className: "grid auto-rows-[60px] grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-4", initial: "hidden", animate: "visible", exit: "hidden", variants: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }, children: items.map((item, index) => (_jsxs(motion.div, { layoutId: `media-${item.id}`, className: cn("relative cursor-move overflow-hidden rounded-xl", item.span), onClick: () => !isDragging && setSelectedItem(item), variants: {
                            hidden: { y: 40, scale: 0.95, opacity: 0 },
                            visible: {
                                y: 0,
                                scale: 1,
                                opacity: 1,
                                transition: { type: "spring", stiffness: 320, damping: 30, delay: index * 0.05 },
                            },
                        }, whileHover: { scale: 1.02 }, drag: true, dragConstraints: { left: 0, right: 0, top: 0, bottom: 0 }, dragElastic: 1, onDragStart: () => setIsDragging(true), onDragEnd: (_, info) => {
                            setIsDragging(false);
                            const moveDistance = info.offset.x + info.offset.y;
                            if (Math.abs(moveDistance) > 50) {
                                const updated = [...items];
                                const [removed] = updated.splice(index, 1);
                                const targetIndex = moveDistance > 0 ? Math.min(index + 1, items.length - 1) : Math.max(index - 1, 0);
                                updated.splice(targetIndex, 0, removed);
                                setItems(updated);
                            }
                        }, children: [_jsx(MediaPreview, { item: item, className: "absolute inset-0", onClick: () => !isDragging && setSelectedItem(item) }), _jsxs(motion.div, { className: "absolute inset-0 flex flex-col justify-end p-3", initial: { opacity: 0 }, whileHover: { opacity: 1 }, children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" }), _jsxs("div", { className: "relative", children: [_jsx("h3", { className: "text-sm font-medium text-white lg:text-base", children: item.title }), _jsx("p", { className: "mt-1 text-xs text-white/70 lg:text-sm", children: item.desc })] })] })] }, item.id))) })) })] }));
}
export default InteractiveBentoGallery;
//# sourceMappingURL=component.js.map