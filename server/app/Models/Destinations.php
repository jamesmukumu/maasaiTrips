<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Destinations extends Model{
 protected $fillable =  ["olanka_users_id","destinationTitle","destinationThumbnail","destinationPhotos","destinationDescription","destinationAbout"];
    use HasFactory;
}
