<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quotation extends Model{
    protected $fillable = ["kidsAges",'firstName','lastName','fullName','email','phoneNumber','adultsCount','childrenCount','travelDescription','startStayDate','roomsCount',"endStayDate"];

    use HasFactory;
    public function conjoinNames(){
    return "{$this->firstName} {$this->lastName}";
    }
}
