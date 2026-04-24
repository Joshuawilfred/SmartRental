const globalStyles = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

    * { box-sizing: border-box; }
    body { background: #0B1F26; }

    .font-display { font-family: 'DM Serif Display', Georgia, serif; }
    .font-body   { font-family: 'DM Sans', system-ui, sans-serif; }

    @keyframes float-slow {
        0%, 100% { transform: translateY(0px) scale(1); }
        50%       { transform: translateY(-18px) scale(1.04); }
    }
    @keyframes float-med {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        33%       { transform: translateY(-12px) rotate(2deg); }
        66%       { transform: translateY(8px) rotate(-1deg); }
    }
    @keyframes pulse-ring {
        0%, 100% { box-shadow: 0 0 0 0 rgba(0,230,118,0.18); }
        50%       { box-shadow: 0 0 0 16px rgba(0,230,118,0); }
    }
    @keyframes shimmer {
        0%   { background-position: -200% center; }
        100% { background-position:  200% center; }
    }
    @keyframes orb-drift-1 {
        0%, 100% { transform: translate(0,0) scale(1); }
        33%      { transform: translate(30px,-40px) scale(1.08); }
        66%      { transform: translate(-20px, 20px) scale(0.95); }
    }
    @keyframes orb-drift-2 {
        0%, 100% { transform: translate(0,0) scale(1); }
        40%      { transform: translate(-50px, 30px) scale(1.12); }
        80%      { transform: translate(20px,-20px) scale(0.9); }
    }
    @keyframes orb-drift-3 {
        0%, 100% { transform: translate(0,0); }
        50%      { transform: translate(40px, -30px); }
    }
    @keyframes badge-glow {
        0%, 100% { box-shadow: 0 0 0 0 rgba(0,230,118,0.3); }
        50%       { box-shadow: 0 0 12px 4px rgba(0,230,118,0.12); }
    }
    @keyframes ussd-type {
        from { opacity:0; transform:translateX(-6px); }
        to   { opacity:1; transform:translateX(0); }
    }

    .float-slow { animation: float-slow 7s ease-in-out infinite; }
    .float-med  { animation: float-med  9s ease-in-out infinite; }
    .float-fast { animation: float-slow 5s ease-in-out infinite reverse; }

    .shimmer-text {
        background: linear-gradient(90deg, #00E676 0%, #80FFB9 40%, #00E676 60%, #00C853 100%);
        background-size: 200% auto;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: shimmer 3s linear infinite;
    }

    .glass {
        background: rgba(17, 38, 48, 0.6);
        backdrop-filter: blur(16px) saturate(1.4);
        -webkit-backdrop-filter: blur(16px) saturate(1.4);
        border: 1px solid rgba(255,255,255,0.07);
    }

    .glass-card {
        background: rgba(17, 38, 48, 0.55);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(0,230,118,0.08);
        transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
    }
    .glass-card:hover {
        border-color: rgba(0,230,118,0.22);
        transform: translateY(-3px);
        box-shadow: 0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,230,118,0.1);
    }

    .btn-primary {
        position: relative;
        overflow: hidden;
        background: #00E676;
        color: #0B1F26;
        transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
    }
    .btn-primary::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 60%);
        opacity: 0;
        transition: opacity 0.3s;
    }
    .btn-primary:hover::before { opacity: 1; }
    .btn-primary:hover {
        box-shadow: 0 0 20px rgba(0,230,118,0.4), 0 4px 16px rgba(0,0,0,0.3);
        transform: translateY(-1px);
    }

    .btn-outline {
        border: 1px solid rgba(0,230,118,0.35);
        color: #00E676;
        transition: background 0.2s, border-color 0.2s, transform 0.2s, box-shadow 0.2s;
    }
    .btn-outline:hover {
        background: rgba(0,230,118,0.08);
        border-color: rgba(0,230,118,0.5);
        transform: translateY(-1px);
        box-shadow: 0 0 12px rgba(0,230,118,0.15);
    }

    .nav-link {
        position: relative;
        transition: color 0.2s;
    }
    .nav-link::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 1px;
        background: #00E676;
        transition: width 0.3s;
    }
    .nav-link:hover { color: #00E676; }
    .nav-link:hover::after { width: 100%; }

    .grid-bg {
        background-image:
            linear-gradient(rgba(0,230,118,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,230,118,0.04) 1px, transparent 1px);
        background-size: 48px 48px;
    }

    .step-line::before {
        content: '';
        position: absolute;
        left: 13px;
        top: 28px;
        bottom: -24px;
        width: 1px;
        background: linear-gradient(to bottom, rgba(0,230,118,0.25), transparent);
    }

    .orb-1 { animation: orb-drift-1 18s ease-in-out infinite; }
    .orb-2 { animation: orb-drift-2 24s ease-in-out infinite; }
    .orb-3 { animation: orb-drift-3 14s ease-in-out infinite; }

    .hero-mockup { animation: float-slow 8s ease-in-out infinite; }

    .badge-pulse { animation: badge-glow 2.5s ease-in-out infinite; }

    .stat-card {
        background: rgba(0,230,118,0.04);
        border: 1px solid rgba(0,230,118,0.12);
        transition: background 0.3s, border-color 0.3s;
    }
    .stat-card:hover {
        background: rgba(0,230,118,0.08);
        border-color: rgba(0,230,118,0.25);
    }

    .ussd-line { animation: ussd-type 0.4s ease both; }

    .noise::after {
        content: '';
        position: absolute;
        inset: 0;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
        pointer-events: none;
        opacity: 0.4;
        border-radius: inherit;
    }

    .glow-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #00E676;
        box-shadow: 0 0 6px 2px rgba(0,230,118,0.6);
        animation: pulse-ring 2s ease-in-out infinite;
    }

    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: #0B1F26; }
    ::-webkit-scrollbar-thumb { background: rgba(0,230,118,0.3); border-radius: 2px; }
`;

export default globalStyles;