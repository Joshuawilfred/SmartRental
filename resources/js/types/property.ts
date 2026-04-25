export type PropertyStatus = 'available' | 'occupied' | 'maintenance' | 'unavailable';

export type PaymentMethod = 'ussd' | 'bank_transfer' | 'mobile_money' | 'cash';

export interface PropertyAmenity {
    id: number;
    name: string;
}

export interface PropertyImage {
    id: number;
    url: string;
    is_primary: boolean;
}

export interface Property {
    id: number;
    user_id: number;
    title: string;
    description: string;
    location: string;
    address: string;
    city: string;
    region: string;
    rental_price: number;
    capacity: number;          // max number of tenants
    rooms: number;
    bathrooms: number;
    status: PropertyStatus;
    amenities: string[];       // e.g. ['WiFi', 'Parking', 'Water']
    features: string[];        // e.g. ['Furnished', 'Ground floor']
    rules: string[];           // e.g. ['No pets', 'No smoking']
    payment_methods: PaymentMethod[];
    contact_phone: string;
    contact_email: string | null;
    availability_date: string | null;   // ISO date
    cancellation_policy: string | null;
    images: PropertyImage[];
    average_rating: number | null;
    reviews_count: number;
    tenants_count: number;
    created_at: string;
    updated_at: string;
}

export interface PropertyFormData {
    title: string;
    description: string;
    location: string;
    address: string;
    city: string;
    region: string;
    rental_price: number | string;
    capacity: number | string;
    rooms: number | string;
    bathrooms: number | string;
    status: PropertyStatus;
    amenities: string[];
    features: string[];
    rules: string[];
    payment_methods: PaymentMethod[];
    contact_phone: string;
    contact_email: string;
    availability_date: string;
    cancellation_policy: string;
    images: File[];
}

export interface PaginatedProperties {
    data: Property[];
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        per_page: number;
        to: number;
        total: number;
    };
}