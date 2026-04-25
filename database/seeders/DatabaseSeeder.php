<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Fixed accounts for manual testing
        User::factory()->landlord()->create([
            'name'  => 'Test Landlord',
            'email' => 'landlord@example.com',
        ]);

        User::factory()->tenant()->create([
            'name'  => 'Test Tenant',
            'email' => 'tenant@example.com',
        ]);

        $this->call(PropertySeeder::class);
    }
}
