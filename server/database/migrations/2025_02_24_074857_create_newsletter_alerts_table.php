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
        Schema::create('newsletter_alerts', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
           $table -> string("Title")->unique();
           $table -> mediumText('TitleOne')->nullable(false);
           $table ->string("imageOne")->nullable(false);
           $table ->mediumText("FinalContentOne")->nullable(false);

           $table -> mediumText('TitleTwo')->nullable(false);
           $table ->string("imageTwo")->nullable(false);
           $table ->mediumText("FinalContentTwo")->nullable(false);


           $table -> mediumText('TitleThree')->nullable(false);
           $table ->string("imageThree")->nullable(false);
           $table ->mediumText("FinalContentThree")->nullable(false);

           $table -> mediumText('TitleFour')->nullable(false);
           $table ->string("imageFour")->nullable(false);
           $table ->mediumText("FinalContentFour")->nullable(false);
           $table ->foreignId("olanka_users_id")->constrained()->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('newsletter_alerts');
    }
};
