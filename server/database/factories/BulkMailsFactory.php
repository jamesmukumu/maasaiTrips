<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
class BulkMailsFactory extends Factory{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array{
        return [
            "fullname"=>fake()->name(),
            "category"=>"Clientele",
            "identificationNumber"=> strval(fake()->numberBetween(100000,8900000)),
            "phoneNumber"=>fake()->phoneNumber(),
            "description"=>fake()->realTextBetween(160,200),
            "email"=>fake()-> email(),
            "identificationMethod"=>"passport",
            "country"=>fake()->country(),
            "olanka_users_id"=>1



        ];
    }
}
