<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Events\ActionRequired;

class NewsletterAlerts extends Model{
    protected $fillable = ["Title","TitleOne","imageOne","FinalContentOne","TitleTwo","imageTwo","FinalContentTwo","TitleThree","imageThree","FinalContentThree","TitleFour","imageFour","FinalContentFour","olanka_users_id","alert_newsletters_Slug"];
    use HasFactory;


    protected static function booted() {
        static::created(function ($newsLetterTemplate) {
            $entity = [
               "tableName"=>"Newsletter Alerts",
               "entityReferenceName"=>$newsLetterTemplate['Title'],
               "users_id"=>$newsLetterTemplate["olanka_users_id"]
            ];
            event(new ActionRequired($entity));
        });

        static::updated(function ($newsLetterTemplate) {
            $entity = [
               "tableName"=>"Newsletter Alerts",
               "entityReferenceName"=>$newsLetterTemplate['Title'],
               "users_id"=>$newsLetterTemplate["olanka_users_id"]
            ];
            event(new ActionRequired($entity));
        });
    }
    
    
}
