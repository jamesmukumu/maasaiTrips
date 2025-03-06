<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;


class HotelsModelFactory extends Factory{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
public function definition(): array{
return [
"hotelName"=>fake()->name(),
"hotelThumbnail"=>"http://res.cloudinary.com/dasrniwpk/image/upload/v1741170837/djesvtkqjnbbho78oi6o.webp",
"locationDescription"=>fake()->text(200),
"contactEmail"=>fake()->safeEmail(),

"contactPhoneNumber"=>fake()->phoneNumber(),
"contactPerson"=>"Manager",
"hotelCommission" => fake()->numberBetween(5000,100000),
"maximumRate"=>fake()->biasedNumberBetween(0,99),
"minimumRoomRate"=>fake()->biasedNumberBetween(0,99),
"imagesHotel"=>"['http:\/\/res.cloudinary.com\/dasrniwpk\/image\/upload\/v1741170831\/rvsm91fgtoij9e2n1ic7.jpg","http:\/\/res.cloudinary.com\/dasrniwpk\/image\/upload\/v1741170834\/kg7t963wckttffmkkiiq.jpg']",
"hotelCancellationPolicy"=>fake()->realText(199),
"hotelMetaDescription"=>fake()->realText(199),
"olanka_users_id"=>1,
"hotelDescription"=>fake()->realText(199)

    





];
    }
}
