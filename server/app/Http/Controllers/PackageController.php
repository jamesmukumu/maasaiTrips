<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Cloudinary\Cloudinary;
use Dotenv\Exception\ValidationException;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Facades\JWTAuth;
use Log;
use App\Models\Package;
use App\Models\PackageCategories;

interface PackageInterface
{
    public function verifyingToken(Request $request);
}

class PackageController extends Controller implements PackageInterface
{
    public function verifyingToken(Request $request)
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

    public function addPackageCategory(Request $request)
    {
        try {
            $validatedRequest = $request->validate([
                "title" => "required|unique:package_categories,title"
            ]);
            $user_id = $this->verifyingToken($request);
            $validatedRequest['olanka_users_id'] = $user_id;
            $validatedRequest['slug'] = Str::slug($validatedRequest['title']);
            PackageCategories::create($validatedRequest);
            return response()->json([
                "message" => "Package category saved"
            ]);
        } catch (\Exception $err) {
            Log::error($err->getMessage());
            return response()->json([
                "message" => "Something went wrong"
            ], 500);
        }
    }



    public function updatePackageCategory(Request $request)
    {
        try {
            $validatedRequest = $request->validate([
                "title" => "nullable|unique:package_categories,title",
                "id"=>"required|exists:package_categories,id"
            ]);
            $id = $request->query("id");
            $user_id = $this->verifyingToken($request);
            $validatedRequest['olanka_users_id'] = $user_id;
            $validatedRequest['slug'] = Str::slug($validatedRequest['title']);
            PackageCategories::where("id",$id)->update($validatedRequest);
            return response()->json([
                "message" => "Package category saved"
            ]);
        } catch (\Exception $err) {
            Log::error($err->getMessage());
            return response()->json([
                "message" => "Something went wrong"
            ], 500);
        }
    }


    public function fetchMyPackageCategories(Request $request){
    try{
    $user_id = $this->verifyingToken($request);
    $packageCategories = PackageCategories::where("olanka_users_id",$user_id)->get(); 
    if(count($packageCategories) == 0){
     return response()->json([
      "message"=>"Package Categories is empty"
     ]);
    }else{
    return response()->json([
    "message"=>"Package Categories Found",
    "data"=>$packageCategories
    ]);
    }
    }catch(\Exception $err){
   Log::error($err->getMessage());
    return response()->json([
    "message"=>"Something Went Wrong"
    ]);
    }
}


public function deletePackageCategory(Request $request){
try{
$validatedRequest = $request->validate([
"id"=>"required|exists:package_categories,id"
]);
$id = $request->query("id");
PackageCategories::where("id",$id)->delete();
return response()->json([
"message"=>"Package Category Deleted",

]);
}catch(\Exception $err){
Log::error($err->getMessage());
}


}

    public function fetchPackageCategories(Request $request)
    {
        try {
            $packageData = PackageCategories::all()->select(["id", "title"]);
            return response()->json([
                "data" => $packageData
            ]);
        } catch (\Exception $err) {
            Log::error($err->getMessage());
        }


    }

    public function addPackage(Request $request)
    {
        try {
            ini_set("max_execution_time", 3600);
            $validatedRequest = $request->validate([
                "packageTitle" => "required|unique:packages,packageTitle",
                "imagePackage" => "required|file",
                "packageOverview" => "required",
                "packageAbout" => "required",
                "startDate" => "required",
                "endDate" => "required",
                "packageCharge" => "required|integer",
                "packageChargeCurrency" => "required|string",
                "packageInclusives" => "required",
                "budgetType" => "required",
                "packageExclusives" => "required",
                "mode_transport" => "required",
                "packageSpecialNotes" => "nullable",
                "destinations_id" => "required|integer|exists:destinations,id",
                "package_categories_id" => "required|integer|exists:package_categories,id"

            ]);
            $cld = new Cloudinary();
            $validatedRequest["olanka_users_id"] = $this->verifyingToken($request);
            $imagePath = $cld->uploadApi()->upload($request->file("imagePackage")->getRealPath());
            $validatedRequest['packageImage'] = $imagePath['url'];
            $validatedRequest["packageSlug"] = Str::slug($validatedRequest['packageTitle'], "_");
            $packageImages = [];

            foreach ($request->all() as $key => $value) {
                if ($request->hasFile($key) && preg_match("/^image([A-Za-z]*)([1-9]|[1-9][0-9]|[1-4][0-9]{2}|500)$/", $key)) {
                    $imageUrl = $cld->uploadApi()->upload($request->file($key)->getRealPath());
                    $packageImages[] = $imageUrl["url"];
                }
            }

            $validatedRequest['packageImages'] = json_encode($packageImages);
            Package::create($validatedRequest);
            return response()->json([
                "message" => "package Saved"
            ]);
        } catch (ValidationException $errValidation) {
            Log::error($err->getMessage());
            return response()->json([
                "message" => "Something Went Wrong",
                "content" => $err->getMessage()
            ], 422);
        } catch (\Exception $err) {
            Log::error($err->getMessage());
            return response()->json([
                "message" => "Something Went Wrong",
                "content" => $err->getMessage()
            ], 422);
        }
    }





