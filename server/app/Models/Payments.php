<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payments extends Model{
protected $fillable =  ["signature","_id","paymentFor","amountPaid",'currency','firstName','lastName','email','packages','destinations','hotel_models'];
    use HasFactory;
}
