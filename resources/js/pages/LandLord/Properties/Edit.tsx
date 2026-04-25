import { Head, Link } from '@inertiajs/react';
import LandlordLayout from '@/layouts/landlord-layout';
import { Property } from '@/types';
import PropertyForm from '@/components/PropertyForm';

interface Props {
    property: Property;
}

export default function PropertiesEdit({ property }: Props) {
    return (
        <LandlordLayout title="Edit Property">
            <Head title={`Edit — ${property.title}`} />

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-[#F0F6F8]/35 mb-5">
                <Link href="/landlord/properties" className="hover:text-[#00E676] transition-colors">
                    Properties
                </Link>
                <span>/</span>
                <Link
                    href={`/landlord/properties/${property.id}`}
                    className="hover:text-[#00E676] transition-colors truncate max-w-[160px]"
                >
                    {property.title}
                </Link>
                <span>/</span>
                <span className="text-[#F0F6F8]/60">Edit</span>
            </div>

            <div className="mb-6">
                <h2 className="text-lg font-semibold">Edit property</h2>
                <p className="text-xs text-[#F0F6F8]/35 mt-0.5">
                    Changes are saved immediately and visible to tenants.
                </p>
            </div>

            <PropertyForm
                property={property}
                action={`/landlord/properties/${property.id}`}
                method="put"
            />
        </LandlordLayout>
    );
}