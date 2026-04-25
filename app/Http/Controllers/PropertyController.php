<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePropertyRequest;
use App\Http\Requests\UpdatePropertyRequest;
use App\Models\Property;
use App\Models\PropertyImage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class PropertyController extends Controller
{
    /**
     * List all properties for the authenticated landlord.
     */
    public function index(Request $request): Response
    {
        $properties = Property::with(['images' => fn($q) => $q->where('is_primary', true)])
            ->forLandlord($request->user()->id)
            ->when(
                $request->search,
                fn($q, $s) =>
                $q->where('title', 'like', "%{$s}%")
                    ->orWhere('location', 'like', "%{$s}%")
            )
            ->when($request->status, fn($q, $s) => $q->where('status', $s))
            ->latest()
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('LandLord/Properties/Index', [
            'properties' => [
                'data'  => $properties->items(),
                'links' => [
                    'first' => $properties->url(1),
                    'last'  => $properties->url($properties->lastPage()),
                    'prev'  => $properties->previousPageUrl(),
                    'next'  => $properties->nextPageUrl(),
                ],
                'meta' => [
                    'current_page' => $properties->currentPage(),
                    'from'         => $properties->firstItem(),
                    'last_page'    => $properties->lastPage(),
                    'per_page'     => $properties->perPage(),
                    'to'           => $properties->lastItem(),
                    'total'        => $properties->total(),
                ],
            ],
            'filters' => $request->only('search', 'status'),
        ]);
    }

    /**
     * Show the create form.
     */
    public function create(): Response
    {
        return Inertia::render('LandLord/Properties/Create');
    }

    /**
     * Store a new property with images.
     */
    public function store(StorePropertyRequest $request): RedirectResponse
    {
        $data = $request->validated();

        DB::transaction(function () use ($data, $request) {
            $property = $request->user()->properties()->create(
                collect($data)->except('images')->toArray()
            );

            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $index => $file) {
                    $path = $file->store("properties/{$property->id}", 'public');
                    $property->images()->create([
                        'path'       => $path,
                        'is_primary' => $index === 0,
                        'order'      => $index,
                    ]);
                }
            }
        });

        return redirect()
            ->route('landlord.properties.index')
            ->with('success', 'Property created successfully.');
    }

    /**
     * Show a single property with all relations.
     */
    public function show(Property $property): Response
    {
        $this->authorizeProperty($property);

        $property->load(['images', 'landlord']);

        return Inertia::render('LandLord/Properties/Show', [
            'property' => $property,
        ]);
    }

    /**
     * Show the edit form pre-filled with property data.
     */
    public function edit(Property $property): Response
    {
        $this->authorizeProperty($property);

        $property->load('images');

        return Inertia::render('LandLord/Properties/Edit', [
            'property' => $property,
        ]);
    }

    /**
     * Update a property, handle image additions/deletions.
     */
    public function update(UpdatePropertyRequest $request, Property $property): RedirectResponse
    {
        $data = $request->validated();

        DB::transaction(function () use ($data, $request, $property) {
            $property->update(
                collect($data)->except(['images', 'delete_image_ids'])->toArray()
            );

            // Remove images marked for deletion
            if (!empty($data['delete_image_ids'])) {
                $toDelete = $property->images()
                    ->whereIn('id', $data['delete_image_ids'])
                    ->get();

                foreach ($toDelete as $img) {
                    Storage::disk($img->disk)->delete($img->path);
                    $img->delete();
                }
            }

            // Upload new images
            if ($request->hasFile('images')) {
                $currentMax = $property->images()->max('order') ?? -1;
                $hasPrimary = $property->images()->where('is_primary', true)->exists();

                foreach ($request->file('images') as $index => $file) {
                    $path = $file->store("properties/{$property->id}", 'public');
                    $property->images()->create([
                        'path'       => $path,
                        'is_primary' => !$hasPrimary && $index === 0,
                        'order'      => $currentMax + $index + 1,
                    ]);
                }
            }
        });

        return redirect()
            ->route('landlord.properties.show', $property)
            ->with('success', 'Property updated successfully.');
    }

    /**
     * Soft-delete a property.
     */
    public function destroy(Property $property): RedirectResponse
    {
        $this->authorizeProperty($property);

        $property->delete();

        return redirect()
            ->route('landlord.properties.index')
            ->with('success', 'Property removed.');
    }

    /**
     * Set a specific image as primary.
     */
    public function setPrimaryImage(Property $property, PropertyImage $image): RedirectResponse
    {
        $this->authorizeProperty($property);

        $property->images()->update(['is_primary' => false]);
        $image->update(['is_primary' => true]);

        return back()->with('success', 'Primary image updated.');
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    private function authorizeProperty(Property $property): void
    {
        if ($property->user_id !== auth()->id()) {
            abort(403);
        }
    }
}
