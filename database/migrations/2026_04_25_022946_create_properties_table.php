<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();

            // Core info
            $table->string('title');
            $table->text('description');
            $table->string('location');          // human-readable area e.g. "Masaki"
            $table->string('address');
            $table->string('city')->default('Dar es Salaam');
            $table->string('region')->default('Dar es Salaam');

            // Pricing & capacity
            $table->unsignedBigInteger('rental_price');   // in TZS
            $table->unsignedTinyInteger('capacity')->default(1);
            $table->unsignedTinyInteger('rooms')->default(1);
            $table->unsignedTinyInteger('bathrooms')->default(1);

            // Status
            $table->enum('status', ['available', 'occupied', 'maintenance', 'unavailable'])
                ->default('available');

            // JSON arrays
            $table->json('amenities')->nullable();           // ['WiFi', 'Parking', ...]
            $table->json('features')->nullable();            // ['Furnished', ...]
            $table->json('rules')->nullable();               // ['No pets', ...]
            $table->json('payment_methods')->nullable();     // ['ussd', 'mobile_money', ...]

            // Contact
            $table->string('contact_phone');
            $table->string('contact_email')->nullable();

            // Availability
            $table->date('availability_date')->nullable();
            $table->text('cancellation_policy')->nullable();

            $table->timestamps();
            $table->softDeletes();

            // Indexes
            $table->index(['user_id', 'status']);
            $table->index('city');
        });

        Schema::create('property_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('property_id')->constrained()->cascadeOnDelete();
            $table->string('path');
            $table->string('disk')->default('public');
            $table->boolean('is_primary')->default(false);
            $table->unsignedTinyInteger('order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('property_images');
        Schema::dropIfExists('properties');
    }
};
