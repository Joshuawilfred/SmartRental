import { useEffect } from 'react';
import { router, usePage } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import landlord from '@/routes/landlord';
import tenant from '@/routes/tenant';
import type { PageProps } from '@/types';

/**
 * This page exists only to satisfy Breeze's default `/dashboard` route.
 * It immediately redirects the user to their role-specific dashboard.
 *
 * You can either:
 *  a) Keep this and add a middleware redirect in Laravel (cleaner), or
 *  b) Keep this component as the redirect shim (quick fix).
 *
 * Option (a) — add to your RouteServiceProvider or web.php:
 *   Route::get('/dashboard', function () {
 *       return auth()->user()->role === 'landlord'
 *           ? redirect()->route('landlord.dashboard')
 *           : redirect()->route('tenant.dashboard');
 *   })->middleware(['auth', 'verified'])->name('dashboard');
 */
export default function Dashboard() {
    const { auth } = usePage<PageProps>().props;

    useEffect(() => {
        const dest = auth.user.role === 'landlord'
            ? landlord.dashboard()
            : tenant.dashboard();
        router.replace(dest);
    }, [auth.user.role]);

    return (
        <>
            <Head title="Redirecting..." />
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                Redirecting...
            </div>
        </>
    );
}
