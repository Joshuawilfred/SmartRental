import { Link } from "@inertiajs/react";
import { CountUp, GlowDot } from "@/components/ui/Index";
import { HERO_STATS } from "@/types";

// ── Mockup card ───────────────────────────────────────────────────────────────

function HeroMockup() {
    return (
        <div className="hero-mockup relative">
            {/* Glow behind card */}
            <div
                className="absolute inset-0 -z-10 rounded-2xl blur-3xl opacity-20"
                style={{ background: "radial-gradient(circle, #00E676 0%, transparent 70%)" }}
            />

            <div className="glass-card noise rounded-2xl p-6 relative overflow-hidden">
                {/* Top accent line */}
                <div
                    className="absolute top-0 left-6 right-6 h-px"
                    style={{
                        background:
                            "linear-gradient(90deg, transparent, rgba(0,230,118,0.4), transparent)",
                    }}
                />

                {/* Traffic lights */}
                <div className="flex gap-1.5 mb-5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                </div>

                {/* Property card */}
                <div className="bg-[#0B1F26]/60 border border-white/6 rounded-xl p-4 mb-3 relative overflow-hidden">
                    <div
                        className="absolute inset-0 opacity-30 rounded-xl"
                        style={{
                            background:
                                "linear-gradient(135deg, rgba(0,230,118,0.05) 0%, transparent 60%)",
                        }}
                    />
                    <div
                        className="h-[88px] rounded-lg mb-3 flex items-center justify-center text-3xl relative overflow-hidden"
                        style={{
                            background: "linear-gradient(135deg, #1A3D4A 0%, #0F4D38 100%)",
                        }}
                    >
                        <span className="float-slow inline-block">🏠</span>
                        <div
                            className="absolute inset-0 opacity-30"
                            style={{
                                background:
                                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)",
                                backgroundSize: "200% 100%",
                                animation: "shimmer 3s linear infinite",
                            }}
                        />
                    </div>
                    <p className="text-sm font-semibold mb-1">Masaki Heights — Room 4B</p>
                    <p className="text-xs text-[#F0F6F8]/40">
                        Masaki, Dar es Salaam · 2 bedrooms
                    </p>
                    <div className="flex justify-between items-center mt-2">
                        <span className="text-sm font-semibold text-[#00E676]">
                            TZS 650,000
                            <span className="text-[#F0F6F8]/30 font-normal">/mo</span>
                        </span>
                        <span
                            className="text-[10px] px-2 py-0.5 rounded-full"
                            style={{
                                background: "rgba(0,230,118,0.1)",
                                border: "1px solid rgba(0,230,118,0.28)",
                                color: "#00E676",
                            }}
                        >
                            Available
                        </span>
                    </div>
                </div>

                {/* SMS preview */}
                <div
                    className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-[11px] text-[#F0F6F8]/55 mb-3"
                    style={{
                        background: "rgba(0,230,118,0.05)",
                        border: "1px solid rgba(0,230,118,0.12)",
                    }}
                >
                    <GlowDot size={5} />
                    SMS sent: "Dear John, rent of TZS 650,000 due 30 Apr. Ref: SR-2048"
                </div>

                <div className="flex justify-between text-[11px] text-[#F0F6F8]/28">
                    <span>2 properties · 4 tenants</span>
                    <span className="text-[#00E676]/70">All payments current ✓</span>
                </div>

                {/* Floating badge */}
                <div
                    className="absolute -top-3 -right-3 glass rounded-xl px-3 py-2 text-[10px] float-fast shadow-xl"
                    style={{ border: "1px solid rgba(0,230,118,0.2)" }}
                >
                    <span className="text-[#00E676] font-semibold">+12</span>
                    <span className="text-[#F0F6F8]/40 ml-1">payments today</span>
                </div>
            </div>
        </div>
    );
}

// ── Hero ──────────────────────────────────────────────────────────────────────

export function Hero() {
    return (
        <section className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 py-24 grid md:grid-cols-2 gap-16 items-center">
            <div>
                {/* Badge */}
                <div
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#00E676] px-3 py-1.5 rounded-full mb-7 badge-pulse"
                    style={{
                        background: "rgba(0,230,118,0.07)",
                        border: "1px solid rgba(0,230,118,0.22)",
                    }}
                >
                    <GlowDot />
                    Built for Africa
                </div>

                {/* Headline */}
                <h1 className="font-display text-[2.8rem] md:text-[3.5rem] leading-[1.08] tracking-tight mb-5">
                    Property management
                    <br />
                    that works{" "}
                    <em className="shimmer-text not-italic">offline</em>
                    <br />
                    and online.
                </h1>

                <p className="text-base text-[#F0F6F8]/50 leading-relaxed mb-8 max-w-md font-light">
                    Landlords list and manage rentals. Tenants pay via USSD — no smartphone
                    required. Powered by Africa's Talking.
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3 mb-6">
                    <Link
                        href="/register?role=landlord"
                        className="btn-primary px-6 py-3 font-semibold rounded-lg text-sm inline-block"
                    >
                        List your property
                    </Link>
                    <Link
                        href="/register?role=tenant"
                        className="btn-outline px-6 py-3 text-sm rounded-lg inline-block"
                    >
                        I'm a tenant →
                    </Link>
                </div>

                <p className="text-xs text-[#F0F6F8]/25 font-mono tracking-wide">
                    Dial{" "}
                    <span className="text-[#00E676]/60">*384*SmartRental#</span> from any
                    phone
                </p>

                {/* Stats */}
                <div className="flex gap-4 mt-10">
                    {HERO_STATS.map((s) => (
                        <div key={s.label} className="stat-card rounded-xl px-4 py-3 text-center">
                            <p className="text-[#00E676] font-display text-xl leading-none mb-0.5">
                                <CountUp target={s.val} suffix={s.suffix} />
                            </p>
                            <p className="text-[10px] text-[#F0F6F8]/35 uppercase tracking-widest">
                                {s.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <HeroMockup />
        </section>
    );
}