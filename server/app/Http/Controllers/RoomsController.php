<?php

namespace App\Http\Controllers;

use App\Models\Rooms;
use Illuminate\Http\Request;
use Cloudinary\Cloudinary;
use Tymon\JWTAuth\Facades\JWTAuth;
use Log;
use Dotenv\Exception\ValidationException;

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




        public function updateRoom(Request $request){
            try{
            $user_id = $this->verifyToken($request);
            $validatedRequest = $request->validate([
            "roomType"=>"nullable",
            "bedBreakfast"=>"nullable",
            "halfBoard"=>"nullable",
            "fullBoard"=>"nullable",
            "allInclusive"=>"nullable",
            "singleRoomRateChild"=>"nullable|numeric",
            "doubleRoomRateChild"=>"nullable|numeric",
            "sharingRoomRateChildParent"=>"nullable|numeric",
            "roomCount"=>"nullable|integer",
            "maximumRoomOccupancy"=>"nullable|integer",
            "roomDescription"=>"nullable",
            "hotels_models_id"=>"nullable|exists:hotels_models,id",
            "id"=>"required|integer|exists:rooms,id"
            ]);
            $id = $request->query("id");
            $validatedRequest["actionPending"] = 'pending';
            $roomsImages= [];
            $cld = new Cloudinary();
            foreach($request->all() as $key => $value){
            if($request->hasFile($key) && preg_match("/^room([A-Za-z]*)([1-9])$/", $key)){
            $imageUrl = $cld->uploadApi()->upload($request->file($key)->getRealPath());
            $roomsImages[] = $imageUrl["url"];
            }
            }
            if(count($roomsImages) > 0){
            $validatedRequest["roomImages"] = json_encode($roomsImages);
            }
            $validatedRequest["olanka_users_id"] = $user_id;
           
            Rooms::where("id",$id)->update($validatedRequest);
            
            return response()->json([
            "message"=>"Room Updated Successfully"
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
        $roomData = Rooms::with(["hotels"])->select(["id","actionPending","sharingRoomRateChildParent","bedBreakfast","roomType","halfBoard","fullBoard","allInclusive","singleRoomRateChild","hotels_models_id","doubleRoomRateChild","roomCount","maximumRoomOccupancy",'roomDescription'])->where("olanka_users_id",$userID)->get();
        return response()->json([
        "message"=>"Rooms Fetched",
        "data"=>$roomData
        ]);
        }catch(\Exception $err){
         Log::error($err->getMessage());
         return response()->json([
          "message"=>"Something Went Wrong"
         ],500);
        }
}







public function updateActionPending(Request $request){
    try{
    $validatedRequest = $request->validate([
    "actionPending"=>"required",
    "id"=>"required|exists:rooms,id"
    ]);
    $matchingRoom = Rooms::find($request->query('id'));
    
    $matchingRoom["actionPending"] = $validatedRequest["actionPending"];
    $matchingRoom->save();
    return response()->json([
    "message"=>"action updated",
    
    ]);
    }catch(\Exception $err){
    Log::error($err->getMessage());
    return response()->json([
    "message"=>$err->getMessage()
    ]);
    }
    }





    public function saveRoomsCSV(Request $request){
        try {
            $validation = $request->validate([
                "rooms_csv" => "required"
            ]);
    
            $csvFile = $request->file("rooms_csv");
            $contentsFile = fopen($csvFile->getRealPath(), "r");
    
            $datacont = [];
            $headers = fgetcsv($contentsFile, 1000, ","); 
    
            while (($data = fgetcsv($contentsFile, 1000, ",")) !== false) {
                $datacont[] = array_combine($headers, $data); 
            }
    
            fclose($contentsFile);
         
            Rooms::insert($datacont);
        
    
            return response()->json([
                "message" => "Rooms Newsletters Saved",
            
            ]);
    
        } catch (\Exception $err) {
            return response()->json([
                "message" => "Something went wrong"
            ], 500);
        }catch(ValidationException $errValidate){
    return response()->json([
    "message"=>$errValidate->getMessage()
    ],500);
    }
    }
    


    
    
}
