<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->tinyText("signature")->unique(true)->nullable(false);
            $table->string("_id")->unique(true)->nullable(false);
            $table->enum("paymentFor",['Packages',"Hotels","Destinations"])->nullable(false);
            $table->integer("amountPaid")->nullable(false);
            $table->string("currency")->default("USD");
            $table->string("firstName")->nullable(false);
            $table->string("lastName")->nullable(false);
            $table->string("email")->nullable(false);
            $table->foreignId("packages")->nullable(true)->constrained()->onDelete('cascade');
            $table->foreignId("hotels_models")->nullable(true)->constrained()->onDelete('cascade');
            $table->foreignId("destinations")->nullable(true)->constrained()->onDelete('cascade');


        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
