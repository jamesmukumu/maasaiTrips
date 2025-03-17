<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Events\ActionRequired;

class PackageCategories extends Model{
   protected $fillable = ["title","slug","olanka_users_id"];
    use HasFactory;

    protected static function booted() {
        static::created(function ($packageCategory) {
            $entity = [
               "tableName"=>"Package Categories",
               "entityReferenceName"=>$packageCategory['title'],
               "users_id"=>$packageCategory["olanka_users_id"]
            ];
            event(new ActionRequired($entity));
        });

        static::updated(function ($packageCategory) {
            $entity = [
               "tableName"=>"Package Categories",
               "entityReferenceName"=>$packageCategory['title'],
               "users_id"=>$packageCategory["olanka_users_id"]
            ];
            event(new ActionRequired($entity));
        });


        
    }
    
    

}
