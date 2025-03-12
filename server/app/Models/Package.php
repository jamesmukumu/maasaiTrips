<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Package extends Model{
protected $fillable = ["package_categories_id","packageImages","destinations_id",'budgetType','mode_transport','packageInclusives','packageExclusives','packageSpecialNotes',"startDate","endDate","packageChargeCurrency","packageCharge","packageTitle","packageImage","packageOverview","packageSlug",'published',"olanka_users_id",'packageAbout'];
    use HasFactory;
}
