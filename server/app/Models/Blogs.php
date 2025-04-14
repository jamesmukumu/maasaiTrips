<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blogs extends Model{
  protected $fillable = ['blogTitle','blogSlug','blogThumbnail','blogContent',"olanka_users_id","blog_categories_id","published","blogStatus"];  
    use HasFactory;

public function blogCategory(){
return $this->belongsTo(BlogCategory::class,"blog_categories_id","id");
}
public function creatorBlog(){
return $this->belongsTo(OlankaUsers::class,'olanka_users_id')->select(["id","userName"]);
}

  }
