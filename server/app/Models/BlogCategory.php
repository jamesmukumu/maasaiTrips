<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlogCategory extends Model{
protected $fillable = ['blogCategoryTitle','blogCategorySlug','blogCategoryDescription','olanka_users_id'];  


    use HasFactory;
}
