<?php

namespace App\Http\Controllers;

use App\Models\BlogCategory;
use Dotenv\Exception\ValidationException;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Facades\JWTAuth;
use Log;
interface BlogCategoriesInterface{
public function validator(Request $request);

}

class BlogCategories extends Controller implements BlogCategoriesInterface{

    public function validator(Request $request)
    {
        try {
            $tokenHeader = $request->header("Authorization");
            $actualToken = substr($tokenHeader, 7);
            Log::info($actualToken);
            if (!$tokenHeader || !$actualToken) {
                throw new \Exception("Unauthorized", 401);
            }
            $payload = JWTAuth::setToken($actualToken)->getPayload();
            return $payload["sub"];
        } catch (\Exception $err) {
            throw new \Exception($err->getMessage(), 500);
        }
    }

public function addBlogCategory(Request $request){
try{
$validatedRequest = $request->validate([
"blogCategoryTitle"=>"required|unique:blog_categories,blogCategoryTitle",
"blogCategoryDescription"=>"required"
]);
$user_id=  $this->validator($request);
$validatedRequest['olanka_users_id'] = $user_id;
$validatedRequest["blogCategorySlug"] = Str::slug($validatedRequest["blogCategoryTitle"]);
BlogCategory::create($validatedRequest);
return response()->json([
"message"=>"Blog Category Added"
]);
}catch(\Exception $err){
Log::error($err->getMessage());
}catch(ValidationException $errValidation){
Log::error($errValidation->getMessage());
}
}


public function fetchBlogCategories(Request $request){
try{
$blogCategories = BlogCategory::all()->select(["id","blogCategoryTitle"]);
return response($blogCategories);
}catch(\Exception $err){
Log::error($err->getMessage());
}
}




}
