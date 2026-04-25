import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import LandlordLayout from '@/layouts/landlord-layout';
import { PageProps } from '@/types';

interface Stats {
    total_properties: number;
    available_properties: number;
    occupied_properties: number;
    total_tenants: number;
    pending_payments: number;
    collected_this_month: number;
}

interface RecentProperty {
    id: number;
    title: string;
    location: string;
    status: string;
    rental_price: number;
}

interface Props extends PageProps {
    stats: Stats;
    recent_properties: RecentProperty[];
}

const STATUS_COLOR: Record<string, string> = {
    available: 'text-[#00E676]',
    occupied: 'text-blue-400',
    maintenance: 'text-amber-400',
    unavailable: 'text-red-400',
};

function StatCard({
    label, value, sub, accent = false,
}: {
    label: string;
    value: string | number;
    sub?: string;
    accent?: boolean;
}) {
    return (
        <div className={`bg-[#112630] border rounded-xl p-5 ${accent ? 'border-[#00E676]/25' : 'border-white/7'}`}>
            <p className="text-xs text-[#F0F6F8]/35 mb-1">{label}</p>
            <p className={`text-2xl font-semibold ${accent ? 'text-[#00E676]' : 'text-[#F0F6F8]'}`}>
                {value}
            </p>
            {sub && <p className="text-[11px] text-[#F0F6F8]/30 mt-1">{sub}</p>}
        </div>
    );
}

export default function DashboardIndex({ stats, recent_properties, auth }: Props) {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

    return (
        <LandlordLayout title="Dashboard">
            <Head title="Dashboard — SmartRental" />

            {/* Greeting */}
            <div className="mb-7">
                <h2 className="text-lg font-semibold">
                    {greeting}, {auth.user.name.split(' ')[0]} 👋
                </h2>
                <p className="text-xs text-[#F0F6F8]/35 mt-0.5">
                    Here's what's happening with your properties today.
                </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <StatCard
                    label="Total properties"
                    value={stats.total_properties}
                    sub={`${stats.available_properties} available`}
                />
                <StatCard
                    label="Occupied"
                    value={stats.occupied_properties}
                    sub={`of ${stats.total_properties} properties`}
                />
                <StatCard
                    label="Active tenants"
                    value={stats.total_tenants}
                />
                <StatCard
                    label="Pending payments"
                    value={stats.pending_payments}
                    sub="Awaiting collection"
                />
                <StatCard
                    label="Collected this month"
                    value={`TZS ${stats.collected_this_month.toLocaleString()}`}
                    accent
                />
                <div className="bg-[#112630] border border-dashed border-[#00E676]/20 rounded-xl p-5 flex flex-col items-center justify-center gap-2">
                    <Link
                        href="/landlord/properties/create"
                        className="text-sm font-medium text-[#00E676] hover:opacity-80 transition-opacity"
                    >
                        + Add property
                    </Link>
                    <p className="text-[11px] text-[#F0F6F8]/25">List a new rental</p>
                </div>
            </div>

            {/* Recent properties */}
            <div className="bg-[#112630] border border-white/7 rounded-xl overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/6">
                    <h3 className="text-sm font-semibold">Recent properties</h3>
                    <Link
                        href="/landlord/properties"
                        className="text-xs text-[#00E676]/70 hover:text-[#00E676] transition-colors"
                    >
                        View all →
                    </Link>
                </div>

                {recent_properties.length === 0 ? (
                    <div className="py-12 text-center text-sm text-[#F0F6F8]/30">
                        No properties yet.{' '}
                        <Link href="/landlord/properties/create" className="text-[#00E676] hover:opacity-80">
                            Add one →
                        </Link>
                    </div>
                ) : (
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-[11px] text-[#F0F6F8]/30 uppercase tracking-wider">
                                <th className="text-left px-5 py-2.5 font-medium">Property</th>
                                <th className="text-left px-5 py-2.5 font-medium hidden sm:table-cell">Location</th>
                                <th className="text-left px-5 py-2.5 font-medium">Status</th>
                                <th className="text-right px-5 py-2.5 font-medium">Rent</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recent_properties.map((p, i) => (
                                <tr
                                    key={p.id}
                                    className={`border-t border-white/4 hover:bg-white/2 transition-colors ${i === recent_properties.length - 1 ? '' : ''
                                        }`}
                                >
                                    <td className="px-5 py-3">
                                        <Link
                                            href={`/landlord/properties/${p.id}`}
                                            className="font-medium hover:text-[#00E676] transition-colors truncate block max-w-[180px]"
                                        >
                                            {p.title}
                                        </Link>
                                    </td>
                                    <td className="px-5 py-3 text-[#F0F6F8]/40 text-xs hidden sm:table-cell">
                                        {p.location}
                                    </td>
                                    <td className="px-5 py-3">
                                        <span className={`text-xs capitalize ${STATUS_COLOR[p.status] ?? 'text-[#F0F6F8]/50'}`}>
                                            {p.status}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3 text-right text-[#00E676] text-xs font-medium">
                                        TZS {p.rental_price.toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </LandlordLayout>
    );
}