    public function updatePackage(Request $request)
    {
        try {
            ini_set("max_execution_time", 3600);
            $validatedRequest = $request->validate([
                "packageTitle" => "nullable",
        
                "packageOverview" => "nullable",
                "packageAbout" => "nullable",
                "startDate" => "nullable",
                "id" => "required|exists:packages,id",
                "endDate" => "nullable",
                "packageCharge" => "nullable",
                "packageChargeCurrency" => "nullable",
                "packageInclusives" => "nullable",
                "budgetType" => "nullable",
                "packageExclusives" => "nullable",
                "mode_transport" => "nullable",
                "packageSpecialNotes" => "nullable",
                "destinations_id" => "nullable",
                "package_categories_id" => "nullable"

            ]);
            $cld = new Cloudinary();
            $validatedRequest["actionPending"] = 'pending';
            $validatedRequest["olanka_users_id"] = $this->verifyingToken($request);
            if ($request->hasFile("imagePackage")) {
                $imagePath = $cld->uploadApi()->upload($request->file("imagePackage")->getRealPath());
                $validatedRequest['packageImage'] = $imagePath['url'];
                unset($validatedRequest['imagePackage']);

            }
            if (!empty($validatedRequest['packageTitle'] ?? null)) {
                $validatedRequest["packageSlug"] = Str::slug($validatedRequest['packageTitle'], "_");
            }
            
            $packageImages = [];
             foreach ($request->all() as $key => $value) {
                if ($request->hasFile($key) && preg_match("/^image([A-Za-z]*)([1-9]|[1-9][0-9]|[1-4][0-9]{2}|500)$/", $key)) {
                    $imageUrl = $cld->uploadApi()->upload($request->file($key)->getRealPath());
                    $packageImages[] = $imageUrl["url"];
                }
            }
            $id = $request->query("id");
          if(count($packageImages) > 0){
            $validatedRequest['packageImages'] = json_encode($packageImages);
            
          }
        
         Package::where("id", $id)->update($validatedRequest);
            
            
            return response()->json([
                "message" => "package Updated"
            ]);
        } catch (ValidationException $errValidation) {
            Log::error($err->getMessage());
            return response()->json([
                "message" => "Something Went Wrong",
                "content" => $err->getMessage()
            ], 422);
        } catch (\Exception $err) {
            Log::error($err->getMessage());
            return response()->json([
                "message" => "Something Went Wrong",
                "content" => $err->getMessage()
            ], 422);
        }
    }






    public function PublishPackage(Request $request)
    {
        try {
            $validatedRequest = $request->validate([
                "id" => "required|integer|exists:packages,id"
            ]);
            $id = $request->query("id");
            Package::where("id", $id)->update([
                "published" => true
            ]);
            return response()->json([
                "message" => "Updated"
            ]);
        } catch (\Exception $err) {
            Log::error($err->getMessage());
            return response()->json([
                "message" => "Something Went wrong"
            ], 500);
        }
    }


    public function UnpublishPackage(Request $request)
    {
        try {
            $validatedRequest = $request->validate([
                "id" => "required|integer|exists:packages,id"
            ]);
            $id = $request->query("id");
            Package::where("id", $id)->update([
                "published" => false
            ]);
            return response()->json([
                "message" => "Updated"
            ]);
        } catch (\Exception $err) {
            Log::error($err->getMessage());
            return response()->json([
                "message" => "Something Went wrong"
            ], 500);
        }
    }


