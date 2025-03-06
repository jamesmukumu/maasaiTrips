<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rooms extends Model{
protected $fillable = ["roomType","bedBreakfast","halfBoard","fullBoard","allInclusive","singleRoomRateChild","doubleRoomRateChild","sharingRoomRateChildParent","roomCount","maximumRoomOccupancy",'roomDescription',"roomImages","hotels_models_id",'olanka_users_id'];
    use HasFactory;
}
