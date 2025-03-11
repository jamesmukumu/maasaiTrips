<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration{
   
    public function up(): void
    {
        Schema::create('destinations', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->boolean("published")->default(false);
            $table->foreignId("olanka_users_id")->constrained()->onDelete("cascade");
            $table->string("destinationTitle")->nullable(false)->unique(true);
            $table->text("destinationThumbnail")->nullable(false);
            $table->text("destinationPhotos")->nullable(false);
            $table->text("destinationDescription")->nullable(false);
            $table->text("destinationAbout")->nullable(false);
            $table->string("destinationSlug")->unique(true)->nullable(false);        
});         
    }

 
    public function down(): void{
        Schema::dropIfExists('destinations');
    }
};
