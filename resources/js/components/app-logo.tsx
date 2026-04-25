import AppLogoIcon from '@/components/app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-white text-sidebar-primary-foreground">
                <AppLogoIcon className="size-6 fill-current text-white dark:text-black" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="text-[18px] font-semibold tracking-tight text-[#F0F6F8]">
                    Smart<span className="text-[#00E676]">Rental</span>
                </span>
            </div>
        </>
    );
}
