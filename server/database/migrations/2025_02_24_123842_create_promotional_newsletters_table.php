<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
   
    public function up(): void{
        Schema::create('promotional_newsletters', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->enum("actionPending",["approved","rejected","pending"])->default("pending")->nullable(false);
            $table -> tinyInteger("hotDiscount");
            $table -> string("promotional_newsletters_Slug")->unique(true);
            $table ->string("Title")->unique(true);
            $table-> tinyText("hotOffer")->nullable(false);
            $table -> integer("hotOfferDiscount")->nullable(false);
            $table -> text("placesVisit")->nullable(false);
            $table -> string("specialDeal")->nullable(false);
            $table -> text("specialDealDescription")->nullable(false);
            $table -> integer("specialDiscountPrice")->nullable(false);
            $table -> foreignId("olanka_users_id")->constrained()->onDelete("cascade");
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('promotional_newsletters');
    }
};
