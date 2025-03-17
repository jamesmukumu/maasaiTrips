<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Events\ActionRequired;

class Rooms extends Model{
protected $fillable = ["roomType","bedBreakfast","halfBoard","fullBoard","allInclusive","singleRoomRateChild","doubleRoomRateChild","sharingRoomRateChildParent","roomCount","maximumRoomOccupancy",'roomDescription',"roomImages","hotels_models_id",'olanka_users_id'];
    use HasFactory;


public function hotels(){
return $this->belongsTo(HotelsModel::class,"id")->select(["id","hotelName"]);
}

protected static function booted() {
    static::created(function ($roomTemplate) {
        $entity = [
           "tableName"=>"Rooms",
           "entityReferenceName"=>$roomTemplate['roomType'],
           "users_id"=>$roomTemplate["olanka_users_id"]
        ];
        event(new ActionRequired($entity));
    });

    static::updated(function ($roomTemplate) {
        $entity = [
           "tableName"=>"Rooms",
           "entityReferenceName"=>$roomTemplate['roomType'],
           "users_id"=>$roomTemplate["olanka_users_id"]
        ];
        event(new ActionRequired($entity));
    });




}



}
