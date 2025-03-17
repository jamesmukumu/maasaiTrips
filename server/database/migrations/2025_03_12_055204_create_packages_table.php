<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration{
public function up(): void{
        Schema::create('packages', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("packageTitle")->unique(true)->nullable(false);
            $table->text("packageImage")->nullable(false);
            $table->text('packageOverview')->nullable(false);
            $table->string('packageSlug')->nullable(false);
            $table->boolean('published')->default(false);
            $table->text("packageAbout")->nullable(false);
            $table->text("packageInclusives")->nullable(false);
            $table->text("packageExclusives")->nullable(false);
            $table->text("packageSpecialNotes")->nullable(false);
            $table->integer("packageCharge")->nullable(false);
            $table->string("startDate")->nullable(false);
            $table->string("endDate")->nullable(false);
            $table->string("packageChargeCurrency")->default("KES")->nullable(false);
            $table->foreignId('olanka_users_id')->constrained()->onDelete('cascade');
            $table->text("packageImages")->nullable(false);
            $table->foreignID("destinations_id")->constrained()->onDelete("cascade");
            $table->enum("budgetType",["Mid Range Tour","Luxury Tour","Private Tour"]);
            $table->foreignID("package_categories_id")->constrained()->onDelete("cascade");
            $table->enum("mode_transport",["Air","LandCruiser","Van","Jeep"]);
            $table->enum("actionPending",["approved","rejected","pending"])->default("pending")->nullable(false);

        });
    }

 
    public function down(): void
    {
        Schema::dropIfExists('packages');
    }
};
