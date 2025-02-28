<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PromotionalNewsletters extends Model{
   protected $fillable = ["hotDiscount","hotOffer","hotOfferDiscount","placesVisit","specialDeal","specialDealDescription","specialDiscountPrice","olanka_users_id","slug","Title"];
    use HasFactory;
}
