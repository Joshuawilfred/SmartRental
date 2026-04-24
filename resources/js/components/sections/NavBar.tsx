import { Link } from "@inertiajs/react";

import { useState, useEffect } from "react";
import AppLogo from "@/components/app-logo";
import { NAV_LINKS } from "@/types";

export function NavBar() {
    const [mobileOpen, setMobileOpen] = useState<boolean>(false);
    const [scrolled, setScrolled] = useState<boolean>(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });

        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <>
            <nav
                className={`sticky top-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 transition-all duration-300 ${
                    scrolled ? "glass border-b border-[#00E676]/10" : "bg-transparent"
                }`}
            >
                <div className="flex items-center gap-2.5">
                    <AppLogo />
                </div>

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-8 text-sm text-[#F0F6F8]/55">
                    {NAV_LINKS.map((l) => (
                        <a key={l.label} href={l.href} className="nav-link">
                            {l.label}
                        </a>
                    ))}
                </div>

                {/* Desktop CTAs */}
                <div className="hidden md:flex items-center gap-3">
                    <Link
                        href="/login"
                        className="btn-outline px-4 py-2 text-sm rounded-lg font-medium"
                    >
                        Sign in
                    </Link>
                    <Link
                        href="/register"
                        className="btn-primary px-5 py-2 text-sm font-semibold rounded-lg"
                    >
                        Get started
                    </Link>
                </div>

                {/* Hamburger */}
                <button
                    className="md:hidden text-[#F0F6F8]/60 hover:text-[#F0F6F8] transition-colors"
                    onClick={() => setMobileOpen((o) => !o)}
                    aria-label="Toggle menu"
                >
                    <svg
                        width="22"
                        height="22"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                    >
                        {mobileOpen ? (
                            <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </nav>

            {/* Mobile drawer */}
            {mobileOpen && (
                <div className="md:hidden glass border-b border-white/6 px-6 py-5 flex flex-col gap-4 text-sm z-40 relative">
                    {NAV_LINKS.map((l) => (
                        <a
                            key={l.label}
                            href={l.href}
                            className="text-[#F0F6F8]/55 hover:text-[#00E676] transition-colors"
                        >
                            {l.label}
                        </a>
                    ))}
                    <div className="flex gap-3 pt-2">
                        <Link
                            href="/login"
                            className="btn-outline flex-1 text-center py-2 rounded-lg text-sm"
                        >
                            Sign in
                        </Link>
                        <Link
                            href="/register"
                            className="btn-primary flex-1 text-center py-2 rounded-lg text-sm font-semibold"
                        >
                            Register
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
}