    public function fetchMyPackages(Request $request)
    {
        try {
            $olanka_users_id = $this->verifyingToken($request);
            $packageData = Package::select(["actionPending","packageCharge", "packageChargeCurrency", "packageInclusives", "packageExclusives", "endDate", "startDate", "packageTitle", "packageAbout", "packageOverview", "published", "id", "packageSlug","packageSpecialNotes"])->where("olanka_users_id", $olanka_users_id)->paginate(100);
            return response()->json([
                "message" => "Packages Found",
                "data" => $packageData->items(),
                "previousUrl" => $packageData->previousPageUrl(),
                "nextPageUrl" => $packageData->nextPageUrl()
            ]);
        } catch (\Exception $err) {
            Log::error($err->getMessage());
            return response()->json([
                "message" => "Something Went Wrong"
            ], 500);
        }
    }


    public function deletePackage(Request $request)
    {
        try {
            $validatedRequest = $request->validate([
                "id" => "required|integer|exists:packages,id"
            ]);
            $package_id = $request->query('id');
            Package::where("id", $package_id)->delete();
            return response()->json([
                "message" => "Deleted"
            ]);
        } catch (\Exception $err) {
            Log::error($err->getMessage());
            return response()->json([
                "message" => "Something went wrong"
            ]);
        }
    }






    public function fetchDisplayPackages(Request $request)
    {
        try {
        $airPackages = Package::select(["mode_transport", 'budgetType', "packageCharge", "packageImage", "packageChargeCurrency", "packageTitle", "id", "packageSlug", "packageOverview"])->where("mode_transport","Air")->where("published",true)->get()->shuffle()->take(4);
        $vanPackages = Package::select(["mode_transport", 'budgetType', "packageCharge", "packageImage", "packageChargeCurrency", "packageTitle", "id", "packageSlug", "packageOverview"])->where("mode_transport","Van")->where("published",true)->get()->shuffle()->take(4);
        $landCruiserPackages = Package::select(["mode_transport", 'budgetType', "packageCharge", "packageImage", "packageChargeCurrency", "packageTitle", "id", "packageSlug", "packageOverview"])->where("mode_transport","LandCruiser")->where("published",true)->get()->shuffle()->take(4);
        $jeepPackages = Package::select(["mode_transport", 'budgetType', "packageCharge", "packageImage", "packageChargeCurrency", "packageTitle", "id", "packageSlug", "packageOverview"])->where("mode_transport","Jeep")->where("published",true)->get()->shuffle()->take(4);
          
        return response()->json([
                "message" => "Packages Fetched",
             "vanPackages"=>$vanPackages,
              "landCruiserPackages"=>$landCruiserPackages,
                "airPackages"=>$airPackages,
                "jeepPackages"=>$jeepPackages
            ]);
        } catch (\Exception $err) {
            Log::error($err->getMessage());
            return response()->json([
                "message" => "Something Went wrong"
            ]);
        }
    }


    public function findSingularPackage(Request $request)
    {
        try {
            $validatedRequest = $request->validate([
                "packageSlug" => "required|exists:packages,packageSlug"
            ]);
            $slug = $request->query("packageSlug");
            $matchingPackage = Package::where("packageSlug", $slug)->get()->first();
            $relatedPackages = Package::where("package_categories_id", $matchingPackage['package_categories_id'])->where("id", "!=", $matchingPackage['id'])->limit(6)->get();

            return response()->json([
                "data" => $matchingPackage,
                "relatedPackages" => $relatedPackages
            ]);
        } catch (\Exception $err) {
            Log::error($err->getMessage());
            return response()->json([
                "message" => "Something Went wrong"
            ]);
        }
    }






    public function updateActionPending(Request $request){
        try{
        $validatedRequest = $request->validate([
        "actionPending"=>"required",
        "id"=>"required|exists:packages,id"
        ]);
        $matchingPackage = Package::find($request->query('id'));
        
        $matchingPackage["actionPending"] = $validatedRequest["actionPending"];
        $matchingPackage->save();
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




        public function PackagesFromCsv(Request $request){
            try {
                $validation = $request->validate([
                    "package_csv" => "required"
                ]);
        
                $csvFile = $request->file("package_csv");
                $contentsFile = fopen($csvFile->getRealPath(), "r");
        
                $datacont = [];
                $headers = fgetcsv($contentsFile, 1000, ","); 
        
                while (($data = fgetcsv($contentsFile, 1000, ",")) !== false) {
                    $datacont[] = array_combine($headers, $data); 
                }
        
                fclose($contentsFile);
             
                Package::insert($datacont);
            
        
                return response()->json([
                    "message" => "Package Data Saved",
                
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
