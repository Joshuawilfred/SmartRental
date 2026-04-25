import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';
import { Property, PropertyFormData, PropertyStatus, PaymentMethod } from '@/types';

const AMENITY_OPTIONS = ['WiFi', 'Parking', 'Water', 'Electricity', 'Generator', 'Security', 'CCTV', 'Garden', 'Pool', 'Gym'];
const FEATURE_OPTIONS = ['Furnished', 'Semi-furnished', 'Ground floor', 'Top floor', 'Own entrance', 'Balcony', 'Kitchen'];
const PAYMENT_OPTIONS: { value: PaymentMethod; label: string }[] = [
    { value: 'ussd',          label: 'USSD' },
    { value: 'mobile_money',  label: 'Mobile money' },
    { value: 'bank_transfer', label: 'Bank transfer' },
    { value: 'cash',          label: 'Cash' },
];

interface Props {
    property?: Property;
    action: string;
    method?: 'post' | 'put' | 'patch';
}

function Label({ children }: { children: React.ReactNode }) {
    return <label className="block text-xs text-[#F0F6F8]/50 mb-1.5">{children}</label>;
}

function Input({ error, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { error?: string }) {
    return (
        <div>
            <input
                {...props}
                className={`w-full bg-[#0B1F26] border text-sm text-[#F0F6F8] placeholder:text-[#F0F6F8]/20 rounded-lg px-3 py-2.5 focus:outline-none transition-colors ${
                    error ? 'border-red-500/50 focus:border-red-500' : 'border-white/8 focus:border-[#00E676]/40'
                } ${props.className ?? ''}`}
            />
            {error && <p className="text-[11px] text-red-400 mt-1">{error}</p>}
        </div>
    );
}

function Textarea({ error, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: string }) {
    return (
        <div>
            <textarea
                {...props}
                className={`w-full bg-[#0B1F26] border text-sm text-[#F0F6F8] placeholder:text-[#F0F6F8]/20 rounded-lg px-3 py-2.5 focus:outline-none transition-colors resize-none ${
                    error ? 'border-red-500/50 focus:border-red-500' : 'border-white/8 focus:border-[#00E676]/40'
                }`}
            />
            {error && <p className="text-[11px] text-red-400 mt-1">{error}</p>}
        </div>
    );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
    return (
        <h3 className="text-sm font-semibold text-[#F0F6F8]/80 border-b border-white/6 pb-2 mb-4">{children}</h3>
    );
}

function TagToggle({
    options, selected, onChange,
}: {
    options: string[];
    selected: string[];
    onChange: (next: string[]) => void;
}) {
    const toggle = (opt: string) => {
        onChange(selected.includes(opt)
            ? selected.filter((x) => x !== opt)
            : [...selected, opt]
        );
    };
    return (
        <div className="flex flex-wrap gap-1.5">
            {options.map((opt) => {
                const on = selected.includes(opt);
                return (
                    <button
                        key={opt}
                        type="button"
                        onClick={() => toggle(opt)}
                        className={`text-[11px] px-2.5 py-1 rounded border transition-colors ${
                            on
                                ? 'bg-[#00E676]/12 text-[#00E676] border-[#00E676]/30'
                                : 'bg-transparent text-[#F0F6F8]/40 border-white/8 hover:border-white/20'
                        }`}
                    >
                        {opt}
                    </button>
                );
            })}
        </div>
    );
}

export default function PropertyForm({ property, action, method = 'post' }: Props) {
    const fileRef = useRef<HTMLInputElement>(null);
    const isEdit = !!property;

    const { data, setData, post, put, patch, processing, errors, progress } = useForm<PropertyFormData>({
        title:               property?.title ?? '',
        description:         property?.description ?? '',
        location:            property?.location ?? '',
        address:             property?.address ?? '',
        city:                property?.city ?? 'Dar es Salaam',
        region:              property?.region ?? 'Dar es Salaam',
        rental_price:        property?.rental_price ?? '',
        capacity:            property?.capacity ?? 1,
        rooms:               property?.rooms ?? 1,
        bathrooms:           property?.bathrooms ?? 1,
        status:              property?.status ?? 'available',
        amenities:           property?.amenities ?? [],
        features:            property?.features ?? [],
        rules:               property?.rules ?? [],
        payment_methods:     property?.payment_methods ?? ['ussd'],
        contact_phone:       property?.contact_phone ?? '',
        contact_email:       property?.contact_email ?? '',
        availability_date:   property?.availability_date ?? '',
        cancellation_policy: property?.cancellation_policy ?? '',
        images:              [],
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        const opts = { forceFormData: true };
        if (method === 'put') put(action, opts);
        else if (method === 'patch') patch(action, opts);
        else post(action, opts);
    };

    return (
        <form onSubmit={submit} className="grid lg:grid-cols-3 gap-6">

            {/* Left 2/3 — main fields */}
            <div className="lg:col-span-2 flex flex-col gap-6">

                {/* Basic info */}
                <div className="bg-[#112630] border border-white/7 rounded-xl p-5">
                    <SectionHeading>Basic information</SectionHeading>
                    <div className="flex flex-col gap-4">
                        <div>
                            <Label>Property title *</Label>
                            <Input
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder="e.g. Masaki Heights — Room 4B"
                                error={errors.title}
                            />
                        </div>
                        <div>
                            <Label>Description *</Label>
                            <Textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Describe the property, surroundings, what makes it great..."
                                rows={4}
                                error={errors.description}
                            />
                        </div>
                        <div className="grid sm:grid-cols-2 gap-3">
                            <div>
                                <Label>Location / Area *</Label>
                                <Input
                                    value={data.location}
                                    onChange={(e) => setData('location', e.target.value)}
                                    placeholder="e.g. Masaki"
                                    error={errors.location}
                                />
                            </div>
                            <div>
                                <Label>Full address *</Label>
                                <Input
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    placeholder="e.g. Plot 45, Toure Drive"
                                    error={errors.address}
                                />
                            </div>
                            <div>
                                <Label>City *</Label>
                                <Input
                                    value={data.city}
                                    onChange={(e) => setData('city', e.target.value)}
                                    error={errors.city}
                                />
                            </div>
                            <div>
                                <Label>Region *</Label>
                                <Input
                                    value={data.region}
                                    onChange={(e) => setData('region', e.target.value)}
                                    error={errors.region}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Capacity & pricing */}
                <div className="bg-[#112630] border border-white/7 rounded-xl p-5">
                    <SectionHeading>Capacity & pricing</SectionHeading>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <Label>Monthly rent (TZS) *</Label>
                            <Input
                                type="number"
                                value={data.rental_price}
                                onChange={(e) => setData('rental_price', e.target.value)}
                                placeholder="650000"
                                min={1}
                                error={errors.rental_price}
                            />
                        </div>
                        <div>
                            <Label>Max tenants *</Label>
                            <Input
                                type="number"
                                value={data.capacity}
                                onChange={(e) => setData('capacity', e.target.value)}
                                min={1} max={50}
                                error={errors.capacity}
                            />
                        </div>
                        <div>
                            <Label>Rooms *</Label>
                            <Input
                                type="number"
                                value={data.rooms}
                                onChange={(e) => setData('rooms', e.target.value)}
                                min={1}
                                error={errors.rooms}
                            />
                        </div>
                        <div>
                            <Label>Bathrooms *</Label>
                            <Input
                                type="number"
                                value={data.bathrooms}
                                onChange={(e) => setData('bathrooms', e.target.value)}
                                min={1}
                                error={errors.bathrooms}
                            />
                        </div>
                    </div>
                </div>

                {/* Amenities & features */}
                <div className="bg-[#112630] border border-white/7 rounded-xl p-5">
                    <SectionHeading>Amenities & features</SectionHeading>
                    <div className="mb-4">
                        <Label>Amenities</Label>
                        <TagToggle
                            options={AMENITY_OPTIONS}
                            selected={data.amenities}
                            onChange={(v) => setData('amenities', v)}
                        />
                    </div>
                    <div className="mb-4">
                        <Label>Features</Label>
                        <TagToggle
                            options={FEATURE_OPTIONS}
                            selected={data.features}
                            onChange={(v) => setData('features', v)}
                        />
                    </div>
                    <div>
                        <Label>House rules (one per line)</Label>
                        <Textarea
                            value={data.rules.join('\n')}
                            onChange={(e) =>
                                setData('rules', e.target.value.split('\n').filter(Boolean))
                            }
                            placeholder={"No smoking inside\nNo pets\nQuiet hours after 10 PM"}
                            rows={3}
                            error={errors.rules as string}
                        />
                    </div>
                </div>

                {/* Images */}
                <div className="bg-[#112630] border border-white/7 rounded-xl p-5">
                    <SectionHeading>Photos</SectionHeading>
                    {isEdit && property.images.length > 0 && (
                        <div className="flex gap-2 flex-wrap mb-4">
                            {property.images.map((img) => (
                                <div key={img.id} className="relative w-20 h-20 rounded-lg overflow-hidden border border-white/10">
                                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                                    {img.is_primary && (
                                        <span className="absolute bottom-0 left-0 right-0 text-center text-[9px] bg-[#00E676] text-[#0B1F26] py-0.5">
                                            Primary
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                    <button
                        type="button"
                        onClick={() => fileRef.current?.click()}
                        className="w-full border border-dashed border-white/15 rounded-xl py-8 flex flex-col items-center gap-2 text-[#F0F6F8]/30 hover:border-[#00E676]/30 hover:text-[#00E676]/60 transition-colors"
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                        </svg>
                        <span className="text-sm">Click to upload photos</span>
                        <span className="text-xs">JPEG, PNG, WebP · max 4 MB each · up to 10</span>
                    </button>
                    <input
                        ref={fileRef}
                        type="file"
                        multiple
                        accept="image/jpeg,image/png,image/webp"
                        className="hidden"
                        onChange={(e) => setData('images', Array.from(e.target.files ?? []))}
                    />
                    {data.images.length > 0 && (
                        <p className="text-xs text-[#00E676]/70 mt-2">{data.images.length} file(s) selected</p>
                    )}
                    {progress && (
                        <div className="mt-3 h-1 bg-white/8 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[#00E676] transition-all"
                                style={{ width: `${progress.percentage}%` }}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Right 1/3 — sidebar fields */}
            <div className="flex flex-col gap-5">

                {/* Status */}
                <div className="bg-[#112630] border border-white/7 rounded-xl p-5">
                    <SectionHeading>Status</SectionHeading>
                    <div className="flex flex-col gap-2">
                        {(['available', 'occupied', 'maintenance', 'unavailable'] as PropertyStatus[]).map((s) => (
                            <label key={s} className="flex items-center gap-2.5 cursor-pointer">
                                <input
                                    type="radio"
                                    name="status"
                                    value={s}
                                    checked={data.status === s}
                                    onChange={() => setData('status', s)}
                                    className="accent-[#00E676]"
                                />
                                <span className="text-sm capitalize text-[#F0F6F8]/65">{s}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Payment methods */}
                <div className="bg-[#112630] border border-white/7 rounded-xl p-5">
                    <SectionHeading>Payment methods</SectionHeading>
                    <div className="flex flex-col gap-2">
                        {PAYMENT_OPTIONS.map(({ value, label }) => (
                            <label key={value} className="flex items-center gap-2.5 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={data.payment_methods.includes(value)}
                                    onChange={(e) => {
                                        setData('payment_methods', e.target.checked
                                            ? [...data.payment_methods, value]
                                            : data.payment_methods.filter((m) => m !== value)
                                        );
                                    }}
                                    className="accent-[#00E676]"
                                />
                                <span className="text-sm text-[#F0F6F8]/65">{label}</span>
                            </label>
                        ))}
                    </div>
                    {errors.payment_methods && (
                        <p className="text-[11px] text-red-400 mt-2">{errors.payment_methods}</p>
                    )}
                </div>

                {/* Contact */}
                <div className="bg-[#112630] border border-white/7 rounded-xl p-5">
                    <SectionHeading>Contact</SectionHeading>
                    <div className="flex flex-col gap-3">
                        <div>
                            <Label>Phone *</Label>
                            <Input
                                value={data.contact_phone}
                                onChange={(e) => setData('contact_phone', e.target.value)}
                                placeholder="+255 712 000 000"
                                error={errors.contact_phone}
                            />
                        </div>
                        <div>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                value={data.contact_email}
                                onChange={(e) => setData('contact_email', e.target.value)}
                                placeholder="landlord@example.com"
                                error={errors.contact_email}
                            />
                        </div>
                    </div>
                </div>

                {/* Availability */}
                <div className="bg-[#112630] border border-white/7 rounded-xl p-5">
                    <SectionHeading>Availability</SectionHeading>
                    <div className="flex flex-col gap-3">
                        <div>
                            <Label>Available from</Label>
                            <Input
                                type="date"
                                value={data.availability_date}
                                onChange={(e) => setData('availability_date', e.target.value)}
                                className="[color-scheme:dark]"
                                error={errors.availability_date}
                            />
                        </div>
                        <div>
                            <Label>Cancellation policy</Label>
                            <Textarea
                                value={data.cancellation_policy}
                                onChange={(e) => setData('cancellation_policy', e.target.value)}
                                placeholder="e.g. 30 days notice required..."
                                rows={3}
                                error={errors.cancellation_policy}
                            />
                        </div>
                    </div>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full py-3 bg-[#00E676] text-[#0B1F26] font-semibold text-sm rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                    {processing
                        ? (isEdit ? 'Saving...' : 'Creating...')
                        : (isEdit ? 'Save changes' : 'Create property')
                    }
                </button>
            </div>
        </form>
    );
}