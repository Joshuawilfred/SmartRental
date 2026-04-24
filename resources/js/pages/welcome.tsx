import { useState, useEffect } from "react";
import { Head, Link } from "@inertiajs/react";
import AppLogo from "@/components/app-logo";

const NAV_LINKS = [
    { label: "For Landlords", href: "#landlords" },
    { label: "For Tenants", href: "#tenants" },
    { label: "USSD", href: "#ussd" },
    { label: "Pricing", href: "#pricing" },
];

const FEATURES = [
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

const STEPS = [
    { n: "1", title: "Dial the code", desc: "Tenant dials *384*SmartRental# from any network. No data needed." },
    { n: "2", title: "Enter room & password", desc: "Select room number and authenticate with their PIN." },
    { n: "3", title: "Generate control number", desc: "System generates a unique control number for this month's payment." },
    { n: "4", title: "Receive SMS receipt", desc: "Payment confirmed. Landlord and tenant both get instant SMS confirmation." },
];

function Logo() {
    return (
        <div className="flex items-center gap-2.5">
           <AppLogo/>
        </div>
    );
}

function BlinkingCursor() {
    const [visible, setVisible] = useState(true);
    useEffect(() => {
        const t = setInterval(() => setVisible((v) => !v), 500);
        return () => clearInterval(t);
    }, []);
    return (
        <span
            className="inline-block w-2 h-[14px] bg-[#00E676] align-text-bottom"
            style={{ opacity: visible ? 1 : 0, transition: "opacity 0.1s" }}
        />
    );
}

export default function Welcome() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <>
            <Head title="SmartRental — Property management built for Africa" />

            <div className="min-h-screen bg-[#0B1F26] text-[#F0F6F8] font-sans overflow-x-hidden">

                {/* ── Nav ── */}
                <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 border-b border-[#00E676]/10 bg-[#0B1F26]/90 backdrop-blur-md">
                    <Logo />
                    <div className="hidden md:flex items-center gap-8 text-sm text-[#F0F6F8]/60">
                        {NAV_LINKS.map((l) => (
                            <a key={l.label} href={l.href} className="hover:text-[#00E676] transition-colors">
                                {l.label}
                            </a>
                        ))}
                    </div>
                    <div className="hidden md:flex items-center gap-3">
                        <Link
                            href="/login"
                            className="px-4 py-2 text-sm border border-[#00E676]/40 text-[#00E676] rounded-md hover:bg-[#00E676]/8 transition-colors"
                        >
                            Sign in
                        </Link>
                        <Link
                            href="/register"
                            className="px-5 py-2 text-sm font-semibold bg-[#00E676] text-[#0B1F26] rounded-md hover:opacity-90 transition-opacity"
                        >
                            Get started
                        </Link>
                    </div>
                    <button
                        className="md:hidden text-[#F0F6F8]/60 hover:text-[#F0F6F8]"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            {mobileOpen
                                ? <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                                : <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />}
                        </svg>
                    </button>
                </nav>

                {/* mobile menu */}
                {mobileOpen && (
                    <div className="md:hidden bg-[#112630] border-b border-white/6 px-6 py-4 flex flex-col gap-4 text-sm">
                        {NAV_LINKS.map((l) => (
                            <a key={l.label} href={l.href} className="text-[#F0F6F8]/60 hover:text-[#00E676]">{l.label}</a>
                        ))}
                        <div className="flex gap-3 pt-2">
                            <Link href="/login" className="flex-1 text-center py-2 border border-[#00E676]/40 text-[#00E676] rounded-md text-sm">Sign in</Link>
                            <Link href="/register" className="flex-1 text-center py-2 bg-[#00E676] text-[#0B1F26] rounded-md text-sm font-semibold">Register</Link>
                        </div>
                    </div>
                )}

                {/* ── Hero ── */}
                <section className="max-w-6xl mx-auto px-6 md:px-10 py-20 grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#00E676] bg-[#00E676]/8 border border-[#00E676]/25 px-3 py-1.5 rounded-full mb-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00E676]" />
                            Built for Africa
                        </div>
                        <h1 className="font-serif text-4xl md:text-5xl leading-[1.12] tracking-tight mb-5" style={{ fontFamily: "'Georgia', serif" }}>
                            Property management<br />
                            that works{" "}
                            <em className="text-[#00E676] not-italic font-normal" style={{ fontFamily: "'Georgia', serif", fontStyle: "italic" }}>
                                offline
                            </em>
                            <br />and online.
                        </h1>
                        <p className="text-base text-[#F0F6F8]/55 leading-relaxed mb-8 max-w-md">
                            Landlords list and manage rentals. Tenants pay via USSD — no smartphone required. Powered by Africa's Talking.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <Link
                                href="/register?role=landlord"
                                className="px-6 py-3 font-semibold bg-[#00E676] text-[#0B1F26] rounded-md hover:opacity-90 transition-opacity text-sm"
                            >
                                List your property
                            </Link>
                            <Link
                                href="/register?role=tenant"
                                className="px-6 py-3 text-sm border border-[#00E676]/35 text-[#00E676] rounded-md hover:bg-[#00E676]/8 transition-colors"
                            >
                                I'm a tenant →
                            </Link>
                        </div>
                        <p className="mt-3 text-xs text-[#F0F6F8]/30">Dial *384*SmartRental# from any phone</p>
                    </div>

                    {/* Mockup */}
                    <div className="bg-[#112630] border border-white/8 rounded-2xl p-6">
                        <div className="flex gap-1.5 mb-5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                        </div>
                        <div className="bg-[#0B1F26] border border-white/6 rounded-xl p-4 mb-3">
                            <div className="h-[90px] rounded-lg mb-3 flex items-center justify-center text-3xl"
                                style={{ background: "linear-gradient(135deg, #1A3D4A 0%, #0F4D38 100%)" }}>
                                🏠
                            </div>
                            <p className="text-sm font-semibold mb-1">Masaki Heights — Room 4B</p>
                            <p className="text-xs text-[#F0F6F8]/40">Masaki, Dar es Salaam · 2 bedrooms</p>
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-sm font-semibold text-[#00E676]">TZS 650,000/mo</span>
                                <span className="text-[10px] bg-[#00E676]/12 text-[#00E676] border border-[#00E676]/30 rounded px-2 py-0.5">Available</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 bg-[#00E676]/6 border border-[#00E676]/15 rounded-lg px-3 py-2.5 text-[11px] text-[#F0F6F8]/60">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00E676] flex-shrink-0" />
                            SMS sent: "Dear John, rent of TZS 650,000 due 30 Apr. Ref: SR-2048"
                        </div>
                        <div className="flex justify-between mt-3 text-[11px] text-[#F0F6F8]/30">
                            <span>2 properties · 4 tenants</span>
                            <span className="text-[#00E676]">All payments current ✓</span>
                        </div>
                    </div>
                </section>

                <hr className="border-white/6 mx-6 md:mx-10" />

                {/* ── Features ── */}
                <section id="landlords" className="max-w-6xl mx-auto px-6 md:px-10 py-20">
                    <p className="text-xs uppercase tracking-widest text-[#F0F6F8]/30 mb-1">Core features</p>
                    <h2 className="font-serif text-3xl md:text-4xl mb-2 tracking-tight" style={{ fontFamily: "'Georgia', serif" }}>
                        Everything you need to manage rentals in Tanzania
                    </h2>
                    <p className="text-[#F0F6F8]/50 text-sm leading-relaxed mb-12 max-w-lg">
                        From listing to payment confirmation — a platform that works for both urban and rural tenants.
                    </p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {FEATURES.map((f) => (
                            <div key={f.title} className="bg-[#112630] border border-white/7 rounded-xl p-5">
                                <div className="w-10 h-10 bg-[#00E676]/10 rounded-lg flex items-center justify-center text-lg mb-4">
                                    {f.icon}
                                </div>
                                <h3 className="text-sm font-semibold mb-1.5">{f.title}</h3>
                                <p className="text-xs text-[#F0F6F8]/45 leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <hr className="border-white/6 mx-6 md:mx-10" />

                {/* ── USSD How it works ── */}
                <section id="ussd" className="max-w-6xl mx-auto px-6 md:px-10 py-20 grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <p className="text-xs uppercase tracking-widest text-[#F0F6F8]/30 mb-1">How USSD works</p>
                        <h2 className="font-serif text-3xl md:text-4xl mb-3 tracking-tight" style={{ fontFamily: "'Georgia', serif" }}>
                            Pay rent from any phone in Tanzania
                        </h2>
                        <p className="text-[#F0F6F8]/50 text-sm leading-relaxed mb-10">
                            Tenants don't need a smartphone or internet. The USSD flow handles everything.
                        </p>
                        <div className="flex flex-col gap-6">
                            {STEPS.map((s) => (
                                <div key={s.n} className="flex gap-4 items-start">
                                    <div className="w-7 h-7 rounded-full bg-[#00E676]/12 border border-[#00E676]/30 text-[#00E676] text-xs font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">
                                        {s.n}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold mb-0.5">{s.title}</p>
                                        <p className="text-xs text-[#F0F6F8]/45 leading-relaxed">{s.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* USSD terminal mockup */}
                    <div className="bg-[#112630] border border-white/8 rounded-xl p-6 font-mono text-sm">
                        <div className="flex justify-between text-[10px] uppercase tracking-widest text-[#F0F6F8]/30 mb-4">
                            <span>USSD Session</span>
                            <span className="text-[#00E676]">● Active</span>
                        </div>
                        <p className="text-[#F0F6F8]/75 mb-1.5">CON Welcome to SmartRental</p>
                        {["1. Pay Rent", "2. Check Balance", "3. View Receipt", "4. Contact Landlord"].map((l) => (
                            <p key={l} className="text-[#F0F6F8]/40 mb-1 text-xs">{l}</p>
                        ))}
                        <div className="border-t border-white/8 mt-4 pt-4 text-[#00E676]">
                            &gt; 1<BlinkingCursor />
                        </div>
                        <div className="mt-4 bg-[#00E676]/6 border border-[#00E676]/15 rounded-lg p-3">
                            <p className="text-[10px] text-[#F0F6F8]/35 mb-1">Control number generated</p>
                            <p className="text-[#00E676] text-base tracking-widest">SR-2048-9341</p>
                            <p className="text-[10px] text-[#F0F6F8]/35 mt-1">TZS 650,000 · Room 4B</p>
                        </div>
                    </div>
                </section>

                {/* ── CTA ── */}
                <section className="mx-6 md:mx-10 mb-20 rounded-2xl border border-[#00E676]/15 px-8 md:px-16 py-16 text-center"
                    style={{ background: "linear-gradient(135deg, #112630 0%, #0F3D2A 100%)" }}>
                    <h2 className="font-serif text-3xl md:text-4xl mb-3 tracking-tight" style={{ fontFamily: "'Georgia', serif" }}>
                        Ready to modernize your rentals?
                    </h2>
                    <p className="text-[#F0F6F8]/50 text-sm mb-8 max-w-md mx-auto">
                        Join landlords across Tanzania managing properties smarter — and tenants paying rent from any phone.
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center">
                        <Link
                            href="/register?role=landlord"
                            className="px-7 py-3 font-semibold bg-[#00E676] text-[#0B1F26] rounded-md hover:opacity-90 transition-opacity text-sm"
                        >
                            Register as landlord
                        </Link>
                        <Link
                            href="/register?role=tenant"
                            className="px-7 py-3 text-sm border border-[#00E676]/35 text-[#00E676] rounded-md hover:bg-[#00E676]/8 transition-colors"
                        >
                            I'm a tenant
                        </Link>
                    </div>
                </section>

                {/* ── Footer ── */}
                <footer className="border-t border-white/6 px-6 md:px-10 py-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-[#F0F6F8]/30">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-[#00E676]">Smart<span className="text-[#F0F6F8]/40">Rental</span></span>
                        <span>· Powered by Africa's Talking</span>
                    </div>
                    <span>© {new Date().getFullYear()} SmartRental · Dar es Salaam, Tanzania</span>
                </footer>

            </div>
        </>
    );
}