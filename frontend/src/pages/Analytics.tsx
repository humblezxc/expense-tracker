import { useQuery } from "@apollo/client/react";
import { GET_ANALYTICS } from "../queries/analytics";
import type { GetAnalyticsData } from "../types/graphql";

export default function Analytics() {
    const { data, loading, error } = useQuery<GetAnalyticsData>(GET_ANALYTICS, {
        fetchPolicy: "cache-and-network",
    });

    if (loading) return <div className="p-4">Loading analytics…</div>;
    if (error) return <div className="p-4 text-red-600">Error loading analytics: {error.message}</div>;

    const analytics = data?.analytics;
    if (!analytics) return <div className="p-4">No analytics available.</div>;

    return (
        <section className="full shadow-md rounded-lg border border-gray-300 dark:border-grey bg-white/80 dark:bg-grey-light px-3 py-2 outline-none focus:ring-2">
            <h2 className="text-xl font-semibold mb-3">Analytics</h2>
            <div className="mb-4">
                <div className="text-sm">Total expenses</div>
                <div className="text-2xl font-bold">${analytics.total.toFixed(2)}</div>
            </div>
            <div>
                <h3 className="font-medium mb-2">Breakdown by category</h3>
                <div className="space-y-2">
                    {analytics.breakdown.map((b, idx) => (
                        <div key={b.category?.id ?? idx} className="flex items-center justify-between">
                            <div className="text-sm">{b.category?.name ?? "Uncategorized"}</div>
                            <div className="font-medium">${b.total.toFixed(2)}</div>
                        </div>
                    ))}
                    {analytics.breakdown.length === 0 && (
                        <div className="text-sm">No data</div>
                    )}
                </div>
            </div>
        </section>
    );
}