<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HotelsModel extends Model{
    protected $fillable = ["destinations_id","hotelThumbnail","hotelName","hotelSlug","locationDescription","contactEmail","contactPhoneNumber","contactPerson","hotelCommission","maximumRate","minimumRoomRate","imagesHotel","hotelCancellationPolicy","hotelMetaDescription","olanka_users_id","hotelDescription"];
    use HasFactory;

    public function rooms(){
    return $this->hasMany(Rooms::class,"hotels_models_id","id");
    }
    public function destination(){
        return $this->hasOne(Destinations::class, "id", "destinations_id");

    }
}
