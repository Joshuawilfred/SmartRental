import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import LandlordLayout from '@/layouts/landlord-layout';
import { Property, PropertyStatus } from '@/types';

interface Props {
    property: Property;
}

const STATUS_CONFIG: Record<PropertyStatus, { label: string; color: string }> = {
    available: { label: 'Available', color: 'bg-[#00E676]/12 text-[#00E676] border-[#00E676]/25' },
    occupied: { label: 'Occupied', color: 'bg-blue-500/12 text-blue-400 border-blue-500/25' },
    maintenance: { label: 'Maintenance', color: 'bg-amber-500/12 text-amber-400 border-amber-500/25' },
    unavailable: { label: 'Unavailable', color: 'bg-red-500/12 text-red-400 border-red-500/25' },
};

function InfoRow({ label, value }: { label: string; value: string | number | null }) {
    if (value === null || value === '') return null;
    return (
        <div className="flex justify-between py-2.5 border-b border-white/5 last:border-0">
            <span className="text-xs text-[#F0F6F8]/40">{label}</span>
            <span className="text-xs text-[#F0F6F8]/80 text-right max-w-[60%]">{value}</span>
        </div>
    );
}

function TagList({ items, label }: { items: string[]; label: string }) {
    if (!items || items.length === 0) return null;
    return (
        <div className="mb-4">
            <p className="text-xs text-[#F0F6F8]/35 mb-2">{label}</p>
            <div className="flex flex-wrap gap-1.5">
                {items.map((item) => (
                    <span key={item} className="text-[11px] px-2 py-0.5 bg-white/5 border border-white/8 rounded text-[#F0F6F8]/60">
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default function PropertiesShow({ property }: Props) {
    const [activeImg, setActiveImg] = useState(0);
    const [deleting, setDeleting] = useState(false);

    const status = STATUS_CONFIG[property.status];

    const handleDelete = () => {
        if (!confirm('Remove this property? This action can be undone within 30 days.')) return;
        setDeleting(true);
        router.delete(`/landlord/properties/${property.id}`, {
            onFinish: () => setDeleting(false),
        });
    };

    return (
        <LandlordLayout title={property.title}>
            <Head title={`${property.title} — SmartRental`} />

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-[#F0F6F8]/35 mb-5">
                <Link href="/landlord/properties" className="hover:text-[#00E676] transition-colors">Properties</Link>
                <span>/</span>
                <span className="text-[#F0F6F8]/60">{property.title}</span>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">

                {/* Left column — images + description */}
                <div className="lg:col-span-2 flex flex-col gap-5">

                    {/* Image gallery */}
                    <div className="bg-[#112630] border border-white/7 rounded-xl overflow-hidden">
                        <div className="h-64 bg-[#0B1F26] relative">
                            {property.images.length > 0 ? (
                                <img
                                    src={property.images[activeImg]?.url}
                                    alt={property.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-5xl text-[#F0F6F8]/8">🏠</div>
                            )}
                            <div className="absolute top-3 left-3">
                                <span className={`text-[11px] font-medium px-2.5 py-1 rounded border ${status.color}`}>
                                    {status.label}
                                </span>
                            </div>
                        </div>
                        {property.images.length > 1 && (
                            <div className="flex gap-2 p-3 overflow-x-auto">
                                {property.images.map((img, i) => (
                                    <button
                                        key={img.id}
                                        onClick={() => setActiveImg(i)}
                                        className={`flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-colors ${activeImg === i ? 'border-[#00E676]' : 'border-white/8'
                                            }`}
                                    >
                                        <img src={img.url} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    <div className="bg-[#112630] border border-white/7 rounded-xl p-5">
                        <h3 className="text-sm font-semibold mb-3">Description</h3>
                        <p className="text-sm text-[#F0F6F8]/55 leading-relaxed whitespace-pre-line">
                            {property.description}
                        </p>
                    </div>

                    {/* Amenities / Features / Rules */}
                    <div className="bg-[#112630] border border-white/7 rounded-xl p-5">
                        <h3 className="text-sm font-semibold mb-4">Details</h3>
                        <TagList items={property.amenities} label="Amenities" />
                        <TagList items={property.features} label="Features" />
                        <TagList items={property.rules} label="House rules" />
                        {property.cancellation_policy && (
                            <div>
                                <p className="text-xs text-[#F0F6F8]/35 mb-1">Cancellation policy</p>
                                <p className="text-xs text-[#F0F6F8]/55 leading-relaxed">
                                    {property.cancellation_policy}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right column — info + actions */}
                <div className="flex flex-col gap-5">

                    {/* Price + actions */}
                    <div className="bg-[#112630] border border-white/7 rounded-xl p-5">
                        <div className="mb-4">
                            <p className="text-xs text-[#F0F6F8]/35 mb-0.5">Monthly rent</p>
                            <p className="text-2xl font-semibold text-[#00E676]">
                                TZS {property.rental_price.toLocaleString()}
                            </p>
                        </div>
                        <Link
                            href={`/landlord/properties/${property.id}/edit`}
                            className="w-full flex items-center justify-center gap-2 py-2.5 border border-[#00E676]/30 text-[#00E676] text-sm font-medium rounded-lg hover:bg-[#00E676]/8 transition-colors mb-2"
                        >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                            Edit property
                        </Link>
                        <button
                            onClick={handleDelete}
                            disabled={deleting}
                            className="w-full py-2.5 text-sm text-red-400/70 hover:text-red-400 hover:bg-red-400/6 rounded-lg transition-colors disabled:opacity-50"
                        >
                            {deleting ? 'Removing...' : 'Remove property'}
                        </button>
                    </div>

                    {/* Property info */}
                    <div className="bg-[#112630] border border-white/7 rounded-xl p-5">
                        <h3 className="text-sm font-semibold mb-3">Property info</h3>
                        <InfoRow label="Location" value={`${property.location}, ${property.city}`} />
                        <InfoRow label="Address" value={property.address} />
                        <InfoRow label="Region" value={property.region} />
                        <InfoRow label="Rooms" value={property.rooms} />
                        <InfoRow label="Bathrooms" value={property.bathrooms} />
                        <InfoRow label="Capacity" value={`${property.capacity} tenant${property.capacity !== 1 ? 's' : ''}`} />
                        <InfoRow
                            label="Available from"
                            value={property.availability_date
                                ? new Date(property.availability_date).toLocaleDateString('en-TZ', { dateStyle: 'medium' })
                                : 'Immediately'}
                        />
                    </div>

                    {/* Contact */}
                    <div className="bg-[#112630] border border-white/7 rounded-xl p-5">
                        <h3 className="text-sm font-semibold mb-3">Contact</h3>
                        <InfoRow label="Phone" value={property.contact_phone} />
                        <InfoRow label="Email" value={property.contact_email} />
                    </div>

                    {/* Payment methods */}
                    <div className="bg-[#112630] border border-white/7 rounded-xl p-5">
                        <h3 className="text-sm font-semibold mb-3">Payment methods</h3>
                        <div className="flex flex-wrap gap-1.5">
                            {(property.payment_methods ?? []).map((m) => (
                                <span key={m} className="text-[11px] px-2.5 py-1 bg-[#00E676]/8 border border-[#00E676]/20 text-[#00E676] rounded capitalize">
                                    {m.replace('_', ' ')}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-[#112630] border border-white/7 rounded-xl p-4 text-center">
                            <p className="text-2xl font-semibold">{property.tenants_count}</p>
                            <p className="text-[11px] text-[#F0F6F8]/35 mt-0.5">Tenants</p>
                        </div>
                        <div className="bg-[#112630] border border-white/7 rounded-xl p-4 text-center">
                            <p className="text-2xl font-semibold">
                                {property.average_rating ? property.average_rating.toFixed(1) : '—'}
                            </p>
                            <p className="text-[11px] text-[#F0F6F8]/35 mt-0.5">Rating</p>
                        </div>
                    </div>
                </div>
            </div>
        </LandlordLayout>
    );
}