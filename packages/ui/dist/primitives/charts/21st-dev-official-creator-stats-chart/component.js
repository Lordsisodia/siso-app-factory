"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { AlertCircle, Bot, Code, DollarSign, Eye, ScrollText, SquareTerminal, } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React from "react";
import { Bar, CartesianGrid, ComposedChart, XAxis } from "recharts";
import { Card, CardContent, CardDescription, CardTitle, } from "@/components/ui/card";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip";
import { formatK, formatPrice } from "@/lib/utils";
import { eachMonthOfInterval, format, startOfMonth } from "date-fns";
import { useMemo, useState } from "react";
const chartConfig = {
    total_earnings: {
        label: "Earnings",
        color: "hsl(var(--chart-1))",
    },
    views: {
        label: "Views",
        color: "hsl(var(--chart-1))",
    },
    code_copies: {
        label: "Code Copies",
        color: "hsl(var(--chart-2))",
    },
    prompt_copies: {
        label: "Prompt Copies",
        color: "hsl(var(--chart-3))",
    },
    cli_downloads: {
        label: "CLI Downloads",
        color: "hsl(var(--chart-4))",
    },
    mcp_usages: {
        label: "MCP Uses",
        color: "hsl(var(--chart-5))",
    },
};
function getMonthYear(dateString) {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}
function BarChartSection({ data, chartConfig, dataKeys, groupByMonth, valueFormatter = (value) => value, showTotal = true, }) {
    return (_jsx(ChartContainer, { config: chartConfig, className: "aspect-auto h-[250px] w-full", children: _jsxs(ComposedChart, { data: data, children: [_jsx(CartesianGrid, { vertical: false }), _jsx(XAxis, { dataKey: "date", tickLine: false, axisLine: false, tickMargin: 8, minTickGap: 32, interval: "preserveStartEnd", tickFormatter: (value) => {
                        const date = new Date(value);
                        if (groupByMonth) {
                            return date.toLocaleDateString("en-US", {
                                month: "short",
                                year: "numeric",
                            });
                        }
                        return date.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                        });
                    } }), _jsx(ChartTooltip, { content: _jsx(ChartTooltipContent, { className: "w-[200px]", labelFormatter: (value) => {
                            const date = new Date(value);
                            return date.toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            });
                        }, formatter: (value, name, item, index) => (_jsxs(_Fragment, { children: [_jsx("div", { className: "h-2.5 w-2.5 shrink-0 rounded-[2px]", style: { backgroundColor: `var(--color-${name})` } }), chartConfig[name]?.label || name, _jsx("div", { className: "ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground", children: valueFormatter(value) }), showTotal && index === 1 && (_jsxs("div", { className: "flex basis-full items-center border-t pt-1.5 text-xs font-medium text-foreground", children: ["Total", _jsx("div", { className: "ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground", children: (() => {
                                                const total = dataKeys.reduce((sum, key) => sum +
                                                    (typeof item.payload[key] === "number"
                                                        ? item.payload[key]
                                                        : 0), 0);
                                                return valueFormatter(total);
                                            })() })] }))] })) }) }), dataKeys.map((key) => (_jsx(Bar, { dataKey: key, type: "natural", fill: `var(--color-${key})`, stroke: `var(--color-${key})`, stackId: "stack" }, key))), _jsx(ChartLegend, { content: _jsx(ChartLegendContent, {}) })] }) }));
}
export function PayoutStatsChart({ data, isLoading = false, isPartner = true, }) {
    // Generate all months from earliest in data to current month
    const months = useMemo(() => {
        if (!data || data.length === 0)
            return [];
        // Find earliest date
        const minDate = data.reduce((earliest, item) => {
            if (!item.date)
                return earliest;
            const d = new Date(item.date);
            return d < earliest ? d : earliest;
        }, new Date());
        // Generate array of months between earliest date and current month
        const startDate = startOfMonth(minDate);
        const endDate = startOfMonth(new Date());
        return eachMonthOfInterval({ start: startDate, end: endDate })
            .map((date) => format(date, "yyyy-MM"))
            .reverse();
    }, [data]);
    const [selectedMonth, setSelectedMonth] = useState("all");
    const [tab, setTab] = useState("earnings");
    // Group data by month for 'All time' view
    const groupedByMonth = useMemo(() => {
        const map = new Map();
        data.forEach((item) => {
            const month = getMonthYear(item.date);
            const entry = map.get(month) ?? {
                date: month,
            };
            // Dynamically sum all numeric fields except 'date'
            for (const key in item) {
                if (key !== "date" && typeof item[key] === "number") {
                    entry[key] = (entry[key] || 0) + item[key];
                }
            }
            map.set(month, entry);
        });
        // Sort by month ascending
        return Array.from(map.values()).sort((a, b) => a.date.localeCompare(b.date));
    }, [data]);
    const filteredData = useMemo(() => {
        if (selectedMonth === "all")
            return groupedByMonth;
        return data.filter((item) => getMonthYear(item.date) === selectedMonth);
    }, [data, selectedMonth, groupedByMonth]);
    const earningsSum = filteredData.reduce((acc, curr) => acc + curr.total_earnings, 0);
    const statKeysForSelect = useMemo(() => {
        return [
            "views",
            "code_copies",
            "prompt_copies",
            "cli_downloads",
            "mcp_usages",
        ];
    }, []);
    const [selectedStat, setSelectedStat] = useState(statKeysForSelect[0]);
    const selectedStatSum = useMemo(() => {
        if (!filteredData || !selectedStat || filteredData.length === 0)
            return 0;
        return filteredData.reduce((acc, curr) => {
            const value = curr[selectedStat];
            return acc + (typeof value === "number" ? value : 0);
        }, 0);
    }, [filteredData, selectedStat]);
    const isEmpty = !filteredData || filteredData.length === 0;
    // Map stat keys to icons
    const statIcons = {
        views: Eye,
        code_copies: Code,
        prompt_copies: ScrollText,
        cli_downloads: SquareTerminal,
        mcp_usages: Bot,
    };
    return (_jsx(Card, { children: _jsxs(Tabs, { defaultValue: "earnings", value: tab, onValueChange: setTab, children: [_jsxs(TabsList, { className: "flex flex-row h-fit", children: [_jsxs(TabsTrigger, { value: "earnings", className: "flex-1 p-3 sm:p-6 flex flex-col gap-1 items-start h-fit", children: [isPartner ? (_jsx(CardDescription, { className: "font-normal text-xs sm:text-sm", children: "Earnings" })) : (_jsxs(CardDescription, { className: "font-normal flex items-center gap-1 text-xs sm:text-sm", children: ["Projected Income", earningsSum > 0 && (_jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsx(AlertCircle, { className: "w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground cursor-help" }) }), _jsx(TooltipContent, { className: "p-2 sm:p-3", children: _jsx("p", { className: "text-xs sm:text-sm", children: "This is how much you could earn by joining our partnership program." }) })] }) }))] })), _jsx(CardTitle, { className: "tracking-normal", children: _jsxs("span", { className: "inline-flex items-center", children: [_jsx(DollarSign, { className: "w-5 h-5" }), _jsx(AnimatePresence, { mode: "wait", initial: false, children: isLoading ? (_jsx(motion.span, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.3 }, className: "h-6 w-24 ml-0.5 bg-muted-foreground/10 rounded-md", style: { display: "inline-block" }, children: _jsx(Skeleton, { className: "h-6 w-24 ml-0.5 bg-muted-foreground/10 rounded-md" }) }, "earnings-skeleton")) : (_jsx(motion.span, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.3 }, className: "ml-0.5 min-w-[6rem] h-6 flex items-center", style: { display: "inline-flex" }, children: formatPrice(earningsSum).replace("$", "") }, "earnings-value")) })] }) })] }), _jsxs(TabsTrigger, { value: "stats", className: "flex-1 p-3 sm:p-6 flex flex-col gap-1 items-start h-fit", children: [_jsx(CardDescription, { className: "font-normal text-xs sm:text-sm", children: "Stats" }), _jsx(CardTitle, { className: "tracking-normal flex items-center gap-4", children: _jsxs("span", { className: "inline-flex items-center gap-1.5", children: [statIcons[selectedStat] &&
                                                React.createElement(statIcons[selectedStat], {
                                                    className: "w-5 h-5",
                                                }), _jsx(AnimatePresence, { mode: "wait", initial: false, children: isLoading ? (_jsx(motion.span, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.3 }, className: "h-6 w-20 bg-muted-foreground/10 rounded-md", style: { display: "inline-block" }, children: _jsx(Skeleton, { className: "h-6 w-20 bg-muted-foreground/10 rounded-md" }) }, "stats-sum-skeleton")) : (_jsx(motion.span, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.3 }, className: "min-w-[5rem] h-6 flex items-center", style: { display: "inline-flex" }, children: formatK(selectedStatSum) }, "stats-sum-value")) })] }) })] })] }), _jsxs(CardContent, { className: "space-y-6 p-6", children: [_jsxs("div", { className: "flex flex-row justify-end gap-4", children: [tab === "stats" && !isLoading && !isEmpty && (_jsxs(Select, { value: selectedStat, onValueChange: setSelectedStat, children: [_jsx(SelectTrigger, { className: "w-48", children: _jsx(SelectValue, { placeholder: "Select Stat" }) }), _jsx(SelectContent, { children: statKeysForSelect.map((statKey) => (_jsx(SelectItem, { value: statKey, children: chartConfig[statKey]
                                                    ?.label || statKey }, statKey))) })] })), isLoading ? (_jsx(Skeleton, { className: "w-48 h-9 rounded-md" })) : !isEmpty ? (_jsxs(Select, { value: selectedMonth, onValueChange: setSelectedMonth, children: [_jsx(SelectTrigger, { className: "w-48", children: _jsx(SelectValue, { placeholder: "All time" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: "All time" }), months.map((month) => {
                                                    const [year, m] = month.split("-");
                                                    const date = new Date(Number(year), Number(m) - 1);
                                                    return (_jsx(SelectItem, { value: month, children: date.toLocaleString("en-US", {
                                                            month: "long",
                                                            year: "numeric",
                                                        }) }, month));
                                                })] })] })) : (_jsx("div", { className: "w-48 h-9 opacity-0 pointer-events-none select-none" }))] }), _jsx(AnimatePresence, { mode: "wait", children: isLoading ? (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.4 }, className: "w-full h-[250px] flex flex-col items-center justify-center gap-6", children: _jsxs("div", { className: "flex items-end justify-between w-full h-[250px] gap-3", children: [_jsx(Skeleton, { className: "w-1/12 h-1/2 rounded-sm" }), _jsx(Skeleton, { className: "w-1/12 h-4/5 rounded-sm" }), _jsx(Skeleton, { className: "w-1/12 h-2/3 rounded-sm" }), _jsx(Skeleton, { className: "w-1/12 h-1/3 rounded-sm" }), _jsx(Skeleton, { className: "w-1/12 h-3/4 rounded-sm" }), _jsx(Skeleton, { className: "w-1/12 h-2/5 rounded-sm" }), _jsx(Skeleton, { className: "w-1/12 h-3/5 rounded-sm" }), _jsx(Skeleton, { className: "w-1/12 h-1/4 rounded-sm" }), _jsx(Skeleton, { className: "w-1/12 h-2/4 rounded-sm" }), _jsx(Skeleton, { className: "w-1/12 h-3/4 rounded-sm" })] }) }, "loading")) : isEmpty ? (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.4 }, className: "w-full h-[250px] relative flex items-center justify-center", children: [_jsxs("div", { className: "absolute inset-0 flex items-end justify-between w-full h-full gap-3 opacity-60 pointer-events-none", children: [_jsx(Skeleton, { className: "animate-none w-1/12 h-1/2 rounded-sm" }), _jsx(Skeleton, { className: "animate-none w-1/12 h-4/5 rounded-sm" }), _jsx(Skeleton, { className: "animate-none w-1/12 h-2/3 rounded-sm" }), _jsx(Skeleton, { className: "animate-none w-1/12 h-1/3 rounded-sm" }), _jsx(Skeleton, { className: "animate-none w-1/12 h-3/4 rounded-sm" }), _jsx(Skeleton, { className: "animate-none w-1/12 h-2/5 rounded-sm" }), _jsx(Skeleton, { className: "animate-none w-1/12 h-3/5 rounded-sm" }), _jsx(Skeleton, { className: "animate-none w-1/12 h-1/4 rounded-sm" }), _jsx(Skeleton, { className: "animate-none w-1/12 h-2/4 rounded-sm" }), _jsx(Skeleton, { className: "animate-none w-1/12 h-3/4 rounded-sm" })] }), _jsx("span", { className: "relative z-10 text-muted-foreground text-base font-medium bg-background/80 px-4 py-2 rounded-md", children: "No data available" })] }, "empty")) : (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.4 }, className: "w-full", children: [_jsx(TabsContent, { value: "earnings", className: "m-0", children: _jsx(BarChartSection, { data: filteredData, chartConfig: chartConfig, dataKeys: ["total_earnings"], groupByMonth: selectedMonth === "all", valueFormatter: formatPrice, showTotal: false }) }), _jsx(TabsContent, { value: "stats", className: "m-0", children: _jsx(BarChartSection, { data: filteredData, chartConfig: chartConfig, dataKeys: selectedStat ? [selectedStat] : [], groupByMonth: selectedMonth === "all", valueFormatter: formatK, showTotal: false }) })] }, "data")) })] })] }) }));
}
//# sourceMappingURL=component.js.map