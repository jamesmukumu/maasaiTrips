<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Quotation>
 */
class QuotationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array{
        $firstName = fake()->firstName();
        $lastName = fake()->lastName();
        return [
            "firstName"=>$firstName,
            "lastName"=>$lastName,
             "fullName"=> $firstName." ".$lastName,
             "email"=>fake()->email,
             "phoneNumber"=>fake()->phoneNumber(),
             "adultsCount"=> fake()->numberBetween(0,10),
             "childrenCount" => fake()->numberBetween(0,10),
             "travelDescription"=> fake()->realTextBetween(100,170),
             "roomsCount"=>fake()->numberBetween(0,10),
             "kidsAges" => "5,6,7,8,9",
             "startStayDate" =>"01/02/2025",
             "endStayDate" => "05/02/2025",
             "quotationAddressed" => false


        ];
    }
}
