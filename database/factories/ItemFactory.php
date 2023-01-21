<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Item;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Item>
 */
class ItemFactory extends Factory
{

    protected $model = Item::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'item_number' => $this->faker->unique()->numberBetween($min = 1, $max = 100),
            'item_name' => $this->faker->word(),
            'discount' => $this->faker->numberBetween($min = 0, $max = 100),
            'stock' => $this->faker->numberBetween($min = 1, $max = 100),
            'unit_price' => $this->faker->randomFloat($nbMaxDecimals = 2, $min = 0, $max = 300),
            'image_url' => $this->faker->imageUrl($width = 640, $height = 480),
            'status' => $this->faker->randomElement(['active','disabled']),
            'description' => $this->faker->text($maxNbChars = 200),
            'created_at' => $this->faker->dateTime($max = 'now', $timezone = null)
        ];
    }
}
