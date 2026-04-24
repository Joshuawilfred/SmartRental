import { FadeIn } from "@/components/ui/Index";
import { FEATURES } from "@/types";

export function Features() {
    return (
        <section
            id="landlords"
            className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 py-24"
        >
            <FadeIn>
                <p className="text-xs uppercase tracking-widest text-[#F0F6F8]/28 mb-2">
                    Core features
                </p>
                <h2 className="font-display text-3xl md:text-4xl mb-3 tracking-tight">
                    Everything you need to manage
                    <br />
                    rentals in Tanzania
                </h2>
                <p className="text-[#F0F6F8]/45 text-sm leading-relaxed mb-14 max-w-lg font-light">
                    From listing to payment confirmation — a platform that works for both
                    urban and rural tenants.
                </p>
            </FadeIn>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {FEATURES.map((f, i) => (
                    <FadeIn key={f.title} delay={i * 70}>
                        <div className="glass-card noise rounded-xl p-5 h-full group relative overflow-hidden">
                            {/* Hover glow */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-500"
                                style={{
                                    background:
                                        "radial-gradient(circle at 30% 30%, rgba(0,230,118,0.05) 0%, transparent 70%)",
                                }}
                            />

                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-4 relative"
                                style={{
                                    background: "rgba(0,230,118,0.08)",
                                    border: "1px solid rgba(0,230,118,0.15)",
                                }}
                            >
                                <span className="group-hover:scale-110 transition-transform duration-300 inline-block">
                                    {f.icon}
                                </span>
                            </div>

                            <h3 className="text-sm font-semibold mb-1.5 text-[#F0F6F8]">
                                {f.title}
                            </h3>
                            <p className="text-xs text-[#F0F6F8]/42 leading-relaxed">{f.desc}</p>
                        </div>
                    </FadeIn>
                ))}
            </div>
        </section>
    );
}