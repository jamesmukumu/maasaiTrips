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
            $table ->string("firstName")->nullable(false);
            $table ->string("lastName")->nullable(false);
            $table -> string("fullName")->nullable(false);
            $table -> string("email")->nullable(false);
            $table -> string("phoneNumber")->nullable(false);
            $table -> smallInteger("adultsCount")->nullable(false);
            $table -> smallInteger("childrenCount")->nullable(true);
            $table -> text("travelDescription")->nullable(false);
            $table ->string("startStayDate")->nullable(false);
            $table ->string("endStayDate")->nullable(false);
            $table ->boolean("quotationAddressed")->default(false);
            $table -> smallInteger("roomsCount");
            $table -> text("kidsAges")->nullable(true);
        });
    }

   
    public function down(): void
    {
        Schema::dropIfExists('quotations');
    }
};
