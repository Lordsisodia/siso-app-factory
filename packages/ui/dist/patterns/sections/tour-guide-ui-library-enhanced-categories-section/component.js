"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { categoriesData } from "../_data/categories-data";
import EnhancedCategoryCard from "./enhanced-category-card";
import { getActivitiesSupabaseAction } from "@/actions/db/activities-actions";
function AnimatedSection({ children, className = "", delay = 0 }) {
    return (_jsx(motion.div, { initial: { opacity: 0, y: 50 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-100px" }, transition: { duration: 0.8, delay }, className: className, children: children }));
}
export default function EnhancedCategoriesSection() {
    const [categoriesWithCounts, setCategoriesWithCounts] = useState(categoriesData.map(cat => ({
        ...cat,
        activityCount: Math.floor(Math.random() * 15) + 5 // Start with fallback data
    })));
    const [isUpdating, setIsUpdating] = useState(false);
    useEffect(() => {
        async function fetchActivityCounts() {
            setIsUpdating(true);
            try {
                console.log("🔄 Starting to fetch activity counts for categories...");
                // First, let's test if we can get ANY activities at all
                const testResult = await getActivitiesSupabaseAction({
                    limit: 10
                });
                console.log("🧪 Test fetch ALL activities:", {
                    isSuccess: testResult.isSuccess,
                    dataLength: testResult.data?.length || 0,
                    message: testResult.message,
                    firstActivityTitle: testResult.data?.[0]?.title || "No activities"
                });
                const updatedCategories = await Promise.all(categoriesData.map(async (category) => {
                    try {
                        const result = await getActivitiesSupabaseAction({
                            limit: 100,
                            category: category.id.toLowerCase()
                        });
                        console.log(`📊 Category "${category.id}" results:`, {
                            isSuccess: result.isSuccess,
                            count: result.data?.length || 0,
                            message: result.message
                        });
                        return {
                            ...category,
                            activityCount: result.isSuccess
                                ? result.data?.length || 0
                                : Math.floor(Math.random() * 15) + 5
                        };
                    }
                    catch (error) {
                        console.error(`❌ Error fetching ${category.id}:`, error);
                        return {
                            ...category,
                            activityCount: Math.floor(Math.random() * 15) + 5 // Fallback count
                        };
                    }
                }));
                console.log("✅ Final categories with counts:", updatedCategories.map(cat => ({
                    id: cat.id,
                    count: cat.activityCount
                })));
                if (testResult.isSuccess &&
                    testResult.data &&
                    testResult.data.length > 0) {
                    console.log("📈 Updating categories with real data:", updatedCategories.map(cat => ({
                        id: cat.id,
                        count: cat.activityCount
                    })));
                    setCategoriesWithCounts(updatedCategories);
                }
                else {
                    console.log("📝 No activities found, keeping fallback data");
                }
            }
            catch (error) {
                console.error("❌ Error fetching activity counts:", error);
                // Keep the initial fallback data we set in useState
            }
            finally {
                setIsUpdating(false);
            }
        }
        // Add a small delay to ensure the component is mounted
        const timeoutId = setTimeout(fetchActivityCounts, 100);
        return () => clearTimeout(timeoutId);
    }, []);
    const totalActivities = categoriesWithCounts.reduce((sum, cat) => sum + (cat.activityCount || 0), 0);
    console.log("🎯 Component render state:", {
        isUpdating,
        totalActivities,
        categoriesCount: categoriesWithCounts.length,
        hasActivityCounts: categoriesWithCounts.some(cat => (cat.activityCount || 0) > 0)
    });
    return (_jsxs("section", { className: "relative overflow-hidden py-24", style: {
            background: `linear-gradient(135deg, #4a1a3d, #ff1dce, #2d0a1f)`
        }, "aria-label": "Activity categories", children: [_jsx("div", { className: "absolute inset-0", style: {
                    background: `radial-gradient(ellipse at top, rgba(255, 29, 206, 0.3), rgba(255, 245, 70, 0.15), transparent)`
                } }), _jsx("div", { className: "absolute inset-0", style: {
                    background: `radial-gradient(ellipse at bottom right, rgba(255, 29, 206, 0.2), transparent, transparent)`
                } }), _jsx("div", { className: "bg-grid-white/[0.02] absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,_transparent_20%,_black)]" }), _jsx("div", { className: "absolute left-1/4 top-20 size-96 rounded-full blur-3xl", style: { backgroundColor: "rgba(255, 29, 206, 0.2)" } }), _jsx("div", { className: "absolute bottom-20 right-1/4 size-96 rounded-full blur-3xl", style: { backgroundColor: "rgba(255, 245, 70, 0.15)" } }), _jsxs("div", { className: "relative mx-auto max-w-7xl px-4", children: [_jsxs(AnimatedSection, { className: "mb-20 text-center", children: [_jsx("div", { className: "relative inline-block", children: _jsxs(Badge, { className: "mb-6 px-6 py-3 text-base font-bold text-white shadow-2xl", style: {
                                        background: `linear-gradient(to right, #ff1dce, #dc2626)`,
                                        boxShadow: "0 20px 25px -5px rgba(255, 29, 206, 0.4)"
                                    }, children: [_jsx(Activity, { className: "mr-2 size-5" }), "Popular Categories"] }) }), _jsxs(motion.h2, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: 0.2 }, className: "mb-8 text-5xl font-bold text-white sm:text-6xl lg:text-7xl", children: ["Explore by", " ", _jsx("span", { className: "bg-gradient-to-r bg-clip-text text-transparent", style: {
                                            background: `linear-gradient(to right, #ff1dce, #fff546)`,
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent"
                                        }, children: "Category" })] }), _jsxs(motion.p, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: 0.4 }, className: "mx-auto max-w-3xl text-xl leading-relaxed text-gray-300 sm:text-2xl", children: ["Discover amazing activities across Mallorca's most exciting categories.", !isUpdating && totalActivities > 0 && (_jsxs("span", { className: "mt-2 block text-lg font-semibold", style: { color: "#fff546" }, children: [totalActivities, " premium experiences await you"] }))] })] }), _jsxs(AnimatedSection, { delay: 0.6, className: "relative", children: [_jsxs("div", { className: "absolute -top-20 right-0 z-10 hidden gap-2 lg:flex", children: [_jsx(motion.button, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, className: "flex size-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-xl transition-all duration-300 hover:bg-white/10", style: {
                                            "--hover-border-color": "rgba(255, 29, 206, 0.6)"
                                        }, onMouseEnter: e => {
                                            e.currentTarget.style.borderColor = "rgba(255, 29, 206, 0.6)";
                                        }, onMouseLeave: e => {
                                            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                                        }, onClick: () => {
                                            const container = document.getElementById("categories-carousel");
                                            if (container)
                                                container.scrollBy({ left: -400, behavior: "smooth" });
                                        }, children: _jsx("svg", { className: "size-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 19l-7-7 7-7" }) }) }), _jsx(motion.button, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, className: "flex size-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-xl transition-all duration-300 hover:bg-white/10", style: {
                                            "--hover-border-color": "rgba(255, 29, 206, 0.6)"
                                        }, onMouseEnter: e => {
                                            e.currentTarget.style.borderColor = "rgba(255, 29, 206, 0.6)";
                                        }, onMouseLeave: e => {
                                            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                                        }, onClick: () => {
                                            const container = document.getElementById("categories-carousel");
                                            if (container)
                                                container.scrollBy({ left: 400, behavior: "smooth" });
                                        }, children: _jsx("svg", { className: "size-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) }) })] }), _jsx("div", { id: "categories-carousel", className: "scrollbar-hide flex gap-6 overflow-x-auto pb-6 lg:gap-8", style: {
                                    scrollSnapType: "x mandatory",
                                    scrollBehavior: "smooth",
                                    scrollPadding: "0 24px",
                                    willChange: "scroll-position",
                                    transform: "translate3d(0, 0, 0)",
                                    contain: "layout style paint"
                                }, children: categoriesWithCounts.map((category, index) => (_jsx("div", { className: "flex-none", style: {
                                        width: "350px",
                                        minWidth: "350px",
                                        scrollSnapAlign: "start"
                                    }, children: _jsx(EnhancedCategoryCard, { category: category, index: index }) }, category.id))) }), _jsx("div", { className: "mt-6 flex justify-center lg:hidden", children: _jsxs("div", { className: "flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 backdrop-blur-sm", children: [_jsx("svg", { className: "size-4 text-white/60", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M7 16l-4-4m0 0l4-4m-4 4h18" }) }), _jsx("span", { className: "text-sm text-white/70", children: "Scroll to explore categories" }), _jsx("svg", { className: "size-4 text-white/60", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17 8l4 4m0 0l-4 4m4-4H3" }) })] }) })] }), _jsx(AnimatedSection, { delay: 1.2, className: "mt-20 text-center", children: _jsxs(motion.div, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: [_jsx("p", { className: "mb-4 text-lg text-gray-400", children: "Can't decide? Browse all our amazing experiences" }), _jsxs(motion.a, { href: "/activities", className: "inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-white backdrop-blur-sm transition-all duration-300", style: {
                                        background: `linear-gradient(to right, rgba(255, 29, 206, 0.2), rgba(255, 245, 70, 0.2))`,
                                        "--hover-border-color": "#ff1dce",
                                        "--hover-bg": `linear-gradient(to right, rgba(255, 29, 206, 0.3), rgba(255, 245, 70, 0.3))`
                                    }, onMouseEnter: e => {
                                        e.currentTarget.style.borderColor = "rgba(255, 29, 206, 0.6)";
                                        e.currentTarget.style.background = `linear-gradient(to right, rgba(255, 29, 206, 0.3), rgba(255, 245, 70, 0.3))`;
                                    }, onMouseLeave: e => {
                                        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                                        e.currentTarget.style.background = `linear-gradient(to right, rgba(255, 29, 206, 0.2), rgba(255, 245, 70, 0.2))`;
                                    }, whileHover: { y: -2 }, children: [_jsx(Activity, { className: "size-5" }), "View All Activities", _jsx("span", { className: "ml-2 text-lg", children: "\u2192" })] })] }) })] })] }));
}
//# sourceMappingURL=component.js.map