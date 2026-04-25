<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Property extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'location',
        'address',
        'city',
        'region',
        'rental_price',
        'capacity',
        'rooms',
        'bathrooms',
        'status',
        'amenities',
        'features',
        'rules',
        'payment_methods',
        'contact_phone',
        'contact_email',
        'availability_date',
        'cancellation_policy',
    ];

    protected $casts = [
        'amenities'        => 'array',
        'features'         => 'array',
        'rules'            => 'array',
        'payment_methods'  => 'array',
        'availability_date' => 'date',
        'rental_price'     => 'integer',
        'capacity'         => 'integer',
        'rooms'            => 'integer',
        'bathrooms'        => 'integer',
    ];

    protected $appends = ['average_rating', 'reviews_count', 'tenants_count'];

    // ── Relationships ──────────────────────────────────────────────────────────

    public function landlord(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function images(): HasMany
    {
        return $this->hasMany(PropertyImage::class)->orderBy('order');
    }

    public function primaryImage(): HasMany
    {
        return $this->hasMany(PropertyImage::class)->where('is_primary', true)->limit(1);
    }

    // public function tenants(): HasMany
    // {
    //     // Wire up once Tenant/Lease model exists
    //     return $this->hasMany(Lease::class);
    // }

    // public function reviews(): HasMany
    // {
    //     return $this->hasMany(Review::class);
    // }

    // ── Accessors ──────────────────────────────────────────────────────────────

    public function getAverageRatingAttribute(): ?float
    {
        // Computed once Review model exists
        // return $this->reviews()->avg('rating');
        return null;
    }

    public function getReviewsCountAttribute(): int
    {
        return 0; // $this->reviews()->count();
    }

    public function getTenantsCountAttribute(): int
    {
        return 0; // $this->tenants()->active()->count();
    }

    // ── Scopes ────────────────────────────────────────────────────────────────

    public function scopeAvailable($query)
    {
        return $query->where('status', 'available');
    }

    public function scopeForLandlord($query, int $userId)
    {
        return $query->where('user_id', $userId);
    }
}
