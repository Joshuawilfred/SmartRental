import { FadeIn, BlinkingCursor, GlowDot } from "@/components/ui/Index";
import { STEPS } from "@/types";

const USSD_MENU_ITEMS = [
    "1. Pay Rent",
    "2. Check Balance",
    "3. View Receipt",
    "4. Contact Landlord",
];

function UssdTerminal() {
    return (
        <FadeIn delay={150}>
            <div className="glass-card noise rounded-xl p-6 font-mono text-sm relative float-med overflow-hidden">
                {/* Top accent */}
                <div
                    className="absolute top-0 left-6 right-6 h-px"
                    style={{
                        background:
                            "linear-gradient(90deg, transparent, rgba(0,230,118,0.35), transparent)",
                    }}
                />

                <div className="flex justify-between text-[10px] uppercase tracking-widest text-[#F0F6F8]/28 mb-5">
                    <span>USSD Session</span>
                    <span className="flex items-center gap-1.5">
                        <GlowDot size={5} />
                        <span className="text-[#00E676]">Active</span>
                    </span>
                </div>

                <p className="text-[#F0F6F8]/70 mb-2 text-xs">CON Welcome to SmartRental</p>

                {USSD_MENU_ITEMS.map((item, i) => (
                    <p
                        key={item}
                        className="text-[#F0F6F8]/38 mb-1 text-xs ussd-line"
                        style={{ animationDelay: `${i * 0.1 + 0.2}s` }}
                    >
                        {item}
                    </p>
                ))}

                <div
                    className="border-t mt-4 pt-4 text-[#00E676] text-xs"
                    style={{ borderColor: "rgba(255,255,255,0.06)" }}
                >
                    &gt; 1
                    <BlinkingCursor />
                </div>

                {/* Control number box */}
                <div
                    className="mt-4 rounded-xl p-3 relative overflow-hidden"
                    style={{
                        background: "rgba(0,230,118,0.06)",
                        border: "1px solid rgba(0,230,118,0.15)",
                    }}
                >
                    <p className="text-[10px] text-[#F0F6F8]/32 mb-1.5 uppercase tracking-widest">
                        Control number generated
                    </p>
                    <p className="text-[#00E676] text-lg tracking-[0.2em] font-semibold">
                        SR-2048-9341
                    </p>
                    <p className="text-[10px] text-[#F0F6F8]/32 mt-1">
                        TZS 650,000 · Room 4B · Apr 2025
                    </p>
                    {/* Shimmer sweep */}
                    <div
                        className="absolute inset-0 rounded-xl"
                        style={{
                            background:
                                "linear-gradient(90deg, transparent 0%, rgba(0,230,118,0.06) 50%, transparent 100%)",
                            backgroundSize: "200% 100%",
                            animation: "shimmer 2.5s linear infinite",
                        }}
                    />
                </div>

                {/* Floating SMS tag */}
                <div
                    className="absolute -bottom-3 -right-3 glass text-[10px] px-3 py-1.5 rounded-lg float-fast"
                    style={{ border: "1px solid rgba(0,230,118,0.18)" }}
                >
                    <span className="text-[#00E676]">✓ SMS sent</span>
                </div>
            </div>
        </FadeIn>
    );
}

export function UssdSection() {
    return (
        <section
            id="ussd"
            className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 py-24 grid md:grid-cols-2 gap-16 items-center"
        >
            <FadeIn>
                <div>
                    <p className="text-xs uppercase tracking-widest text-[#F0F6F8]/28 mb-2">
                        How USSD works
                    </p>
                    <h2 className="font-display text-3xl md:text-4xl mb-4 tracking-tight">
                        Pay rent from any phone
                        <br />
                        in Tanzania
                    </h2>
                    <p className="text-[#F0F6F8]/45 text-sm leading-relaxed mb-12 font-light">
                        Tenants don't need a smartphone or internet. The USSD flow handles
                        everything.
                    </p>

                    <div className="flex flex-col gap-6">
                        {STEPS.map((s, i) => (
                            <div
                                key={s.n}
                                className={`flex gap-4 items-start relative ${
                                    i < STEPS.length - 1 ? "step-line" : ""
                                }`}
                            >
                                <div
                                    className="w-7 h-7 rounded-full text-[#00E676] text-xs font-semibold flex items-center justify-center flex-shrink-0 mt-0.5"
                                    style={{
                                        background: "rgba(0,230,118,0.1)",
                                        border: "1px solid rgba(0,230,118,0.28)",
                                        boxShadow: "0 0 0 4px rgba(0,230,118,0.04)",
                                    }}
                                >
                                    {s.n}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold mb-0.5">{s.title}</p>
                                    <p className="text-xs text-[#F0F6F8]/42 leading-relaxed">
                                        {s.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </FadeIn>

            <UssdTerminal />
        </section>
    );
}