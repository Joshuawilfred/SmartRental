import { useState, ReactNode } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { PageProps } from '@/types';

interface NavItem {
    label: string;
    href: string;
    routePrefix: string;
    icon: ReactNode;
    badge?: number;
}

function HomeIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
            <path d="M9 21V12h6v9" />
        </svg>
    );
}
function BuildingIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 9h18M9 21V9" />
        </svg>
    );
}
function UsersIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    );
}
function CreditCardIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="4" width="22" height="16" rx="2" />
            <path d="M1 10h22" />
        </svg>
    );
}
function MessageIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
    );
}
function SettingsIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
    );
}

const NAV: NavItem[] = [
    { label: 'Dashboard', href: '/landlord/dashboard', routePrefix: 'landlord.dashboard', icon: <HomeIcon /> },
    { label: 'Properties', href: '/landlord/properties', routePrefix: 'landlord.properties', icon: <BuildingIcon /> },
    { label: 'Tenants', href: '/landlord/tenants', routePrefix: 'landlord.tenants', icon: <UsersIcon /> },
    { label: 'Payments', href: '/landlord/payments', routePrefix: 'landlord.payments', icon: <CreditCardIcon /> },
    { label: 'SMS & Alerts', href: '/landlord/sms', routePrefix: 'landlord.sms', icon: <MessageIcon /> },
    { label: 'Settings', href: '/landlord/settings', routePrefix: 'landlord.settings', icon: <SettingsIcon /> },
];

function Logo() {
    return (
        <div className="flex items-center gap-2.5 px-5 py-4 border-b border-white/6">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <path d="M16 2L3 12v16h8v-8h10v8h8V12L16 2z" fill="#2D5F6E" />
                <path d="M16 2L26 10L20 4z" fill="#00E676" opacity="0.9" />
                <rect x="12" y="14" width="3" height="3" rx="0.5" fill="#00E676" opacity="0.7" />
                <rect x="17" y="14" width="3" height="3" rx="0.5" fill="#00E676" opacity="0.7" />
                <rect x="12" y="19" width="3" height="3" rx="0.5" fill="#00E676" opacity="0.5" />
                <rect x="17" y="19" width="3" height="3" rx="0.5" fill="#00E676" opacity="0.5" />
            </svg>
            <span className="text-[16px] font-semibold tracking-tight text-[#F0F6F8]">
                Smart<span className="text-[#00E676]">Rental</span>
            </span>
        </div>
    );
}

interface Props {
    children: ReactNode;
    title?: string;
}

export default function LandlordLayout({ children, title }: Props) {
    const { auth, flash } = usePage<PageProps>().props;
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const url = usePage().url;

    const isActive = (item: NavItem) => url.startsWith(item.href);

    const handleLogout = () => {
        router.post('/logout');
    };

    const sidebar = (
        <aside
            className={`flex flex-col h-full bg-[#0D2028] border-r border-white/6 transition-all duration-200 ${collapsed ? 'w-[60px]' : 'w-[220px]'
                }`}
        >
            <Logo />

            {/* Nav items */}
            <nav className="flex-1 py-4 overflow-y-auto">
                {NAV.map((item) => {
                    const active = isActive(item);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`
                                flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg text-[13px] font-medium transition-all mb-0.5
                                ${active
                                    ? 'bg-[#00E676]/12 text-[#00E676] border border-[#00E676]/20'
                                    : 'text-[#F0F6F8]/50 hover:text-[#F0F6F8] hover:bg-white/5'
                                }
                            `}
                            title={collapsed ? item.label : undefined}
                        >
                            <span className="flex-shrink-0">{item.icon}</span>
                            {!collapsed && (
                                <span className="truncate">{item.label}</span>
                            )}
                            {!collapsed && item.badge ? (
                                <span className="ml-auto text-[10px] bg-[#00E676] text-[#0B1F26] font-bold px-1.5 py-0.5 rounded-full">
                                    {item.badge}
                                </span>
                            ) : null}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom: user + collapse toggle */}
            <div className="border-t border-white/6 p-3">
                {!collapsed && (
                    <div className="flex items-center gap-2.5 px-2 py-2 mb-2">
                        <div className="w-7 h-7 rounded-full bg-[#00E676]/15 border border-[#00E676]/25 flex items-center justify-center text-[11px] font-semibold text-[#00E676] flex-shrink-0">
                            {auth.user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                            <p className="text-[12px] font-medium text-[#F0F6F8] truncate">{auth.user.name}</p>
                            <p className="text-[10px] text-[#F0F6F8]/35 truncate">{auth.user.email}</p>
                        </div>
                    </div>
                )}
                <button
                    onClick={handleLogout}
                    className={`
                        w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12px] text-[#F0F6F8]/40 hover:text-red-400 hover:bg-red-400/8 transition-colors
                        ${collapsed ? 'justify-center' : ''}
                    `}
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
                    </svg>
                    {!collapsed && <span>Sign out</span>}
                </button>
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="w-full flex items-center justify-center mt-1 py-1.5 rounded-lg text-[#F0F6F8]/20 hover:text-[#F0F6F8]/50 transition-colors"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        {collapsed
                            ? <path d="M9 18l6-6-6-6" />
                            : <path d="M15 18l-6-6 6-6" />
                        }
                    </svg>
                </button>
            </div>
        </aside>
    );

    return (
        <div className="flex h-screen bg-[#0B1F26] text-[#F0F6F8] font-sans overflow-hidden">
            {/* Desktop sidebar */}
            <div className="hidden md:flex flex-col h-full flex-shrink-0">
                {sidebar}
            </div>

            {/* Mobile sidebar overlay */}
            {mobileOpen && (
                <div className="md:hidden fixed inset-0 z-50 flex">
                    <div className="flex flex-col h-full">{sidebar}</div>
                    <div className="flex-1 bg-black/50" onClick={() => setMobileOpen(false)} />
                </div>
            )}

            {/* Main content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Topbar */}
                <header className="flex items-center justify-between px-6 py-3.5 border-b border-white/6 bg-[#0B1F26] flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <button
                            className="md:hidden text-[#F0F6F8]/50 hover:text-[#F0F6F8]"
                            onClick={() => setMobileOpen(true)}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        {title && (
                            <h1 className="text-[15px] font-semibold text-[#F0F6F8]">{title}</h1>
                        )}
                    </div>
                    <div className="flex items-center gap-3">
                        {/* Notification bell stub */}
                        <button className="text-[#F0F6F8]/40 hover:text-[#F0F6F8] transition-colors">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
                            </svg>
                        </button>
                    </div>
                </header>

                {/* Flash messages */}
                {flash?.success && (
                    <div className="mx-6 mt-4 flex items-center gap-2 text-sm bg-[#00E676]/10 border border-[#00E676]/25 text-[#00E676] px-4 py-2.5 rounded-lg">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {flash.success}
                    </div>
                )}
                {flash?.error && (
                    <div className="mx-6 mt-4 flex items-center gap-2 text-sm bg-red-500/10 border border-red-500/25 text-red-400 px-4 py-2.5 rounded-lg">
                        {flash.error}
                    </div>
                )}

                {/* Page content */}
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}