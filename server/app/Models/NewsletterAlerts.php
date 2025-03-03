<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NewsletterAlerts extends Model{
    protected $fillable = ["Title","TitleOne","imageOne","FinalContentOne","TitleTwo","imageTwo","FinalContentTwo","TitleThree","imageThree","FinalContentThree","TitleFour","imageFour","FinalContentFour","olanka_users_id","alert_newsletters_Slug"];
    use HasFactory;
}
