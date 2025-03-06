<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up(): void{
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("roomType");
            $table->string("bedBreakfast")->nullable(true);
            $table->string("halfBoard")->nullable(true);
            $table->string("fullBoard");
            $table->string("allInclusive");
            $table->float("singleRoomRateChild")->nullable(false);
            $table->float("doubleRoomRateChild")->nullable(false);
            $table->float("sharingRoomRateChildParent")->nullable(false);
            $table->integer("roomCount")->nullable(false);
            $table->integer("maximumRoomOccupancy");
            $table->tinyText("roomDescription");
            $table->mediumText("roomImages");
            $table->foreignId("hotels_models_id")->constrained()->onDelete("cascade");
            $table->foreignId("olanka_users_id")->constrained()->onDelete("cascade");
             
             
});
    }
public function down(): void{
        Schema::dropIfExists('rooms');
    }
};
