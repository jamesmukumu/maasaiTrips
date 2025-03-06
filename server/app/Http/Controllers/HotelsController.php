<?php

namespace App\Http\Controllers;

use App\Models\HotelsModel;
use Cloudinary\Cloudinary;
use Dotenv\Exception\ValidationException;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Facades\JWTAuth;
use Log;


interface HotelInterface{
public function verifyingToken(Request $request);

}
class HotelsController extends Controller implements HotelInterface{
public function verifyingToken(Request $request){
try{
$tokenHeader = $request->header("Authorization");
$actualToken = substr($tokenHeader,7);
if(!$tokenHeader || !$actualToken){
throw new \Exception("Unauthorized",401);
}
$payload = JWTAuth::setToken($actualToken)->getPayload();
return $payload["sub"];
}catch(\Exception $err){
throw new \Exception($err->getMessage(),500);
}
}




public function createHotel(Request $request){
try{
$user_id = $this->verifyingToken($request);
$validatedRequest = $request->validate([
"destinations_id"=>"required|integer|exists:destinations,id",
"hotelName"=>"required|unique:hotels_models,hotelName",
"locationDescription"=>"required",
"contactEmail"=>"required|unique:hotels_models,contactEmail",
"contactPhoneNumber"=>"required",
"contactPerson"=>"required",
"hotelCommission"=>"required|integer",
"maximumRate"=>"required|integer",
"minimumRoomRate"=>"required|integer",
"hotelCancellationPolicy"=>"required",
"hotelMetaDescription"=>"required",
"hotelDescription"=>"required"

]);
$slug = Str::slug($validatedRequest["hotelName"],"-");
$validatedRequest["hotelSlug"] =  $slug;
$hotelImages= [];
$cld = new Cloudinary();
foreach($request->all() as $key => $value){
if($request->hasFile($key) && preg_match("/^image([A-Za-z]*)([1-6])$/", $key)){

$imageUrl = $cld->uploadApi()->upload($request->file($key)->getRealPath());
$hotelImages[] = $imageUrl["url"];
}
}
$validatedRequest["imagesHotel"] = json_encode($hotelImages);
$validatedRequest["olanka_users_id"] = $user_id;
$thumbnail= $cld->uploadApi()->upload($request->file("thumbnail")->getRealPath());
$validatedRequest["hotelThumbnail"]  = $thumbnail["url"];
HotelsModel::create($validatedRequest);

return response()->json([
"message"=>"Hotel Saved"
],200);
}catch(\Exception $err){
return response()->json([
"message"=>$err->getMessage()
],500);
}
}




public function deleteHotel(Request $request){
try{
$validatedRequest = $request->validate([
"id"=>"required|integer|exists:hotels_models,id"
]);
$hotelID = $request->query("id");
HotelsModel::where("id",$hotelID)->delete();
return response()->json([
"message"=>"Deleted"
]);
}catch(\Exception $err){
return response()->json([
"message"=>$err->getMessage()
]);
}
}




public function updateHotel(Request $request){
    try{
    $user_id = $this->verifyingToken($request);
    $validatedRequest = $request->validate([
    "hotelName"=>"nullable",
    "locationDescription"=>"nullable",
    "contactEmail"=>"nullable|unique:hotels_models,contactEmail",
    "contactPhoneNumber"=>"nullable",
    "contactPerson"=>"nullable",
    "hotelCommission"=>"nullable|integer",
    "maximumRate"=>"nullable|integer",
    "minimumRoomRate"=>"nullable|integer",
    "hotelCancellationPolicy"=>"nullable",
    "hotelMetaDescription"=>"nullable",
    "hotelDescription"=>"nullable",
    "id"=>"required|integer|exists:hotels_models,id"
    
    ]);
    $hotelID = $request->query("id");
    $slug = Str::slug($validatedRequest["hotelName"],"-");
    $validatedRequest["hotelSlug"] =  $slug;
    $hotelImages= [];
    $cld = new Cloudinary();
    foreach($request->all() as $key => $value){
    if($request->hasFile($key) && preg_match("/^image([A-Za-z]*)([1-6])$/", $key)){
    
    $imageUrl = $cld->uploadApi()->upload($request->file($key)->getRealPath());
    $hotelImages[] = $imageUrl["url"];
    }
    }
    $validatedRequest["imagesHotel"] = json_encode($hotelImages);
    $validatedRequest["olanka_users_id"] = $user_id;
    $thumbnail =  null;
if($request->hasFile("thumbnail")){
    $thumbnail= $cld->uploadApi()->upload($request->file("thumbnail")->getRealPath());
    $validatedRequest["hotelThumbnail"]  = $thumbnail["url"];
}

HotelsModel::where("id",$hotelID)->update($validatedRequest);
    
    return response()->json([
    "message"=>"update Saved"
    ],200);
    }catch(\Exception $err){
    Log::error($err->getMessage());
    return response()->json([
     "message"=>"Something Went Wrong"
    ],500);
    }
    }




public function publishHotel(Request $request){
try{
$validatedRequest = $request->validate([
"id"=>"required|integer|exists:hotels_models,id"
]);
$hotelID = $request->query("id");
$hotelData = HotelsModel::find($hotelID)->first();
$hotelData["publishable"] = true;
$hotelData->save();
return response()->json([
"message"=>"updated"
]);
}catch(\Exception $err){
Log::error($err->getMessage());
return response()->json([
"message"=>"Something Went Wrong"
]);
}
}




public function fetchHotel(Request $request){
try{
$validatedRequest = $request->validate([
"id"=>"required|integer|exists:hotels_models,id"
]);
$hotelID = $request->query("id");
$hotelData = HotelsModel::with(["rooms"])->find($hotelID);

return response()->json([
"message"=>"Hotel Fetched",
"data"=>$hotelData
]);
}catch(\Exception $err){
Log::error($err->getMessage());
return response()->json([
"message"=>"Something went wrong"
],500);
}catch(ValidationException $errValidation){
return response()->json([
"message"=>"Something went wrong"
],500);
}
}


public function fetchMyHotels(Request $request){
try{
$userID = $this->verifyingToken($request);
$hotels = HotelsModel::with(["rooms"])->orderBy("created_at")->paginate(100);
return response()->json([
"message"=>"Fetch Successful",
"nextPage"=>$hotels->nextPageUrl(),
"previousPage"=>$hotels->previousPageUrl(),
"data"=>$hotels->items()
]);
}catch(\Exception $err){

Log::error($err->getMessage());
return response()->json([
"message"=>"Something went wrong"
],500);
}
}









}
