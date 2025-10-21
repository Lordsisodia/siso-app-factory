/*
<ai_context>
This client component provides the features section for the landing page.
</ai_context>
*/
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { AppWindow, Database, DollarSign, Shield } from "lucide-react";
const features = [
    {
        title: "Frontend",
        description: "Next.js, Tailwind, Shadcn, Framer Motion",
        icon: AppWindow
    },
    {
        title: "Backend",
        description: "Postgres, Supabase, Drizzle ORM, Server Actions",
        icon: Database
    },
    {
        title: "Auth",
        description: "Clerk",
        icon: Shield
    },
    {
        title: "Payments",
        description: "Stripe",
        icon: DollarSign
    }
];
const FeatureCard = ({ title, description, icon: Icon }) => (_jsx(motion.div, { whileHover: { scale: 1.05 }, transition: { type: "spring", stiffness: 300 }, className: "transform-gpu", children: _jsx(Card, { className: "group transition-shadow duration-200 hover:shadow-lg", children: _jsxs(CardHeader, { children: [_jsx(Icon, { className: "text-primary mb-2 size-12" }), _jsx(CardTitle, { children: title }), _jsx(CardDescription, { children: description })] }) }) }));
export const FeaturesSection = () => {
    return (_jsx("section", { className: "mt-20 bg-gradient-to-b from-gray-50 to-white py-20 dark:from-gray-800 dark:to-gray-900", children: _jsx("div", { className: "container mx-auto px-4", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease: "easeOut" }, children: [_jsx("h2", { className: "mb-12 text-center text-4xl font-bold", children: "Tech Stack" }), _jsx("div", { className: "mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4", children: features.map((feature, index) => (_jsx(FeatureCard, { ...feature }, index))) })] }) }) }));
};
//# sourceMappingURL=component.js.map