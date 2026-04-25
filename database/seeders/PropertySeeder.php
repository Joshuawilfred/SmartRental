<?php

namespace Database\Seeders;

use App\Models\Property;
use App\Models\User;
use Illuminate\Database\Seeder;

class PropertySeeder extends Seeder
{
    public function run(): void
    {
        // Create 3 landlords, each with 4–6 properties
        User::factory()->landlord()->count(3)->create()->each(function (User $landlord) {
            Property::factory()
                ->forLandlord($landlord)
                ->count(fake()->numberBetween(4, 6))
                ->create();
        });

        // Create 5 tenants (no properties)
        User::factory()->tenant()->count(5)->create();
    }
}
