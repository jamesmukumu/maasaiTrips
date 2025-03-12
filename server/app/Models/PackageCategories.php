<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PackageCategories extends Model{
   protected $fillable = ["title","slug","olanka_users_id"];
    use HasFactory;
}
