<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blogs extends Model{
  protected $fillable = ['blogTitle','blogSlug','blogThumbnail','blogContent',"olanka_users_id","blog_categories_id","published","blogStatus"];  
    use HasFactory;

  }
