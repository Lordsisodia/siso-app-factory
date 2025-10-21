"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Pen, PaintBucket, Home, Ruler, PenTool, Building2, Award, Users, Calendar, CheckCircle, Sparkles, Star, ArrowRight, Zap, TrendingUp, } from "lucide-react";
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
const services = [
    {
        icon: _jsx(Pen, { className: "h-6 w-6" }),
        secondaryIcon: _jsx(Sparkles, { className: "absolute -right-1 -top-1 h-4 w-4 text-[#A9BBC8]" }),
        title: "Interior",
        description: "Transform your living spaces with our expert interior design services. We blend functionality and aesthetics to create spaces that reflect your unique style and personality.",
        position: "left",
    },
    {
        icon: _jsx(Home, { className: "h-6 w-6" }),
        secondaryIcon: _jsx(CheckCircle, { className: "absolute -right-1 -top-1 h-4 w-4 text-[#A9BBC8]" }),
        title: "Exterior",
        description: "Make a lasting impression with stunning exterior designs that enhance curb appeal and create harmonious connections between architecture and landscape.",
        position: "left",
    },
    {
        icon: _jsx(PenTool, { className: "h-6 w-6" }),
        secondaryIcon: _jsx(Star, { className: "absolute -right-1 -top-1 h-4 w-4 text-[#A9BBC8]" }),
        title: "Design",
        description: "Our innovative design process combines creativity with practicality, resulting in spaces that are both beautiful and functional for everyday living.",
        position: "left",
    },
    {
        icon: _jsx(PaintBucket, { className: "h-6 w-6" }),
        secondaryIcon: _jsx(Sparkles, { className: "absolute -right-1 -top-1 h-4 w-4 text-[#A9BBC8]" }),
        title: "Decoration",
        description: "Elevate your space with our curated decoration services. From color schemes to textiles and accessories, we perfect every detail to bring your vision to life.",
        position: "right",
    },
    {
        icon: _jsx(Ruler, { className: "h-6 w-6" }),
        secondaryIcon: _jsx(CheckCircle, { className: "absolute -right-1 -top-1 h-4 w-4 text-[#A9BBC8]" }),
        title: "Planning",
        description: "Our meticulous planning process ensures every project runs smoothly from concept to completion, with careful attention to timelines, budgets, and requirements.",
        position: "right",
    },
    {
        icon: _jsx(Building2, { className: "h-6 w-6" }),
        secondaryIcon: _jsx(Star, { className: "absolute -right-1 -top-1 h-4 w-4 text-[#A9BBC8]" }),
        title: "Execution",
        description: "Watch your dream space come to life through our flawless execution. Our skilled team handles every aspect of implementation with precision and care.",
        position: "right",
    },
];
const stats = [
    { icon: _jsx(Award, { className: "h-6 w-6" }), value: 150, label: "Projects Completed", suffix: "+" },
    { icon: _jsx(Users, { className: "h-6 w-6" }), value: 1200, label: "Happy Clients", suffix: "+" },
    { icon: _jsx(Calendar, { className: "h-6 w-6" }), value: 12, label: "Years Experience", suffix: "" },
    { icon: _jsx(TrendingUp, { className: "h-6 w-6" }), value: 98, label: "Satisfaction Rate", suffix: "%" },
];
function ServiceItem({ icon, secondaryIcon, title, description, variants, delay, direction, }) {
    return (_jsxs(motion.div, { className: "group flex flex-col", variants: variants, transition: { delay }, whileHover: { y: -5, transition: { duration: 0.2 } }, children: [_jsxs(motion.div, { className: "mb-3 flex items-center gap-3", initial: { x: direction === "left" ? -20 : 20, opacity: 0 }, animate: { x: 0, opacity: 1 }, transition: { duration: 0.6, delay: delay + 0.2 }, children: [_jsxs(motion.div, { className: "relative rounded-lg bg-[#88734C]/10 p-3 text-[#88734C] transition-colors duration-300 group-hover:bg-[#88734C]/20", whileHover: { rotate: [0, -10, 10, -5, 0], transition: { duration: 0.5 } }, children: [icon, secondaryIcon] }), _jsx("h3", { className: "text-xl font-medium text-[#202e44] transition-colors duration-300 group-hover:text-[#88734C]", children: title })] }), _jsx(motion.p, { className: "pl-12 text-sm leading-relaxed text-[#202e44]/80", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.6, delay: delay + 0.4 }, children: description }), _jsx(motion.div, { className: "mt-3 flex items-center gap-1 pl-12 text-xs font-medium text-[#88734C] opacity-0 transition-opacity duration-300 group-hover:opacity-100", initial: { opacity: 0 }, animate: { opacity: 0 }, children: _jsxs("span", { className: "flex items-center gap-1", children: ["Learn more ", _jsx(ArrowRight, { className: "h-3 w-3" })] }) })] }));
}
function StatCounter({ icon, value, label, suffix, delay }) {
    const countRef = React.useRef(null);
    const isInView = useInView(countRef, { once: false });
    const [hasAnimated, setHasAnimated] = React.useState(false);
    const springValue = useSpring(0, {
        stiffness: 50,
        damping: 10,
    });
    React.useEffect(() => {
        if (isInView && !hasAnimated) {
            springValue.set(value);
            setHasAnimated(true);
        }
        else if (!isInView && hasAnimated) {
            springValue.set(0);
            setHasAnimated(false);
        }
    }, [hasAnimated, isInView, springValue, value]);
    const displayValue = useTransform(springValue, (latest) => Math.floor(latest));
    return (_jsxs(motion.div, { className: "group flex flex-col items-center rounded-xl bg-white/50 p-6 text-center shadow-sm backdrop-blur-sm transition-colors duration-300 hover:bg-white", variants: {
            hidden: { opacity: 0, y: 20 },
            visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, delay },
            },
        }, whileHover: { y: -5, transition: { duration: 0.2 } }, children: [_jsx(motion.div, { className: "mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#202e44]/5 text-[#88734C] transition-colors duration-300 group-hover:bg-[#88734C]/10", whileHover: { rotate: 360, transition: { duration: 0.8 } }, children: icon }), _jsxs(motion.div, { ref: countRef, className: "flex items-center text-3xl font-bold text-[#202e44]", children: [_jsx(motion.span, { children: displayValue }), _jsx("span", { children: suffix })] }), _jsx("p", { className: "mt-1 text-sm text-[#202e44]/70", children: label }), _jsx(motion.div, { className: "mt-3 h-0.5 w-10 bg-[#88734C] transition-all duration-300 group-hover:w-16" })] }));
}
export function AboutUsSection({ className, ...props }) {
    const sectionRef = React.useRef(null);
    const statsRef = React.useRef(null);
    const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
    const isStatsInView = useInView(statsRef, { once: false, amount: 0.3 });
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
    const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 20]);
    const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -20]);
    const containerVariants = React.useMemo(() => ({
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    }), []);
    const itemVariants = React.useMemo(() => ({
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    }), []);
    return (_jsxs("section", { ref: sectionRef, className: cn("relative w-full overflow-hidden bg-gradient-to-b from-[#F2F2EB] to-[#F8F8F2] px-4 py-24 text-[#202e44]", className), ...props, children: [_jsx(motion.div, { className: "absolute left-10 top-20 h-64 w-64 rounded-full bg-[#88734C]/5 blur-3xl", style: { y: y1, rotate: rotate1 } }), _jsx(motion.div, { className: "absolute bottom-20 right-10 h-80 w-80 rounded-full bg-[#A9BBC8]/5 blur-3xl", style: { y: y2, rotate: rotate2 } }), _jsx(motion.div, { className: "absolute left-1/4 top-1/2 h-4 w-4 rounded-full bg-[#88734C]/30", animate: {
                    y: [0, -15, 0],
                    opacity: [0.5, 1, 0.5],
                }, transition: {
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                } }), _jsx(motion.div, { className: "absolute right-1/4 bottom-1/3 h-6 w-6 rounded-full bg-[#A9BBC8]/30", animate: {
                    y: [0, 20, 0],
                    opacity: [0.5, 1, 0.5],
                }, transition: {
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 1,
                } }), _jsxs(motion.div, { className: "container relative z-10 mx-auto max-w-6xl", initial: "hidden", animate: isInView ? "visible" : "hidden", variants: containerVariants, children: [_jsxs(motion.div, { className: "mb-6 flex flex-col items-center", variants: itemVariants, children: [_jsxs(motion.span, { className: "mb-2 flex items-center gap-2 font-medium text-[#88734C]", initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.2 }, children: [_jsx(Zap, { className: "h-4 w-4" }), "DISCOVER OUR STORY"] }), _jsx("h2", { className: "mb-4 text-center text-4xl font-light md:text-5xl", children: "About Us" }), _jsx(motion.div, { className: "h-1 w-24 bg-[#88734C]", initial: { width: 0 }, animate: { width: 96 }, transition: { duration: 1, delay: 0.5 } })] }), _jsx(motion.p, { className: "mx-auto mb-16 max-w-2xl text-center text-[#202e44]/80", variants: itemVariants, children: "We are a passionate team of designers and architects dedicated to creating beautiful, functional spaces that inspire and elevate everyday living. With attention to detail and commitment to excellence, we transform visions into reality." }), _jsxs("div", { className: "relative grid grid-cols-1 gap-8 md:grid-cols-3", children: [_jsx("div", { className: "space-y-16", children: services
                                    .filter((service) => service.position === "left")
                                    .map((service, index) => (_jsx(ServiceItem, { ...service, variants: itemVariants, delay: index * 0.2, direction: "left" }, `left-${service.title}`))) }), _jsx("div", { className: "order-first mb-8 flex items-center justify-center md:order-none md:mb-0", children: _jsxs(motion.div, { className: "relative w-full max-w-xs", variants: itemVariants, children: [_jsxs(motion.div, { className: "overflow-hidden rounded-md shadow-xl", initial: { scale: 0.9, opacity: 0 }, animate: { scale: 1, opacity: 1 }, transition: { duration: 0.8, delay: 0.3 }, whileHover: { scale: 1.03, transition: { duration: 0.3 } }, children: [_jsx("img", { src: "https://images.unsplash.com/photo-1747582411588-f9b4acabe995?q=80&w=3027&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Modern House", className: "h-full w-full object-cover" }), _jsx(motion.div, { className: "absolute inset-0 flex items-end justify-center bg-gradient-to-t from-[#202e44]/50 to-transparent p-4", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.8, delay: 0.9 }, children: _jsxs(motion.button, { className: "flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-[#202e44]", whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: ["Our Portfolio ", _jsx(ArrowRight, { className: "h-4 w-4" })] }) })] }), _jsx(motion.div, { className: "absolute inset-0 -m-3 -z-10 rounded-md border-4 border-[#A9BBC8]", initial: { opacity: 0, scale: 1.1 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.8, delay: 0.6 } }), _jsx(motion.div, { className: "absolute -right-8 -top-4 h-16 w-16 rounded-full bg-[#88734C]/10", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1, delay: 0.9 }, style: { y: y1 } }), _jsx(motion.div, { className: "absolute -bottom-6 -left-10 h-20 w-20 rounded-full bg-[#A9BBC8]/15", initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1, delay: 1.1 }, style: { y: y2 } }), _jsx(motion.div, { className: "absolute -top-10 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#88734C]", animate: {
                                                y: [0, -10, 0],
                                                opacity: [0.5, 1, 0.5],
                                            }, transition: {
                                                duration: 2,
                                                repeat: Number.POSITIVE_INFINITY,
                                                ease: "easeInOut",
                                            } }), _jsx(motion.div, { className: "absolute -bottom-12 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#A9BBC8]", animate: {
                                                y: [0, 10, 0],
                                                opacity: [0.5, 1, 0.5],
                                            }, transition: {
                                                duration: 2,
                                                repeat: Number.POSITIVE_INFINITY,
                                                ease: "easeInOut",
                                                delay: 0.5,
                                            } })] }) }), _jsx("div", { className: "space-y-16", children: services
                                    .filter((service) => service.position === "right")
                                    .map((service, index) => (_jsx(ServiceItem, { ...service, variants: itemVariants, delay: index * 0.2, direction: "right" }, `right-${service.title}`))) })] }), _jsx(motion.div, { ref: statsRef, className: "mt-24 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4", initial: "hidden", animate: isStatsInView ? "visible" : "hidden", variants: containerVariants, children: stats.map((stat, index) => (_jsx(StatCounter, { ...stat, delay: index * 0.1 }, stat.label))) }), _jsxs(motion.div, { className: "mt-20 flex flex-col items-center justify-between gap-6 rounded-xl bg-[#202e44] p-8 text-white md:flex-row", initial: { opacity: 0, y: 30 }, animate: isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }, transition: { duration: 0.8, delay: 0.5 }, children: [_jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "mb-2 text-2xl font-medium", children: "Ready to transform your space?" }), _jsx("p", { className: "text-white/80", children: "Let's create something beautiful together." })] }), _jsxs(motion.button, { className: "flex items-center gap-2 rounded-lg bg-[#88734C] px-6 py-3 font-medium text-white transition-colors hover:bg-[#88734C]/90", whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: ["Get Started ", _jsx(ArrowRight, { className: "h-4 w-4" })] })] })] })] }));
}
//# sourceMappingURL=component.js.map