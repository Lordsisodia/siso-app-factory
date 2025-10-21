import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ImageResponse } from "next/og";
import { supabaseWithAdminAccess } from "@/lib/supabase";
export const runtime = "edge";
export const alt = "User Profile";
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = "image/png";
export default async function Image({ params, }) {
    const { data: userData } = await supabaseWithAdminAccess
        .from("users")
        .select(`
      id,
      username,
      name,
      image_url,
      display_username,
      display_name,
      display_image_url,
      bio,
      components!components_user_id_fkey(
        id,
        downloads_count,
        mv_component_analytics!component_analytics_component_id_fkey(
          activity_type,
          count
        )
      )
    `)
        .or(`username.eq.${params.username},display_username.eq.${params.username}`)
        .single();
    if (!userData) {
        return new ImageResponse((_jsx("div", { style: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
                fontSize: "32px",
                color: "#000",
            }, children: "User not found" })), {
            ...size,
        });
    }
    const totalDownloads = userData.components?.reduce((sum, comp) => sum + (comp.downloads_count || 0), 0) ?? 0;
    const totalUsages = userData.components?.reduce((sum, comp) => {
        const analytics = comp.mv_component_analytics || [];
        const promptCopyCount = analytics.find((a) => a.activity_type === "component_prompt_copy")
            ?.count ?? 0;
        const codeCopyCount = analytics.find((a) => a.activity_type === "component_code_copy")
            ?.count ?? 0;
        return sum + promptCopyCount + codeCopyCount;
    }, 0) || 0;
    const totalViews = userData.components?.reduce((sum, comp) => {
        const analytics = comp.mv_component_analytics || [];
        const viewCount = analytics.find((a) => a.activity_type === "component_view")?.count ?? 0;
        return sum + viewCount;
    }, 0) || 0;
    return new ImageResponse((_jsx("div", { style: {
            background: "hsl(0 0% 100%)",
            width: "100%",
            height: "100%",
            display: "flex",
            padding: "80px",
            boxSizing: "border-box",
            position: "relative",
        }, children: _jsxs("div", { style: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "100%",
                height: "100%",
                position: "relative",
            }, children: [_jsx("div", { style: {
                        position: "absolute",
                        top: 0,
                        right: 0,
                        width: "200px",
                        height: "200px",
                        borderRadius: "100%",
                        overflow: "hidden",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }, children: _jsx("img", { src: userData.display_image_url ||
                            userData.image_url ||
                            "https://21st.dev/placeholder.svg", alt: `${userData.display_name || userData.name || userData.username}'s avatar`, style: {
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        } }) }), _jsxs("div", { style: {
                        display: "flex",
                        flexDirection: "column",
                        gap: "24px",
                        paddingRight: "240px",
                    }, children: [_jsx("div", { style: {
                                display: "flex",
                                fontSize: "72px",
                                fontWeight: "bold",
                                color: "hsl(240 10% 3.9%)",
                            }, children: userData.display_name || userData.name || userData.username }), userData.bio && (_jsx("div", { style: {
                                fontSize: "28px",
                                color: "hsl(240 3.8% 46.1%)",
                                display: "-webkit-box",
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: 4,
                                overflow: "hidden",
                                lineHeight: "1.4",
                                maxWidth: "700px",
                            }, children: userData.bio }))] }), _jsxs("div", { style: {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                    }, children: [_jsxs("div", { style: {
                                display: "flex",
                                gap: "40px",
                                fontSize: "32px",
                                color: "hsl(240 3.8% 46.1%)",
                            }, children: [_jsxs("div", { style: { display: "flex" }, children: [(userData.components?.length || 0).toLocaleString(), " components"] }), _jsxs("div", { style: { display: "flex" }, children: [totalViews.toLocaleString(), " views"] }), _jsxs("div", { style: { display: "flex" }, children: [(totalUsages + totalDownloads).toLocaleString(), " usages"] })] }), _jsxs("div", { style: { display: "flex", alignItems: "center", gap: "12px" }, children: [_jsx("div", { style: {
                                        width: "24px",
                                        height: "24px",
                                        borderRadius: "50%",
                                        background: "hsl(240 10% 3.9%)",
                                    } }), _jsx("div", { style: {
                                        fontSize: "32px",
                                        color: "hsl(240 10% 3.9%)",
                                        fontWeight: "500",
                                    }, children: "21st.dev" })] })] })] }) })), {
        ...size,
    });
}
//# sourceMappingURL=component.js.map