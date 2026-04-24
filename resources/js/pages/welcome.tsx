import { Head } from '@inertiajs/react';

import { BackgroundLayer } from '@/components/BackgroundLayer';

import { CtaSection } from '@/components/sections/CtaSection';
import { Features } from '@/components/sections/Features';
import { Footer } from '@/components/sections/Footer';
import { Hero } from '@/components/sections/Hero';

import { NavBar } from '@/components/sections/NavBar';

import { UssdSection } from '@/components/sections/UssdSection';

import { GreenDivider } from '@/components/ui/Index';
import globalStyles from '@/styles/globalStyles';

export default function Welcome() {
    return (
        <>
            <Head title="SmartRental — Property management built for Africa" />
            <style>{globalStyles}</style>

            <div className="font-body relative min-h-screen overflow-x-hidden bg-[#0B1F26] text-[#F0F6F8]">
                <BackgroundLayer />
                <NavBar />
                <Hero />
                <GreenDivider />
                <Features />
                <GreenDivider />
                <UssdSection />
                <CtaSection />
                <Footer />
            </div>
        </>
    );
}
