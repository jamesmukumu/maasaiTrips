<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration{
   
    public function up(): void
    {
        Schema::create('hotels_models', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table ->string("hotelName")->unique(true)->nullable(false);
            $table->string("hotelSlug")->unique(true)->nullable(false);
           $table->boolean("publishable")->default(false);
           $table->string("hotelThumbnail")->nullable(false);
            $table->text("locationDescription")->nullable(false);
            $table->string("contactEmail")->nullable(false);
            $table->tinyInteger("ratings")->default(5);
            $table->enum("actionPending",["approved","rejected","pending"])->default("pending")->nullable(false);
            $table ->string("contactPhoneNumber",12)->nullable(false); 
            $table->enum("contactPerson",["Manager","Reservation","Hotelier"])->nullable(false);
            $table->mediumInteger("hotelCommission")->nullable(false);
            $table->mediumInteger("maximumRate")->nullable(false);
            $table->mediumInteger("minimumRoomRate")->nullable(false);
            $table->text("imagesHotel");
            $table->float("latitude")->nullable(false);
            $table->float("longitude")->nullable(false);
            $table->text("hotelCancellationPolicy")->nullable(false);
            $table->text("hotelMetaDescription");
            $table ->foreignId("olanka_users_id")->constrained()->onDelete("cascade");
            $table->text("hotelDescription")->nullable(false);
            $table->foreignId("destinations_id")->constrained()->onDelete("cascade");
 
        });
    }

    
    public function down(): void
    {
        Schema::dropIfExists('hotels_models');
    }
};
