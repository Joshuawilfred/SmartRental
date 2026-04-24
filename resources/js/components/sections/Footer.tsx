export function Footer() {
    return (
        <footer
            className="relative z-10 border-t px-6 md:px-10 py-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-[#F0F6F8]/28"
            style={{ borderColor: "rgba(255,255,255,0.05)" }}
        >
            <div className="flex items-center gap-2">
                <span className="font-semibold text-[#00E676] font-body">
                    Smart<span className="text-[#F0F6F8]/35">Rental</span>
                </span>
                <span className="text-[#F0F6F8]/20">·</span>
                <span>Powered by Africa's Talking</span>
            </div>
            <span>© {new Date().getFullYear()} SmartRental · Dar es Salaam, Tanzania</span>
        </footer>
    );
}