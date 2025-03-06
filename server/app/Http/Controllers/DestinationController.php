<?php

namespace App\Http\Controllers;

use App\Models\Destinations;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Facades\JWTAuth;
use Cloudinary\Cloudinary;
use Log;


interface DestinationsInterface
{
    public function verifyToken(Request $request);
}


class DestinationController extends Controller implements DestinationsInterface{
    public function verifyToken(Request $request)
    {
        try {
            $tokenHeader = $request->header("Authorization");
            $actualToken = substr($tokenHeader, 7);
            if (!$tokenHeader || !$actualToken) {
                throw new \Exception("Unauthorized", 401);
            }
            $payload = JWTAuth::setToken($actualToken)->getPayload();
            return $payload["sub"];
        } catch (\Exception $err) {
            throw new \Exception($err->getMessage(), 500);
        }
    }

    public function createDestination(Request $request){
        try{
        $user_id = $this->verifyToken($request);
        $validatedRequest = $request->validate([
        "destinationTitle"=>"required|unique:destinations,destinationTitle",
        "destinationAbout"=>"required",
        "destinationDescription"=>"required"
        ]);
         $destinationImages= [];
        $cld = new Cloudinary();
        foreach($request->all() as $key => $value){
        if($request->hasFile($key) && preg_match("/^image([A-Za-z]*)([1-6])$/", $key)){
        $imageUrl = $cld->uploadApi()->upload($request->file($key)->getRealPath());
        $destinationImages[] = $imageUrl["url"];
        }
        }
        $validatedRequest["destinationPhotos"] = json_encode($destinationImages);
        $validatedRequest["olanka_users_id"] = $user_id;
        $thumbnail= $cld->uploadApi()->upload($request->file("thumbnail")->getRealPath());
        $validatedRequest["destinationThumbnail"]  = $thumbnail["url"];
        Destinations::create($validatedRequest);
        
        return response()->json([
        "message"=>"Destination Added"
        ],200);
        }catch(\Exception $err){
        return response()->json([
        "message"=>$err->getMessage()
        ],500);
        }
        }



public function fetchDestinations(){
try{
$destinations =  Destinations::all()->select(["id","destinationTitle"]);
return $destinations;
}catch(\Exception $err){
Log::error($err->getMessage());
}


}







}
