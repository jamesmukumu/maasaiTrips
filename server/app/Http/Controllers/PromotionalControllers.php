<?php

namespace App\Http\Controllers;

use App\Mail\MailPromotionalAlerts;
use Dotenv\Exception\ValidationException;
use Illuminate\Http\Request;
use Mail;
interface PromotionalInterface {

}
class PlaceVisit {
  public $destinationTitle;
  public $destinationDescription;
  public $destinationImage;
  public $destinationPrice;

  public function __construct($title, $descp, $img, $price) {
      $this->destinationTitle = $title;
      $this->destinationDescription = $descp;
      $this->destinationImage = $img;
      $this->destinationPrice = $price;
  }
}




class PromotionalControllers extends Controller{
    public function sendNewsLetterPromotional(Request $request){
        try{
      $mailer = app(MailPromotionalAlerts::class);
        Mail::to("jamesmukumu03@gmail.com")->send($mailer);
        echo "Sent";
        }catch(\Exception $err){
        echo $err->getMessage();
        }
        }



        



        public function savePromotionalNewsletters(Request $request){
          try {
              $validatedRequest = $request->validate([
                  "hotDiscount" => "required|integer",
                  "hotOffer" => "required",
                  "hotOfferDiscount" => "required|min:0",
                  "specialDeal" => "required",
                  "specialDealDescription" => "required",
                  "specialDiscountPrice" => "required|integer"
              ]);
      
              // Extract fields dynamically
              $groupedDestinations = [];
      
              foreach ($request->all() as $key => $value) {
                  // Match keys that start with "destination" and end with a number suffix
                  if (preg_match('/^(destination[a-zA-Z]+)(\d+)$/', $key, $matches)) {
                      $field = $matches[1]; // e.g., destinationTitle, destinationDescription
                      $index = $matches[2]; // e.g., 1, 2
      
                      // Group values by their numerical index
                      $groupedDestinations[$index][$field] = $value;
                  }
              }
      
              // Convert grouped data into objects
              $placeVisits = [];
              foreach ($groupedDestinations as $index => $data) {
                  $placeVisits[] = new PlaceVisit(
                      $data['destinationTitle'] ?? null,
                      $data['destinationDescription'] ?? null,
                      $data['imageDestination'] ?? null,
                      $data['priceDestination'] ?? null
                  );
              }
      
              // Now $placeVisits is an array of PlaceVisit objects, ready for further processing
              return response()->json(['places' => $placeVisits]);
      
          } catch (\Exception $err) {
              return response()->json(['error' => $err->getMessage()], 500);
          } catch (ValidationException $errValidate) {
              return response()->json(['errors' => $errValidate->errors()], 422);
          }
      }
      



}
