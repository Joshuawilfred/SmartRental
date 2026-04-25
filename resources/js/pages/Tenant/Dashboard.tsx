import { Head, Link } from '@inertiajs/react';
import { Home, Calendar, CreditCard, Wrench, Phone } from 'lucide-react';
import type { PageProps } from '@/types';

interface Lease {
    property_title: string;
    property_location: string;
    rental_price: number;
    lease_start: string;
    lease_end: string;
}

interface Payment {
    due_date: string;
    amount: number;
    status: 'pending' | 'paid' | 'overdue';
}

interface MaintenanceRequest {
    id: number;
    title: string;
    status: 'open' | 'in_progress' | 'resolved';
    created_at: string;
}

interface Props extends PageProps {
    lease: Lease | null;
    next_payment: Payment | null;
    recent_requests: MaintenanceRequest[];
}

const REQUEST_STATUS: Record<string, { label: string; color: string }> = {
    open: { label: 'Open', color: 'text-amber-400' },
    in_progress: { label: 'In progress', color: 'text-blue-400' },
    resolved: { label: 'Resolved', color: 'text-[#00E676]' },
};

const PAYMENT_STATUS: Record<string, { label: string; color: string }> = {
    pending: { label: 'Due', color: 'text-amber-400' },
    paid: { label: 'Paid', color: 'text-[#00E676]' },
    overdue: { label: 'Overdue', color: 'text-red-400' },
};

export default function TenantDashboard({ auth, lease, next_payment, recent_requests }: Props) {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

    return (
        <>
            <Head title="Dashboard — SmartRental" />

            {/* Page wrapper — consistent padding that works inside AppContent's sidebar variant */}
            <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-6">

                {/* ── Greeting ── */}
                <div className="pt-1 pb-2">
                    <h2 className="text-xl font-semibold tracking-tight">
                        {greeting}, {auth.user.name.split(' ')[0]} 👋
                    </h2>
                    <p className="text-xs text-[#F0F6F8]/35 mt-1">
                        Maisha Hostels, B12
                    </p>
                </div>

                {/* ── Top cards ── */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Current rental */}
                    <div className="lg:col-span-2 bg-[#112630] border border-white/7 rounded-2xl p-6">
                        <div className="flex items-center gap-2 mb-5">
                            <Home size={13} className="text-[#00E676]" />
                            <h3 className="text-[11px] font-semibold text-[#F0F6F8]/50 uppercase tracking-widest">
                                My rental
                            </h3>
                        </div>

                        {lease ? (
                            <div className="space-y-4">
                                <div>
                                    <p className="text-base font-semibold leading-snug">{lease.property_title}</p>
                                    <p className="text-sm text-[#F0F6F8]/40 mt-0.5">{lease.property_location}</p>
                                </div>
                                <div className="flex flex-wrap gap-x-8 gap-y-3 pt-1">
                                    <div>
                                        <p className="text-[10px] text-[#F0F6F8]/30 mb-1 uppercase tracking-wider">Monthly rent</p>
                                        <p className="text-sm font-semibold text-[#00E676]">
                                            TZS {lease.rental_price.toLocaleString()}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-[#F0F6F8]/30 mb-1 uppercase tracking-wider">Lease start</p>
                                        <p className="text-sm">{lease.lease_start}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-[#F0F6F8]/30 mb-1 uppercase tracking-wider">Lease end</p>
                                        <p className="text-sm">{lease.lease_end}</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p className="text-sm text-[#F0F6F8]/30">No active lease found.</p>
                        )}
                    </div>

                    {/* Next payment */}
                    <div className="bg-[#112630] border border-white/7 rounded-2xl p-6 flex flex-col justify-between">
                        <div className="flex items-center gap-2 mb-5">
                            <Calendar size={13} className="text-[#00E676]" />
                            <h3 className="text-[11px] font-semibold text-[#F0F6F8]/50 uppercase tracking-widest">
                                Next payment
                            </h3>
                        </div>

                        {next_payment ? (
                            <div className="space-y-2">
                                <p className="text-2xl font-semibold text-[#00E676] tabular-nums">
                                    TZS {next_payment.amount.toLocaleString()}
                                </p>
                                <p className="text-xs text-[#F0F6F8]/40">Due {next_payment.due_date}</p>
                                <span className={`inline-block text-xs font-medium mt-1 ${PAYMENT_STATUS[next_payment.status]?.color ?? 'text-[#F0F6F8]/50'}`}>
                                    ● {PAYMENT_STATUS[next_payment.status]?.label}
                                </span>
                            </div>
                        ) : (
                            <p className="text-sm text-[#F0F6F8]/30">No upcoming payments.</p>
                        )}
                    </div>
                </div>

                {/* ── Quick actions ── */}
                <div className="grid grid-cols-3 gap-3">
                    {[
                        { href: '/tenant/payments', Icon: CreditCard, label: 'Pay rent' },
                        { href: '/tenant/maintenance/create', Icon: Wrench, label: 'Report issue' },
                        { href: '/tenant/contact', Icon: Phone, label: 'Contact landlord' },
                    ].map(({ href, Icon, label }) => (
                        <Link
                            key={href}
                            href={href}
                            className="bg-[#112630] border border-white/7 hover:border-[#00E676]/30 rounded-2xl px-4 py-5 flex flex-col items-center gap-2.5 text-center transition-all duration-150 group"
                        >
                            <Icon size={17} className="text-[#00E676]/60 group-hover:text-[#00E676] transition-colors" />
                            <span className="text-xs text-[#F0F6F8]/50 group-hover:text-[#F0F6F8]/80 transition-colors leading-snug">
                                {label}
                            </span>
                        </Link>
                    ))}
                </div>

                {/* ── Maintenance requests ── */}
                <div className="bg-[#112630] border border-white/7 rounded-2xl overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-white/6">
                        <div className="flex items-center gap-2">
                            <Wrench size={13} className="text-[#F0F6F8]/30" />
                            <h3 className="text-sm text-[#F0F6F8]/25">Maintenance requests</h3>
                        </div>
                        <Link
                            href="/tenant/maintenance"
                            className="text-xs text-[#00E676]/60 hover:text-[#00E676] transition-colors"
                        >
                            View all →
                        </Link>
                    </div>

                    {recent_requests.length === 0 ? (
                        <div className="py-12 text-center text-sm text-[#F0F6F8]/30">
                            No requests yet.{' '}
                            <Link href="/tenant/maintenance/create" className="text-[#00E676] hover:opacity-80">
                                Submit one →
                            </Link>
                        </div>
                    ) : (
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-[10px] text-[#F0F6F8]/25 uppercase tracking-widest">
                                    <th className="text-left px-6 py-3 font-medium">Issue</th>
                                    <th className="text-left px-6 py-3 font-medium hidden sm:table-cell">Submitted</th>
                                    <th className="text-right px-6 py-3 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recent_requests.map((r) => (
                                    <tr
                                        key={r.id}
                                        className="border-t border-white/4 hover:bg-white/[0.02] transition-colors"
                                    >
                                        <td className="px-6 py-3.5 font-medium truncate max-w-[200px]">{r.title}</td>
                                        <td className="px-6 py-3.5 text-[#F0F6F8]/40 text-xs hidden sm:table-cell">{r.created_at}</td>
                                        <td className="px-6 py-3.5 text-right">
                                            <span className={`text-xs font-medium ${REQUEST_STATUS[r.status]?.color ?? 'text-[#F0F6F8]/50'}`}>
                                                {REQUEST_STATUS[r.status]?.label ?? r.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

            </div>
        </>
    );
}
