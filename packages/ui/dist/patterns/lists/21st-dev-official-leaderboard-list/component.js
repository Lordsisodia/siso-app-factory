"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ComponentPreviewDialog } from "@/components/features/component-page/preview-dialog";
import { LeaderboardCardSkeleton } from "@/components/ui/skeletons";
import { useToast } from "@/hooks/use-toast";
import { shouldHideLeaderboardRankings } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { Trophy } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LeaderboardCard } from "./leaderboard-card";
export function LeaderboardList({ submissions = [], roundId, toggleVote, category, seasonalTheme, isLoading = false, isHistorical = false, }) {
    const router = useRouter();
    const { toast } = useToast();
    const { user } = useUser();
    const [isVoting, setIsVoting] = useState(null);
    const [selectedDemo, setSelectedDemo] = useState(null);
    const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
    // Store original submissions without reshuffling
    const [optimisticSubmissions, setOptimisticSubmissions] = useState([]);
    // Initialize optimisticSubmissions with the original submissions
    useEffect(() => {
        // Only update if submissions is not empty
        if (submissions && submissions.length > 0) {
            setOptimisticSubmissions(submissions);
        }
    }, [submissions]);
    // Use the shared utility function
    const hideRankings = shouldHideLeaderboardRankings() && !isHistorical;
    const prepareDemo = (demo) => {
        if (!demo)
            return null;
        const result = { ...demo };
        if (!result.bundle_url || typeof result.bundle_url !== "object") {
            result.bundle_url = { html: "about:blank" };
        }
        if (!result.component || typeof result.component !== "object") {
            const componentData = typeof result.component_data === "object"
                ? result.component_data || {}
                : {};
            result.component = {
                id: componentData.id || 0,
                name: componentData.name || result.name || "",
                component_slug: componentData.component_slug || "",
                user_id: "",
                is_public: true,
                user: {
                    id: "",
                    username: result.user_data?.username || "",
                    display_username: result.user_data?.username || "",
                    display_image_url: result.user_data?.display_image_url || null,
                    display_name: result.user_data?.username || "",
                },
            };
        }
        if (!result.user || typeof result.user !== "object") {
            result.user = {
                id: "",
                username: result.user_data?.username || "",
                display_username: result.user_data?.username || "",
                display_image_url: result.user_data?.display_image_url || null,
                display_name: result.user_data?.username || "",
            };
        }
        return result;
    };
    const handleVote = async (e, demoId) => {
        e.stopPropagation();
        // Don't allow voting on historical data
        if (isHistorical || !toggleVote) {
            return;
        }
        if (!user) {
            toast({
                title: "Please sign in",
                description: "You need to be signed in to vote",
                variant: "destructive",
            });
            return;
        }
        try {
            // Mark this specific submission as in voting state
            setIsVoting(demoId);
            // Apply optimistic update
            setOptimisticSubmissions((current) => {
                return current.map((sub) => {
                    if (sub.id === demoId) {
                        const hasVoted = !sub.has_voted;
                        return {
                            ...sub,
                            has_voted: hasVoted,
                            votes: hasVoted
                                ? (sub.votes || 0) + 1
                                : Math.max((sub.votes || 0) - 1, 0),
                        };
                    }
                    return sub;
                });
            });
            // Execute the actual mutation
            await toggleVote.mutateAsync({ demoId });
        }
        catch (error) {
            // In case of error, revert to original data
            setOptimisticSubmissions(submissions);
            console.error("Error voting:", error);
            toast({
                title: "Error",
                description: "Failed to update vote. Please try again.",
                variant: "destructive",
            });
        }
        finally {
            setIsVoting(null);
        }
    };
    // Render loading state
    if (isLoading) {
        // Check if ranking info should be displayed
        const hideRankings = shouldHideLeaderboardRankings() && !isHistorical;
        return (_jsxs("div", { className: "space-y-2", children: [hideRankings && (_jsx("div", { className: "-mt-3.5 text-xs text-muted-foreground italic mb-4", children: "Rankings and vote counts are hidden on weekdays and submissions are shown in random order. Rankings become visible only on weekends (Saturday and Sunday) to provide equal visibility to all submissions." })), Array.from({ length: 10 }).map((_, index) => (_jsx(LeaderboardCardSkeleton, {}, index)))] }));
    }
    // Render empty state only if data has been loaded and there are no results
    if (!isLoading && submissions && submissions.length === 0) {
        let categoryDisplay = "components";
        if (category === "seasonal" && seasonalTheme) {
            categoryDisplay = `${seasonalTheme.toLowerCase()} components`;
        }
        else if (category !== "global") {
            categoryDisplay = `${category.toLowerCase()} components`;
        }
        return (_jsxs("div", { className: "flex flex-col items-center justify-center py-12 text-center gap-2", children: [_jsx("div", { className: "rounded-full bg-muted p-2 mb-1", children: _jsx(Trophy, { className: "h-5 w-5 text-primary/60" }) }), _jsx("div", { className: "text-sm text-muted-foreground", children: `No ${categoryDisplay} submitted for this round yet.` })] }));
    }
    const handleDemoClick = (submission) => {
        // TODO: Temporary disable previews
        router.push(`/${submission.user_data.username}/${submission.component_data.component_slug}/${submission.demo_slug}`);
        return;
        if (!submission.bundle_url || typeof submission.bundle_url !== "object") {
            if (submission.user_data?.username &&
                submission.component_data?.component_slug &&
                submission.demo_slug) {
                router.push(`/${submission.user_data.username}/${submission.component_data.component_slug}/${submission.demo_slug}`);
                return;
            }
        }
        const preparedDemo = prepareDemo(submission);
        setSelectedDemo(preparedDemo);
        setIsPreviewDialogOpen(true);
    };
    const handleCloseDialog = () => {
        setIsPreviewDialogOpen(false);
        setTimeout(() => {
            setSelectedDemo(null);
        }, 300);
    };
    // If we've got to this point, we should always show the list
    return (_jsxs("div", { className: "space-y-2", children: [hideRankings && (_jsx("div", { className: "-mt-3.5 text-xs text-muted-foreground italic", children: "Rankings and vote counts are hidden on weekdays and submissions are shown in random order. Rankings become visible only on weekends (Saturday and Sunday) to provide equal visibility to all submissions." })), (optimisticSubmissions.length > 0
                ? optimisticSubmissions
                : submissions).map((submission, index) => (_jsx(LeaderboardCard, { submission: submission, index: index, isVoting: isVoting === submission.id, handleVote: handleVote, handleDemoClick: handleDemoClick, isHistorical: isHistorical }, submission.id))), selectedDemo && (_jsx(ComponentPreviewDialog, { demo: selectedDemo, isOpen: isPreviewDialogOpen, onClose: handleCloseDialog }))] }));
}
//# sourceMappingURL=component.js.map