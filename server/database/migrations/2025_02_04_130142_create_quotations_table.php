<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up(): void
    {
        Schema::create('quotations', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table ->string("firstName");
            $table ->string("lastName");
            $table -> string("fullName")->nullable();
            $table -> string("email")->unique();
            $table -> string("phoneNumber")->unique();
            $table -> smallInteger("adultsCount");
            $table -> smallInteger("childrenCount");
            $table -> text("travelDescription");
            $table ->string("startStayDate");
            $table ->string("endStayDate");
            $table ->boolean("quotationAddressed")->default(false);
            $table -> smallInteger("roomsCount");
            $table -> text("kidsAges");
        });
    }

   
    public function down(): void
    {
        Schema::dropIfExists('quotations');
    }
};
