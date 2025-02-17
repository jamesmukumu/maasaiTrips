<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bulk_mails', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table -> string("fullname")->unique();
            $table ->string("category");
            $table -> string("identificationNumber")->unique();
            $table -> string("phoneNumber")->unique();
            $table ->mediumText("description")->nullable();
            $table ->string("email")->unique();
            $table -> enum("identificationMethod",["passport","id"]);
            $table -> string("country")->nullable(true);
            $table -> foreignId("olanka_users_id")->constrained()->onDelete("cascade");

        });
    }

    
    public function down(): void
    {
        Schema::dropIfExists('bulk_mails');
    }
};
