<?php

namespace App\Http\Controllers;

use App\Models\Rooms;
use Illuminate\Http\Request;
use Cloudinary\Cloudinary;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Facades\JWTAuth;
use Log;


interface RoomsInterface{
public function verifyToken(Request $request);

}


class RoomsController extends Controller implements RoomsInterface{


    public function verifyToken(Request $request){
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
    public function createRoom(Request $request){
        try{
        $user_id = $this->verifyToken($request);
        $validatedRequest = $request->validate([
        "roomType"=>"required",
        "bedBreakfast"=>"required",
        "halfBoard"=>"required",
        "fullBoard"=>"required",
        "allInclusive"=>"required",
        "singleRoomRateChild"=>"required|numeric",
        "doubleRoomRateChild"=>"required|numeric",
        "sharingRoomRateChildParent"=>"required|numeric",
        "roomCount"=>"required|integer",
        "maximumRoomOccupancy"=>"required|integer",
        "roomDescription"=>"required",
        "hotels_models_id"=>"required|exists:hotels_models,id"
        
        ]);

        $roomsImages= [];
        $cld = new Cloudinary();
        foreach($request->all() as $key => $value){
        if($request->hasFile($key) && preg_match("/^room([A-Za-z]*)([1-9])$/", $key)){
        
        $imageUrl = $cld->uploadApi()->upload($request->file($key)->getRealPath());
        $roomsImages[] = $imageUrl["url"];
        }
        }
        $validatedRequest["roomImages"] = json_encode($roomsImages);
        $validatedRequest["olanka_users_id"] = $user_id;
       
        Rooms::create($validatedRequest);
        
        return response()->json([
        "message"=>"Room Saved"
        ],200);
        }catch(\Exception $err){
        return response()->json([
        "message"=>$err->getMessage()
        ],500);
        }
        }





        public function fetchMyRooms(Request $request){
        try{
        $userID = $this->verifyToken($request);
        $roomData = Rooms::with(["hotels"])->select(["id","sharingRoomRateChildParent","bedBreakfast","roomType","halfBoard","fullBoard","allInclusive","singleRoomRateChild","hotels_models_id","doubleRoomRateChild","roomCount","maximumRoomOccupancy"])->where("olanka_users_id",$userID)->get();
        return response()->json([
        "message"=>"Rooms Fetched",
        "data"=>$roomData
        ]);
        }catch(\Exception $err){
         Log::error($err->getMessage());
         return response()->json([
          "message"=>"Something Went TWrong"
         ],500);
        }



        }
        


}
