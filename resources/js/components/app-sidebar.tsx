import { Link, usePage } from '@inertiajs/react';
import {
    BookOpen,
    Building2,
    CreditCard,
    FolderGit2,
    LayoutGrid,
    MessageSquare,
    Settings,
    Users,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';

import landlord from '@/routes/landlord';
import tenant from '@/routes/tenant';
import type { NavItem } from '@/types';
import type { PageProps } from '@/types';

// ── Nav definitions ───────────────────────────────────────────────────────────

const landlordNavItems: NavItem[] = [
    { title: 'Dashboard', href: landlord.dashboard(), icon: LayoutGrid },
    { title: 'Properties', href: landlord.properties.index(), icon: Building2 },
    { title: 'Tenants', href: landlord.tenants.index(), icon: Users },
    { title: 'Payments', href: landlord.payments.index(), icon: CreditCard },
    { title: 'SMS & Alerts', href: landlord.sms.index(), icon: MessageSquare },
    { title: 'Settings', href: landlord.settings.index(), icon: Settings },
];

const tenantNavItems: NavItem[] = [
    { title: 'Dashboard',    href: tenant.dashboard(),           icon: LayoutGrid },
    { title: 'Payments',     href: '#',           icon: CreditCard },
    { title: 'Maintenance',  href: '#',        icon: MessageSquare },
];

const footerNavItems: NavItem[] = [
    { title: 'Customer Support', href: '#', icon: FolderGit2 },
    { title: 'Room Management', href: '#', icon: BookOpen },
];

// ── Component ─────────────────────────────────────────────────────────────────

export function AppSidebar() {
    const { auth } = usePage<PageProps>().props;
    const isLandlord = auth.user.role === 'landlord';

    const mainNavItems = isLandlord ? landlordNavItems : tenantNavItems;
    const homePath = isLandlord ? landlord.dashboard() : tenant.dashboard();

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={homePath} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
