<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Tymon\JWTAuth\Contracts\JWTSubject;

class OlankaUsers extends Model implements JWTSubject
{
    use HasFactory;

    protected $fillable = ["userName","adminRoles", "password", "Email", "phoneNumber"];

    public function getJWTIdentifier(){
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}