<?php

namespace App\Models;

use App\Events\ActionRequired;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Destinations extends Model {
    use HasFactory;

    protected $fillable = [
        "olanka_users_id", "destinationSlug", "destinationTitle",
        "destinationThumbnail", "destinationPhotos", "destinationDescription",
        "destinationAbout"
    ];

    public function fetchHotels() {
        return $this->hasMany(HotelsModel::class, "destinations_id", "id")
            ->select(["id", "hotelName", "hotelThumbnail", "hotelSlug", 'destinations_id']);
    }

    public function packages() {
        return $this->hasMany(Package::class, "destinations_id", "id")
            ->select(["id", "packageSlug", "packageChargeCurrency",
                "budgetType", "mode_transport", "destinations_id",
                "packageImage", "packageCharge"]);
    }

    protected static function booted() {
        static::created(function ($destination) {
            $entity = [
               "tableName" => "destinations",
               "entityReferenceName" => $destination['destinationTitle'],
               "users_id" => $destination["olanka_users_id"]
            ];
            event(new ActionRequired($entity));
        });

        static::updated(function ($destination) {
            $entity = [
               "tableName" => "destinations",
               "entityReferenceName" => $destination['destinationTitle'],
               "users_id" => $destination["olanka_users_id"]
            ];
            event(new ActionRequired($entity));
        });
    }
}