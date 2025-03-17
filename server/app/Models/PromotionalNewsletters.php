<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Events\ActionRequired;

class PromotionalNewsletters extends Model{
   protected $fillable = ["hotDiscount","hotOffer","hotOfferDiscount","placesVisit","specialDeal","specialDealDescription","specialDiscountPrice","olanka_users_id","promotional_newsletters_Slug","Title"];
    use HasFactory;

    protected static function booted() {
        static::created(function ($promotionalNewsTemplate) {
            $entity = [
               "tableName"=>"Promotional Newsletters",
               "entityReferenceName"=>$promotionalNewsTemplate['Title'],
               "users_id"=>$promotionalNewsTemplate["olanka_users_id"]
            ];
            event(new ActionRequired($entity));
        });

        static::updated(function ($promotionalNewsTemplate) {
            $entity = [
               "tableName"=>"Promotional Newsletters",
               "entityReferenceName"=>$promotionalNewsTemplate['Title'],
               "users_id"=>$promotionalNewsTemplate["olanka_users_id"]
            ];
            event(new ActionRequired($entity));
        });
   
   
   
   
    }
    
    
}
