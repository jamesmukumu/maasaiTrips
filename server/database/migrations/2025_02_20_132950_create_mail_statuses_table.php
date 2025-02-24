<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up(): void{
        Schema::create('mail_statuses', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->enum("status",["delivered","pending","failed","cancelled"]);
            $table -> foreignId("olanka_users_id")->constrained()->onDelete('cascade');
            $table ->foreignId('bulk_mails_id')->constrained()->onDelete('cascade');
});
    }
    public function down(): void
    {
        Schema::dropIfExists('mail_statuses');
    }
};
