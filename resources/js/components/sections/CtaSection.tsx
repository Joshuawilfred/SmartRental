import { Link } from "@inertiajs/react";
import { FadeIn, GlowDot } from "@/components/ui/Index";

export function CtaSection() {
    return (
        <FadeIn>
            <section
                className="relative z-10 mx-6 md:mx-10 mb-24 rounded-2xl px-8 md:px-16 py-20 text-center overflow-hidden noise"
                style={{
                    background:
                        "linear-gradient(135deg, rgba(17,38,48,0.9) 0%, rgba(15,61,42,0.7) 100%)",
                    border: "1px solid rgba(0,230,118,0.12)",
                }}
            >
                {/* Accent lines */}
                <div
                    className="absolute top-0 left-1/4 right-1/4 h-px"
                    style={{
                        background:
                            "linear-gradient(90deg, transparent, rgba(0,230,118,0.4), transparent)",
                    }}
                />
                <div
                    className="absolute bottom-0 left-1/4 right-1/4 h-px"
                    style={{
                        background:
                            "linear-gradient(90deg, transparent, rgba(0,230,118,0.2), transparent)",
                    }}
                />

                {/* Background orb */}
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[300px] -z-0 orb-3"
                    style={{
                        background:
                            "radial-gradient(ellipse, rgba(0,230,118,0.07) 0%, transparent 70%)",
                    }}
                />

                <div className="relative z-10">
                    <div
                        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#00E676] px-3 py-1.5 rounded-full mb-5"
                        style={{
                            background: "rgba(0,230,118,0.06)",
                            border: "1px solid rgba(0,230,118,0.2)",
                        }}
                    >
                        <GlowDot size={5} />
                        Get started today
                    </div>

                    <h2 className="font-display text-3xl md:text-[2.6rem] mb-3 tracking-tight">
                        Ready to modernize your rentals?
                    </h2>

                    <p className="text-[#F0F6F8]/45 text-sm mb-10 max-w-md mx-auto font-light leading-relaxed">
                        Join landlords across Tanzania managing properties smarter — and
                        tenants paying rent from any phone.
                    </p>

                    <div className="flex flex-wrap gap-3 justify-center">
                        <Link
                            href="/register?role=landlord"
                            className="btn-primary px-8 py-3.5 font-semibold rounded-lg text-sm inline-block"
                        >
                            Register as landlord
                        </Link>
                        <Link
                            href="/register?role=tenant"
                            className="btn-outline px-8 py-3.5 text-sm rounded-lg inline-block"
                        >
                            I'm a tenant
                        </Link>
                    </div>
                </div>
            </section>
        </FadeIn>
    );
}