<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Events\ActionRequired;
class EmailTemplates extends Model{
protected $fillable = ["subject","mailMessage","olanka_users_id","attachments"];
 use HasFactory;
public function emailowner(){
return $this->belongsTo(OlankaUsers::class);
}



protected static function booted() {
    static::created(function ($emailTemplate) {
        $entity = [
           "tableName"=>"Email",
           "entityReferenceName"=>$emailTemplate['subject'],
           "users_id"=>$emailTemplate["olanka_users_id"]
        ];
        event(new ActionRequired($entity));
    });
    static::updated(function ($emailTemplate) {
        $entity = [
           "tableName"=>"Email",
           "entityReferenceName"=>$emailTemplate['subject'],
           "users_id"=>$emailTemplate["olanka_users_id"]
        ];
        event(new ActionRequired($entity));
    });
    
}



}
