<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Events\ActionRequired;

class HotelsModel extends Model{
    protected $fillable = ["latitude","longitude","destinations_id","hotelThumbnail","hotelName","hotelSlug","locationDescription","contactEmail","contactPhoneNumber","contactPerson","hotelCommission","maximumRate","minimumRoomRate","imagesHotel","hotelCancellationPolicy","hotelMetaDescription","olanka_users_id","hotelDescription"];
    use HasFactory;

    public function rooms(){
    return $this->hasMany(Rooms::class,"hotels_models_id","id");
    }
    public function destination(){
        return $this->hasOne(Destinations::class, "id", "destinations_id");

    }



    protected static function booted() {
        static::created(function ($hotel) {
            $entity = [
               "tableName"=>"Hotels",
               "entityReferenceName"=>$hotel['hotelName'],
               "users_id"=>$hotel["olanka_users_id"]
            ];
            event(new ActionRequired($entity));
        });

        static::updated(function ($hotel) {
            $entity = [
               "tableName"=>"Hotels",
               "entityReferenceName"=>$hotel['hotelName'],
               "users_id"=>$hotel["olanka_users_id"]
            ];
            event(new ActionRequired($entity));
        });
        
    }
    
    
}
