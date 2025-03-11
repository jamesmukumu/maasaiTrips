<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Destinations extends Model{
 protected $fillable =  ["olanka_users_id",'destinationSlug',"destinationTitle","destinationThumbnail","destinationPhotos","destinationDescription","destinationAbout"];
    use HasFactory;
 public function fetchHotels(){
return $this->hasMany(HotelsModel::class,"destinations_id","id")->select(["id","hotelName","hotelThumbnail","hotelSlug",'destinations_id']);
 }
}
