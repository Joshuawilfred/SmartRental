<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PropertyController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

require __DIR__ . '/settings.php';

// ── Role dispatcher ───────────────────────────────────────────────────────────
Route::middleware(['auth', 'verified'])
    ->get('/dashboard', function () {
        return match (auth()->user()->role) {
            'landlord' => redirect()->route('landlord.dashboard'),
            'tenant'   => redirect()->route('tenant.dashboard'),
            default    => redirect()->route('home'),
        };
    })
    ->name('dashboard');

// ── Landlord area ─────────────────────────────────────────────────────────────
Route::middleware(['auth', 'verified', 'role:landlord'])
    ->prefix('landlord')
    ->name('landlord.')
    ->group(function () {

        // Dashboard
        Route::get('/dashboard', [DashboardController::class, 'index'])
            ->name('dashboard');

        // Properties — full resource + extra image action
        Route::resource('properties', PropertyController::class);
        Route::patch(
            'properties/{property}/images/{image}/primary',
            [PropertyController::class, 'setPrimaryImage']
        )->name('properties.images.primary');

        // Tenants — stub (implement next)
        Route::get('/tenants', fn() => Inertia::render('Tenants/Index'))
            ->name('tenants.index');

        // Payments — stub
        Route::get('/payments', fn() => Inertia::render('Payments/Index'))
            ->name('payments.index');

        // SMS & Notifications — stub
        Route::get('/sms', fn() => Inertia::render('Sms/Index'))
            ->name('sms.index');

        // Settings — stub
        Route::get('/settings', fn() => Inertia::render('Settings/Index'))
            ->name('settings.index');
    });

// ── Tenant area ───────────────────────────────────────────────────────────────
Route::middleware(['auth', 'verified', 'role:tenant'])
    ->prefix('tenant')
    ->name('tenant.')
    ->group(function () {
        Route::get('/dashboard', function () {
            return Inertia::render('Tenant/Dashboard', [
                'lease'           => null,
                'next_payment'    => null,
                'recent_requests' => [],
            ]);
        })->name('dashboard');
    });
