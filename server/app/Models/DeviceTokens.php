<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeviceTokens extends Model{
    protected $fillable = ["deviceToken"];
    use HasFactory;
}
