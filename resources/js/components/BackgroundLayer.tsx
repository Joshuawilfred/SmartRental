// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { useState, useEffect, CSSProperties } from "react";

function AmbientOrbs() {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden>
            <div
                className="orb-1 absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full"
                style={{
                    background: "radial-gradient(circle, rgba(0,230,118,0.07) 0%, transparent 70%)",
                }}
            />
            <div
                className="orb-2 absolute bottom-[10%] right-[-8%] w-[600px] h-[600px] rounded-full"
                style={{
                    background:
                        "radial-gradient(circle, rgba(45,95,110,0.15) 0%, transparent 70%)",
                }}
            />
            <div
                className="orb-3 absolute top-[40%] left-[30%] w-[300px] h-[300px] rounded-full"
                style={{
                    background: "radial-gradient(circle, rgba(0,230,118,0.04) 0%, transparent 70%)",
                }}
            />
        </div>
    );
}

function MouseGlow() {
    const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

    useEffect(() => {
        const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
        window.addEventListener("mousemove", onMove, { passive: true });
        
        return () => window.removeEventListener("mousemove", onMove);
    }, []);

    const style: CSSProperties = {
        left: pos.x - 250,
        top: pos.y - 250,
        background: "radial-gradient(circle, rgba(0,230,118,0.04) 0%, transparent 70%)",
        transition: "left 0.4s ease, top 0.4s ease",
    };

    return (
        <div
            className="fixed pointer-events-none z-0 w-[500px] h-[500px] rounded-full"
            style={style}
            aria-hidden
        />
    );
}

export function BackgroundLayer() {
    return (
        <>
            <AmbientOrbs />
            <div
                className="fixed inset-0 pointer-events-none z-0 grid-bg opacity-60"
                aria-hidden
            />
            <MouseGlow />
        </>
    );
}