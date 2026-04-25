import { Head } from '@inertiajs/react';

export default function TenantDashboard() {
    return (
        <>
            <Head title="Tenant Dashboard" />
            <div className="p-6">
                <h1 className="text-2xl font-bold">Tenant Dashboard</h1>
                <p className="text-muted-foreground mt-1">Welcome back.</p>
            </div>
        </>
    );
}
