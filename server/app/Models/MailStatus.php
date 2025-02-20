<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MailStatus extends Model{
protected $fillable = ['status','olanka_users_id','bulk_mails_id'];
use HasFactory;
public function olankaAdminRelation(){
return  $this->belongsTo(OlankaUsers::class);
}
public function bulkUserRelation(){
return $this->hasMany(BulkMails::class);
}


}
