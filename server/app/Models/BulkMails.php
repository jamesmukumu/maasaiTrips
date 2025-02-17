<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BulkMails extends Model{
protected $fillable = ["fullname","category","identificationNumber","phoneNumber","description","email","identificationMethod","country"];
    use HasFactory;


    
}
