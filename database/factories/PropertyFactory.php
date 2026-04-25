<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\Property>
 */
class PropertyFactory extends Factory
{
    public function definition(): array
    {
        $cities = ['Dar es Salaam', 'Arusha', 'Mwanza', 'Zanzibar', 'Dodoma', 'Mbeya', 'Morogoro'];
        $regions = ['Dar es Salaam', 'Arusha', 'Mwanza', 'Zanzibar North', 'Dodoma', 'Mbeya', 'Morogoro'];

        $cityIndex = fake()->numberBetween(0, count($cities) - 1);
        $city = $cities[$cityIndex];
        $region = $regions[$cityIndex];

        $rooms = fake()->numberBetween(1, 5);
        $bathrooms = fake()->numberBetween(1, $rooms);

        $amenities = fake()->randomElements(
            ['WiFi', 'Parking', 'Water', 'Electricity', 'Security', 'Generator', 'Swimming Pool', 'Gym', 'Garden'],
            fake()->numberBetween(2, 5)
        );

        $features = fake()->randomElements(
            ['Furnished', 'Air Conditioning', 'Balcony', 'Tiled Floors', 'CCTV', 'Borehole', 'Solar Power', 'Gated Community'],
            fake()->numberBetween(2, 4)
        );

        $rules = fake()->randomElements(
            ['No Pets', 'No Smoking', 'No Loud Music After 10PM', 'Families Only', 'No Sub-letting', 'Keep Common Areas Clean'],
            fake()->numberBetween(1, 3)
        );

        $paymentMethods = fake()->randomElements(
            ['M-Pesa', 'Tigo Pesa', 'Airtel Money', 'Bank Transfer', 'Cash'],
            fake()->numberBetween(1, 3)
        );

        $titles = [
            "{$rooms} Bedroom Apartment in {$city}",
            "Modern {$rooms}BR House in {$city}",
            "Spacious {$rooms} Room Flat - {$city}",
            "Self-contained {$rooms}BR Unit, {$city}",
            "Furnished {$rooms} Bedroom House in {$city}",
        ];

        return [
            'user_id'             => User::factory()->landlord(),
            'title'               => fake()->randomElement($titles),
            'description'         => fake()->paragraphs(2, true),
            'location'            => fake()->streetAddress() . ', ' . $city,
            'address'             => fake()->streetAddress(),
            'city'                => $city,
            'region'              => $region,
            'rental_price'        => fake()->numberBetween(150_000, 2_500_000), // TZS per month
            'capacity'            => fake()->numberBetween(1, 8),
            'rooms'               => $rooms,
            'bathrooms'           => $bathrooms,
            'status'              => fake()->randomElement(['available', 'available', 'occupied', 'maintenance']),
            'amenities'           => $amenities,
            'features'            => $features,
            'rules'               => $rules,
            'payment_methods'     => $paymentMethods,
            'contact_phone'       => '+255' . fake()->numerify('7########'),
            'contact_email'       => fake()->safeEmail(),
            'availability_date'   => fake()->dateTimeBetween('now', '+3 months')->format('Y-m-d'),
            'cancellation_policy' => fake()->randomElement([
                'One month notice required.',
                'Two weeks notice required.',
                'No refunds after move-in.',
                'One month deposit is non-refundable.',
            ]),
        ];
    }

    public function available(): static
    {
        return $this->state(fn (array $attributes) => ['status' => 'available']);
    }

    public function occupied(): static
    {
        return $this->state(fn (array $attributes) => ['status' => 'occupied']);
    }

    public function forLandlord(User $landlord): static
    {
        return $this->state(fn (array $attributes) => ['user_id' => $landlord->id]);
    }
}
