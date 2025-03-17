<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Events\ActionRequired;

class Package extends Model{
protected $fillable = ["package_categories_id","packageImages","destinations_id",'budgetType','mode_transport','packageInclusives','packageExclusives','packageSpecialNotes',"startDate","endDate","packageChargeCurrency","packageCharge","packageTitle","packageImage","packageOverview","packageSlug",'published',"olanka_users_id",'packageAbout'];
    use HasFactory;


    protected static function booted() {
        static::created(function ($package) {
            $entity = [
               "tableName"=>"Packages",
               "entityReferenceName"=>$package['packageTitle'],
               "users_id"=>$package["olanka_users_id"]
            ];
            event(new ActionRequired($entity));
        });
        static::updated(function ($package) {
            $entity = [
               "tableName"=>"Packages",
               "entityReferenceName"=>$package['packageTitle'],
               "users_id"=>$package["olanka_users_id"]
            ];
            event(new ActionRequired($entity));
        });


    }
    
    
}
