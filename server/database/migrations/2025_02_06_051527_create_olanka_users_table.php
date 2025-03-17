<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up(): void
    {
        Schema::create('olanka_users', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            
            $table ->string("userName")->unique();
            $table -> string("password");
            $table ->string("Email")->unique();
            $table -> boolean("superUser")->default(false);
            $table -> string("phoneNumber")->unique();
            $table -> boolean("emailVerified")->default(false);
});
    }

   
    public function down(): void
    {
        Schema::dropIfExists('olanka_users');
    }
};
