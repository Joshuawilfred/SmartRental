import { useState, useEffect, useRef, ReactNode, CSSProperties } from "react";

// ── BlinkingCursor ────────────────────────────────────────────────────────────

export function BlinkingCursor() {
    const [visible, setVisible] = useState<boolean>(true);

    useEffect(() => {
        const t = setInterval(() => setVisible((v) => !v), 530);
        return () => clearInterval(t);
    }, []);

    return (
        <span
            className="inline-block w-[7px] h-[13px] bg-[#00E676] align-text-bottom ml-0.5"
            style={{ opacity: visible ? 1 : 0, transition: "opacity 0.08s" }}
        />
    );
}

// ── GlowDot ───────────────────────────────────────────────────────────────────

interface GlowDotProps {
    size?: number;
}

export function GlowDot({ size = 6 }: GlowDotProps) {
    return (
        <div
            className="glow-dot flex-shrink-0"
            style={{ width: size, height: size }}
        />
    );
}

// ── useFadeIn hook ────────────────────────────────────────────────────────────

export function useFadeIn(threshold = 0.15): [React.RefObject<HTMLDivElement>, boolean] {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState<boolean>(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    obs.disconnect();
                }
            },
            { threshold }
        );

        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);

    return [ref, visible];
}

// ── FadeIn wrapper ────────────────────────────────────────────────────────────

interface FadeInProps {
    children: ReactNode;
    delay?: number;
    className?: string;
}

export function FadeIn({ children, delay = 0, className = "" }: FadeInProps) {
    const [ref, visible] = useFadeIn();

    const style: CSSProperties = {
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(22px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
    };

    return (
        <div ref={ref} className={className} style={style}>
            {children}
        </div>
    );
}

// ── CountUp ───────────────────────────────────────────────────────────────────

interface CountUpProps {
    target: number;
    suffix?: string;
}

export function CountUp({ target, suffix = "" }: CountUpProps) {
    const [val, setVal] = useState<number>(0);
    const [ref, visible] = useFadeIn(0.3);

    useEffect(() => {
        if (!visible) return;
        let current = 0;
        const step = Math.ceil(target / 40);

        const t = setInterval(() => {
            current += step;
            if (current >= target) {
                setVal(target);
                clearInterval(t);
            } else {
                setVal(current);
            }
        }, 30);

        return () => clearInterval(t);
    }, [visible, target]);

    return (
        <span ref={ref}>
            {val.toLocaleString()}
            {suffix}
        </span>
    );
}

// ── Divider ───────────────────────────────────────────────────────────────────

export function GreenDivider() {
    return (
        <div className="relative z-10 mx-6 md:mx-10">
            <div
                className="h-px"
                style={{
                    background:
                        "linear-gradient(90deg, transparent, rgba(0,230,118,0.15), transparent)",
                }}
            />
        </div>
    );
}