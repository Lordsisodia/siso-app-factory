"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
const formatNumber = (num) => {
    if (num >= 1000) {
        return `${(num / 1000).toFixed(1)}k`.replace(".0k", "k");
    }
    return num.toString();
};
export function GitHubStarsBasic({ className, repo = "serafimcloud/21st", }) {
    const { data: stars, isLoading } = useQuery({
        queryKey: ["github-stars", repo],
        queryFn: async () => {
            const res = await fetch(`https://api.github.com/repos/${repo}`);
            const data = await res.json();
            return data.stargazers_count;
        },
        staleTime: 1000 * 60 * 5,
        retry: 2,
    });
    return (_jsx("span", { className: cn("inline-flex items-center", className), children: isLoading ? _jsx(Skeleton, { className: "h-5 w-8" }) : formatNumber(stars || 0) }));
}
//# sourceMappingURL=component.js.map