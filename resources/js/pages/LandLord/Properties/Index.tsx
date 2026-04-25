import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import LandlordLayout from '@/layouts/landlord-layout';
import { PaginatedProperties, Property, PropertyStatus } from '@/types';

interface Props {
    properties: PaginatedProperties;
    filters: { search?: string; status?: string };
}

const STATUS_CONFIG: Record<PropertyStatus, { label: string; color: string }> = {
    available: { label: 'Available', color: 'bg-[#00E676]/12 text-[#00E676] border-[#00E676]/25' },
    occupied: { label: 'Occupied', color: 'bg-blue-500/12 text-blue-400 border-blue-500/25' },
    maintenance: { label: 'Maintenance', color: 'bg-amber-500/12 text-amber-400 border-amber-500/25' },
    unavailable: { label: 'Unavailable', color: 'bg-red-500/12 text-red-400 border-red-500/25' },
};

function StatusBadge({ status }: { status: PropertyStatus }) {
    const cfg = STATUS_CONFIG[status];
    return (
        <span className={`text-[10px] font-medium px-2 py-0.5 rounded border ${cfg.color}`}>
            {cfg.label}
        </span>
    );
}

function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#00E676]/8 border border-[#00E676]/15 flex items-center justify-center mb-4 text-2xl">
                🏠
            </div>
            <h3 className="text-base font-semibold mb-1">No properties yet</h3>
            <p className="text-sm text-[#F0F6F8]/40 mb-5 max-w-xs">
                Add your first property and start receiving tenants.
            </p>
            <Link
                href="/landlord/properties/create"
                className="px-5 py-2.5 bg-[#00E676] text-[#0B1F26] text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
                Add property
            </Link>
        </div>
    );
}

function PropertyCard({ property }: { property: Property }) {
    const primary = property.images.find((i) => i.is_primary) ?? property.images[0];

    return (
        <div className="group bg-[#112630] border border-white/7 rounded-xl overflow-hidden hover:border-[#00E676]/25 transition-colors">
            {/* Image */}
            <div className="h-40 bg-[#0B1F26] relative overflow-hidden">
                {primary ? (
                    <img
                        src={primary.url}
                        alt={property.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl text-[#F0F6F8]/10">
                        🏠
                    </div>
                )}
                <div className="absolute top-2.5 left-2.5">
                    <StatusBadge status={property.status} />
                </div>
            </div>

            {/* Body */}
            <div className="p-4">
                <h3 className="text-sm font-semibold truncate mb-0.5">{property.title}</h3>
                <p className="text-[11px] text-[#F0F6F8]/40 truncate mb-3">
                    {property.location}, {property.city}
                </p>

                <div className="flex items-center gap-3 text-[11px] text-[#F0F6F8]/40 mb-3">
                    <span>{property.rooms} room{property.rooms !== 1 ? 's' : ''}</span>
                    <span>·</span>
                    <span>{property.capacity} cap.</span>
                    <span>·</span>
                    <span>{property.bathrooms} bath</span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#00E676]">
                        TZS {property.rental_price.toLocaleString()}
                        <span className="text-[10px] font-normal text-[#F0F6F8]/35">/mo</span>
                    </span>
                    <div className="flex gap-1.5">
                        <Link
                            href={`/landlord/properties/${property.id}`}
                            className="px-2.5 py-1 text-[11px] border border-white/10 text-[#F0F6F8]/50 rounded hover:text-[#F0F6F8] hover:border-white/20 transition-colors"
                        >
                            View
                        </Link>
                        <Link
                            href={`/landlord/properties/${property.id}/edit`}
                            className="px-2.5 py-1 text-[11px] border border-[#00E676]/25 text-[#00E676] rounded hover:bg-[#00E676]/8 transition-colors"
                        >
                            Edit
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function PropertiesIndex({ properties, filters }: Props) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [status, setStatus] = useState(filters.status ?? '');

    const applyFilters = (overrides: Record<string, string>) => {
        router.get('/landlord/properties', { search, status, ...overrides }, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <LandlordLayout title="Properties">
            <Head title="Properties — SmartRental" />

            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                    <h2 className="text-lg font-semibold">My Properties</h2>
                    <p className="text-xs text-[#F0F6F8]/35 mt-0.5">
                        {properties.meta.total} propert{properties.meta.total !== 1 ? 'ies' : 'y'}
                    </p>
                </div>
                <Link
                    href="/landlord/properties/create"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#00E676] text-[#0B1F26] text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M12 5v14M5 12h14" />
                    </svg>
                    Add property
                </Link>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <input
                    type="text"
                    placeholder="Search by title or location..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && applyFilters({ search })}
                    className="flex-1 bg-[#112630] border border-white/8 text-[#F0F6F8] text-sm placeholder:text-[#F0F6F8]/25 rounded-lg px-3 py-2 focus:outline-none focus:border-[#00E676]/40"
                />
                <select
                    value={status}
                    onChange={(e) => {
                        setStatus(e.target.value);
                        applyFilters({ status: e.target.value });
                    }}
                    className="bg-[#112630] border border-white/8 text-sm text-[#F0F6F8]/70 rounded-lg px-3 py-2 focus:outline-none focus:border-[#00E676]/40"
                >
                    <option value="">All statuses</option>
                    <option value="available">Available</option>
                    <option value="occupied">Occupied</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="unavailable">Unavailable</option>
                </select>
            </div>

            {/* Grid or empty */}
            {properties.data.length === 0 ? (
                <EmptyState />
            ) : (
                <>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
                        {properties.data.map((p) => (
                            <PropertyCard key={p.id} property={p} />
                        ))}
                    </div>

                    {/* Pagination */}
                    {properties.meta.last_page > 1 && (
                        <div className="flex items-center justify-between text-xs text-[#F0F6F8]/35">
                            <span>
                                Showing {properties.meta.from}–{properties.meta.to} of {properties.meta.total}
                            </span>
                            <div className="flex gap-1.5">
                                {properties.links.prev && (
                                    <Link
                                        href={properties.links.prev}
                                        className="px-3 py-1.5 border border-white/8 rounded hover:border-[#00E676]/30 hover:text-[#00E676] transition-colors"
                                    >
                                        ← Prev
                                    </Link>
                                )}
                                {properties.links.next && (
                                    <Link
                                        href={properties.links.next}
                                        className="px-3 py-1.5 border border-white/8 rounded hover:border-[#00E676]/30 hover:text-[#00E676] transition-colors"
                                    >
                                        Next →
                                    </Link>
                                )}
                            </div>
                        </div>
                    )}
                </>
            )}
        </LandlordLayout>
    );
}