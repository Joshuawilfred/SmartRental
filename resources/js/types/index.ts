export type * from './auth';
export type * from './navigation';
export type * from './ui';

export interface NavLink {
    label: string;
    href: string;
}

export interface Feature {
    icon: string;
    title: string;
    desc: string;
}

export interface Step {
    n: string;
    title: string;
    desc: string;
}

export interface Stat {
    val: number;
    suffix: string;
    label: string;
}

export const NAV_LINKS: NavLink[] = [
    { label: "For Landlords", href: "#landlords" },
    { label: "For Tenants", href: "#tenants" },
    { label: "USSD", href: "#ussd" },
    { label: "Pricing", href: "#pricing" },
];

export const FEATURES: Feature[] = [
    {
        icon: "🏢",
        title: "Property listings",
        desc: "Add capacity, pricing, amenities, images, rules, and availability. Full property lifecycle management.",
    },
    {
        icon: "📲",
        title: "USSD payments",
        desc: "Tenants pay via USSD — no smartphone required. Generate control numbers, verify, and confirm instantly.",
    },
    {
        icon: "💬",
        title: "Bulk SMS alerts",
        desc: "Automated rent reminders, receipts, and notices sent via Africa's Talking to all tenants at once.",
    },
    {
        icon: "👥",
        title: "Dual roles",
        desc: "Landlords manage properties and track payments. Tenants view their room, receipts, and history.",
    },
    {
        icon: "⭐",
        title: "Reviews & ratings",
        desc: "Build trust with verified tenant reviews, response rates, and transparent property ratings.",
    },
    {
        icon: "🔒",
        title: "Payment tracking",
        desc: "Track paid/pending status, cancellations, and payment methods. Full audit trail per tenant.",
    },
];

export const STEPS: Step[] = [
    { n: "1", title: "Dial the code", desc: "Tenant dials *384*SmartRental# from any network. No data needed." },
    { n: "2", title: "Enter room & password", desc: "Select room number and authenticate with their PIN." },
    { n: "3", title: "Generate control number", desc: "System generates a unique control number for this month's payment." },
    { n: "4", title: "Receive SMS receipt", desc: "Payment confirmed. Landlord and tenant both get instant SMS confirmation." },
];

export const HERO_STATS: Stat[] = [
    { val: 1200, suffix: "+", label: "Properties" },
    { val: 4800, suffix: "+", label: "Tenants" },
    { val: 98, suffix: "%", label: "On-time rent" },
];