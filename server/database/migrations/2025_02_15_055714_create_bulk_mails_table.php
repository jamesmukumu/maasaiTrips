<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration{
    
    public function up(): void
    {
        Schema::create('bulk_mails', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->enum("actionPending",["approved","rejected","pending"])->nullable(false)->default('pending');
            $table -> string("fullname")->unique()->nullable(false);
            $table ->enum("category",["Client Local","Administator","Hotel","client"])->nullable(false);
            $table -> string("identificationNumber")->unique();
            $table -> string("phoneNumber")->unique()->nullable(false);
            $table ->mediumText("description")->nullable(true);
            $table ->string("email")->unique();
            $table -> enum("identificationMethod",["passport","id"])->nullable(false);
            $table -> string("country")->nullable(true);
            $table -> foreignId("olanka_users_id")->constrained()->onDelete("cascade");

        });
    }

    
    public function down(): void{
        Schema::dropIfExists('bulk_mails');
    }
};
