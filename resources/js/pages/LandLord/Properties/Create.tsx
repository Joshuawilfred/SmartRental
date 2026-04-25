import { Head, Link } from '@inertiajs/react';
import PropertyForm from '@/components/PropertyForm';

export default function PropertiesCreate() {
    return (
        <>
            <Head title="Add Property — SmartRental" />

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-[#F0F6F8]/35 mb-5">
                <Link href="/landlord/properties" className="hover:text-[#00E676] transition-colors">
                    Properties
                </Link>
                <span>/</span>
                <span className="text-[#F0F6F8]/60">New property</span>
            </div>

            <div className="mb-6">
                <h2 className="text-lg font-semibold">Add a new property</h2>
                <p className="text-xs text-[#F0F6F8]/35 mt-0.5">
                    Fill in the details below. You can edit everything later.
                </p>
            </div>

            <PropertyForm action="/landlord/properties" method="post" />
        </>
    ); 
}