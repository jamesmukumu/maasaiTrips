<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration{

    public function up(): void
    {
        Schema::create('blog_categories', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("blogCategoryTitle")->unique(true)->nullable(false);
            $table->string("blogCategorySlug")->unique(true)->nullable(false);
            $table->tinyText("blogCategoryDescription")->nullable(false);
            $table->foreignId("olanka_users_id")->constrained();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blog_categories');
    }
};
