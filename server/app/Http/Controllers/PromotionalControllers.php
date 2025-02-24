<?php

namespace App\Http\Controllers;

use App\Mail\MailPromotionalAlerts;
use App\Models\PromotionalNewsletters;
use Cloudinary\Cloudinary;
use Dotenv\Exception\ValidationException;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Log;
use Mail;
interface PromotionalInterface{
public function verificationToken(Request $request);
}
class PlaceVisit
{
    public $destinationTitle;
    public $destinationDescription;
    public $destinationImage;
    public $destinationPrice;

    public function __construct($title, $descp, $img, $price)
    {
        $this->destinationTitle = $title;
        $this->destinationDescription = $descp;
        $this->destinationImage = $img;
        $this->destinationPrice = $price;
    }
}




class PromotionalControllers extends Controller implements PromotionalInterface{


    public function verificationToken(Request $request)
    {
        try {
            $tokenHeader = $request->header("Authorization");
            if (!$tokenHeader || strlen($tokenHeader) < 8) {
                throw new \Exception("Missing or invalid Token header");
            }

            $token = substr($tokenHeader, 7);
            $payload = JWTAuth::setToken($token)->getPayload();
            return $payload['sub'];

        } catch (\Exception $err) {
            Log::error($err->getMessage());
            throw new \Exception($err->getMessage());
        }
    }

    public function sendNewsLetterPromotional(Request $request)
    {
        try {
            $mailer = app(MailPromotionalAlerts::class);
            Mail::to("jamesmukumu03@gmail.com")->send($mailer);
            echo "Sent";
        } catch (\Exception $err) {
            echo $err->getMessage();
        }
    }



    public function savePromotionalNewsletters(Request $request)
    {
        try {

            $validatedRequest = $request->validate([
                "hotDiscount" => "required|integer",
                "hotOffer" => "required",
                "hotOfferDiscount" => "required|min:0",
                "specialDeal" => "required",
                "specialDealDescription" => "required",
                "specialDiscountPrice" => "required|integer"
            ]);
            $validatedRequest["olanka_users_id"] = $this->verificationToken($request);

            $groupedDestinations = [];

            foreach ($request->all() as $key => $value) {
           if($request->hasFile($key) && preg_match('/^destination([A-Za-z]+)(One|Two)$/', $key, $matches)){
            $cld = new Cloudinary();
            $fileUrl = $cld->uploadApi()->upload($request->file($key)->getRealPath());
            $value = $fileUrl["url"];
            $field = $matches[1];
            $suffix = $matches[2];
             $groupedDestinations[$suffix][$field] = $value;
           }

if (preg_match('/^destination([A-Za-z]+)(One|Two)$/', $key, $matches)) {
                    $field = $matches[1];
                    $suffix = $matches[2];
                   

                    $groupedDestinations[$suffix][$field] = $value;
                }
            }

            $placeVisits = [];
            foreach ($groupedDestinations as $suffix => $data) {
                $placeVisits[] = [
                    'destinationTitle' => $data['Title'] ?? null,
                    'destinationDescription' => $data['Description'] ?? null,
                    'destinationImage' => $data['Image'] ?? null,
                    'destinationPrice' => $data['Price'] ?? null
                ];
            }
          $validatedRequest["placesVisit"] = json_encode($placeVisits);

          PromotionalNewsletters::create($validatedRequest);
          return response()->json([
        "message"=>"created"
          ]);
          
} catch (\Exception $err) {
            return response()->json(['error' => $err->getMessage()], 500);
        } catch (ValidationException $errValidate) {
            return response()->json(['errors' => $errValidate->errors()], 422);
        }
    }

}
