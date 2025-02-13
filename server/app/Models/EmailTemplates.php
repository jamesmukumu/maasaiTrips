<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmailTemplates extends Model{
protected $fillable = ["subject","mailMessage","olanka_users_id","attachments"];
 use HasFactory;
public function emailowner(){
return $this->belongsTo(OlankaUsers::class);
}

}
