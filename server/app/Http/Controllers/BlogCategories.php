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

public function validator(Request $request){
try{
$header = $request->header("Authorization");
$token = substr($header,7);
if(!$header || !$token){
throw new \Exception("Unauthorized",401);
}
$payload = JWTAuth::setToken($request)->getPayload();
return $payload["sub"];
}catch(\Exception $err){
Log::error($err->getMessage());
}

}


public function addBlogCategory(Request $request){
try{
$validatedRequest = $request->validate([
"blogCategoryTitle"=>"required|unique:blog_categories,blogCategoryTitle",
"blogCategoryDescription"=>"required|min:50"
]);
$validatedRequest['olanka_users_id'] = $this->validator($request);
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





}
