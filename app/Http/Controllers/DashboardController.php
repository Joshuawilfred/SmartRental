<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $userId = $request->user()->id;

        $properties = Property::forLandlord($userId)->get();

        $stats = [
            'total_properties'      => $properties->count(),
            'available_properties'  => $properties->where('status', 'available')->count(),
            'occupied_properties'   => $properties->where('status', 'occupied')->count(),
            'total_tenants'         => 0,   // wire once Lease model exists
            'pending_payments'      => 0,   // wire once Payment model exists
            'collected_this_month'  => 0,   // wire once Payment model exists
        ];

        $recent_properties = Property::forLandlord($userId)
            ->latest()
            ->limit(6)
            ->get(['id', 'title', 'location', 'status', 'rental_price']);

        return Inertia::render('LandLord/Index', [
            'stats'             => $stats,
            'recent_properties' => $recent_properties,
        ]);
    }
}
