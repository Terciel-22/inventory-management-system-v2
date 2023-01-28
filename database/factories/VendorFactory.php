<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Vendor>
 */
class VendorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'full_name' => $this->faker->word(),
            'mobile' => $this->faker->word(),
            'telephone' => $this->faker->word(),
            'email' => $this->faker->word(),
            'address' => $this->faker->word(),
            'region' => $this->faker->word(),
            'province' => $this->faker->word(),
            'city_municipality' => $this->faker->word(),
            'barangay' => $this->faker->word(),
            'status' => $this->faker->randomElement(['active','disabled']),
        ];
    }
}
