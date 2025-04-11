<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration{
    
    public function up(): void
    {
        Schema::create('blogs', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("blogTitle")->nullable(false)->unique(true);
            $table->string("blogSlug")->nullable(false)->unique(true);
            $table->string("blogThumbnail")->nullable(true);
            $table->fullText("blogContent")->nullable(false);
            $table->foreignId("olanka_users_id")->constrained()->onDelete("cascade");
            $table->foreignId("blog_categories_id")->constrained()->onDelete('cascade');
            $table->boolean("published")->default(false);
            $table->enum("blogStatus",["pending","rejected","approved"])->nullable(false)->default("pending"); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blogs');
    }
};
