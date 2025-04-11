<?php

namespace App\Http\Controllers;

use App\Models\Destinations;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Facades\JWTAuth;
use Cloudinary\Cloudinary;
use Log;
use Dotenv\Exception\ValidationException;


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
        "destinationDescription"=>"required",
        
        ]);
         $destinationImages= [];
        $cld = new Cloudinary();
        foreach($request->all() as $key => $value){
        if($request->hasFile($key) && preg_match("/^image([A-Za-z]*)([1-9])$/", $key)){
        $imageUrl = $cld->uploadApi()->upload($request->file($key)->getRealPath());
        $destinationImages[] = $imageUrl["url"];
        }
        }
        $validatedRequest["destinationPhotos"] = json_encode($destinationImages);
        $validatedRequest["olanka_users_id"] = $user_id;
        $thumbnail= $cld->uploadApi()->upload($request->file("thumbnail")->getRealPath());
        $validatedRequest["destinationThumbnail"]  = $thumbnail["url"];
        $slug = Str::slug($validatedRequest['destinationTitle'].uniqid(),"_");
        $validatedRequest["destinationSlug"] = $slug; 
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





        public function updateDestination(Request $request){
            try {
                $user_id = $this->verifyToken($request);
                $validatedRequest = $request->validate([
                    "id" => "required|exists:destinations,id",
                    "destinationTitle" => "nullable|unique:destinations,destinationTitle",
                    "destinationAbout" => "nullable",
                    "destinationDescription" => "nullable",
                ]);
        
                $id = $request->query("id");
                $destinationImages = [];
                $cld = new Cloudinary();
        
                foreach ($request->all() as $key => $value) {
                    if ($request->hasFile($key) && preg_match("/^image([A-Za-z]*)([1-9])$/", $key)) {
                        $imageUrl = $cld->uploadApi()->upload($request->file($key)->getRealPath());
                        $destinationImages[] = $imageUrl["url"];
                    }
                }
        
                if (count($destinationImages) > 0) {
                    $validatedRequest["destinationPhotos"] = json_encode($destinationImages);
                }
        
                $validatedRequest["olanka_users_id"] = $user_id;
                $validatedRequest["actionPending"] = 'pending';
        
                if ($request->hasFile("thumbnail")) {
                    $thumbnail = $cld->uploadApi()->upload($request->file("thumbnail")->getRealPath());
                    $validatedRequest["destinationThumbnail"] = $thumbnail["url"];
                }
        
                if (!empty($validatedRequest["destinationTitle"])) {
                    $slug = Str::slug($validatedRequest['destinationTitle'] . uniqid(), "_");
                    $validatedRequest["destinationSlug"] = $slug;
                }
        
                
                $destination = Destinations::find($id);
        
                
                $destination->update($validatedRequest);
        
                return response()->json([
                    "message" => "Destination Updated"
                ], 200);
            } catch (\Exception $err) {
                return response()->json([
                    "message" => $err->getMessage()
                ], 500);
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



public function findAllDestinations(){
try{
$destinations = Destinations::where("published",true)->select(["id","destinationTitle","destinationThumbnail","destinationPhotos","destinationAbout","destinationDescription","destinationSlug"])->paginate(50);
return response()->json([
"destinations"=>$destinations->items(),
"nextUrl"=>$destinations->nextPageUrl(),
"previousPage"=>$destinations->previousPageUrl()
]);
}catch(\Exception $err){
Log::error($err->getMessage());
}
}

public function findSingularDestination(Request $request){
try{
$validatedRequest = $request->validate([
"slug"=>"required|exists:destinations,destinationSlug"
]);
$slug = $request->query("slug");
$destinationData =  Destinations::with(["packages"])->select(["id","destinationSlug","destinationTitle","destinationThumbnail","destinationPhotos","destinationAbout","destinationDescription"])->with(["fetchHotels"])->where("destinationSlug",$slug)->get()->first();
return response()->json([
"message"=>"Destination Fetched",
"data"=>$destinationData
]);
}catch(\Exception $err){
Log::error($err->getMessage());
return response()->json([
"message"=>"Something went wrong"
]);
}}



public function myDestinations(Request $request){
try{
$olanka_id = $this->verifyToken($request);
$destinations = Destinations::where("olanka_users_id",$olanka_id)->get();
return response()->json([
"message"=>"My destinations fetched",
"data"=>$destinations
]);
}catch(\Exception $err){
Log::error($err->getMessage());
return response()->json([
"message"=>"Something went wrong"
],500);
}
}

public function DeleteDestination(Request $request){
try{
$validatedRequest = $request->validate([
"id"=>"required|integer|exists:destinations,id"
]);
$id = $request->query("id");
Destinations::where("id",$id)->delete();
return response()->json([
"message"=>"Deleted"
]);
}catch(\Exception $err){
Log::error($err->getMessage());
return response()->json([
"message"=>"Something Went wrong"
],500);
}
}



public function PublishDestination(Request $request){
try{
$validatedRequest = $request->validate([
"id"=>"required|integer|exists:destinations,id"
]);
$id = $request->query("id");
Destinations::where("id",$id)->update([
"published"=>true
]);
return response()->json([
"message"=>"Updated"
]);
}catch(\Exception $err){
Log::error($err->getMessage());
return response()->json([
"message"=>"Something Went wrong"
],500);
}
}


public function UnpublishDestination(Request $request){
    try{
    $validatedRequest = $request->validate([
    "id"=>"required|integer|exists:destinations,id"
    ]);
    $id = $request->query("id");
    Destinations::where("id",$id)->update([
    "published"=>false
    ]);
    return response()->json([
    "message"=>"Updated"
    ]);
    }catch(\Exception $err){
    Log::error($err->getMessage());
    return response()->json([
    "message"=>"Something Went wrong"
    ],500);
    }
    }



public function updateActionPending(Request $request){
try{
$validatedRequest = $request->validate([
"actionPending"=>"required",
"id"=>"required|exists:destinations,id"
]);
$matchingDestination = Destinations::find($request->query('id'));

$matchingDestination["actionPending"] = $validatedRequest["actionPending"];
$matchingDestination->save();
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



public function save_Destinations_CSV(Request $request){
    try {
        $validation = $request->validate([
            "destinations_csv" => "required"
        ]);

        $csvFile = $request->file("destinations_csv");
        $contentsFile = fopen($csvFile->getRealPath(), "r");

        $datacont = [];
        $headers = fgetcsv($contentsFile, 1000, ","); 

        while (($data = fgetcsv($contentsFile, 1000, ",")) !== false) {
            $datacont[] = array_combine($headers, $data); 
        }

        fclose($contentsFile);
     
        Destinations::insert($datacont);
    

        return response()->json([
            "message" => "Destinations Saved",
        
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
