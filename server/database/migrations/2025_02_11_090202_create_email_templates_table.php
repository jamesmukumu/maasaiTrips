<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up(): void
    {
        Schema::create('email_templates', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->enum("actionPending",["approved","rejected","pending"])->default("pending")->nullable(false);
            $table -> string("subject");
            $table -> longText("mailMessage");
            $table -> string('attachments')->nullable(true);
            $table -> foreignId("olanka_users_id")->constrained()->onDelete("cascade");
        });
    }

   
    public function down(): void{
        Schema::dropIfExists('email_templates');
    }
};
