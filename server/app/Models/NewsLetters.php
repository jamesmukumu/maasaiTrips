<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NewsLetters extends Model{
protected $fillable = ["Title","content","olanka_users_id"];
use HasFactory;
public function newsLetterowner(){
return $this->belongsTo(OlankaUsers::class);
}

}
