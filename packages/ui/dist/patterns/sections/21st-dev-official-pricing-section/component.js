"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { PricingCard } from "@/components/ui/pricing-card";
import { Tab } from "@/components/ui/pricing-tab";
export function PricingSection({ title, subtitle, tiers, frequencies, }) {
    const [selectedFrequency, setSelectedFrequency] = React.useState(frequencies[0]);
    return (_jsxs("section", { className: "flex flex-col items-center gap-10 py-10", children: [_jsxs("div", { className: "space-y-7 text-center", children: [_jsxs("div", { className: "space-y-4", children: [_jsx("h2", { className: "text-3xl font-bold tracking-tight text-neutral-200 sm:text-4xl", children: title }), _jsx("p", { className: "text-lg text-neutral-400", children: subtitle })] }), _jsx("div", { className: "mx-auto flex w-fit rounded-full bg-white/5 p-1", children: frequencies.map((freq) => (_jsx(Tab, { text: freq, selected: selectedFrequency === freq, setSelected: setSelectedFrequency, discount: freq === "yearly" }, freq))) })] }), _jsx("div", { className: "container grid max-w-5xl gap-6 px-0 sm:px-4 sm:grid-cols-3", children: tiers.map((tier) => (_jsx(PricingCard, { tier: tier, paymentFrequency: selectedFrequency }, tier.name))) })] }));
}
//# sourceMappingURL=component.js.map