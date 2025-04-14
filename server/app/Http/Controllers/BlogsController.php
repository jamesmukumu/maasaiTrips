<?php

namespace App\Http\Controllers;

use App\Models\Blogs;
use Cloudinary\Cloudinary;
use Illuminate\Http\Request;
use Dotenv\Exception\ValidationException;
use Illuminate\Support\Str;
use Log;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\JWT;
use function Laravel\Prompts\error;
use App\Models\BlogCategory;

interface BlogsInterface{
public function validator(Request $request);
}

class BlogsController extends Controller implements BlogsInterface{
public function validator(Request $request){
try{
$header = $request->header("Authorization");
$token = substr($header,7);
if(!$token || !$header){
throw new \Exception("Unauthorized",401);
}    
 $payload = JWTAuth::setToken($token)->getPayload();
return $payload["sub"];

}catch(\Exception $err){
Log::error($err->getMessage());
throw new \Exception($err->getMessage());
}catch(ValidationException $errValidaation){
Log::error($errValidaation->getMessage());
throw new \Exception($errValidaation->getMessage());
}

}




public function addBlog(Request $request){
try{
$validatedRequest =  $request->validate([
"blogTitle"=>"required|unique:blogs,blogTitle",
"blogContent"=>"required|min:20",
"thumbnail"=>"file|required",
"blog_categories_id"=>"required|exists:blog_categories,id"
]);
if(!$request->hasFile("thumbnail")){
return response()->json([
"message"=>"Blog Thumbnail ought be added"
]);
}else{
$cld = new Cloudinary();
$uploadResultBlog = $cld->uploadApi()->upload(
    $request->file("thumbnail")->getRealPath(), [
        "folder" => "blogs",
        "width"=>800,
        "height"=>500
    ]
);
$validatedRequest['blogThumbnail'] = $uploadResultBlog["url"];
}
$user_id = $this->validator($request);
$validatedRequest["olanka_users_id"] =  $user_id;
$validatedRequest["blogSlug"] =  Str::slug($validatedRequest['blogTitle']);
Blogs::create($validatedRequest);
return response()->json([
"message"=>"Blog has been Added Successfully"
]);
}catch(\Exception $err){
Log::error($err->getMessage());
return response()->json([
"message"=>"Something Went Wrong"
]);
}catch(ValidationException $errValidation){}
Log::error($errValidation->getMessage());
return response()->json([
"message"=>$errValidation->getMessage()
]);
}    
public function updateBlog(Request $request){
    try{
    $validatedRequest =  $request->validate([
    "blogTitle"=>"nullable",
    "blogContent"=>"nullable",
    "thumbnail"=>"nullable|file",
    "id"=>"required|exists:blogs,id"
    ]);
    if($request->hasFile("thumbnail")){
        $cld = new Cloudinary();
        $uploadResultBlog = $cld->uploadApi()->upload(
            $request->file("thumbnail")->getRealPath(), [
                "folder" => "blogs",
                "width"=>800,
                "height"=>500
            ]
        );
        $validatedRequest['blogThumbnail'] = $uploadResultBlog["url"];
    }
    $user_id = $this->validator($request);
    $validatedRequest["olanka_users_id"] =  $user_id;
if($validatedRequest["blogTitle"]){
 $validatedRequest["blogSlug"] =  Str::slug($validatedRequest['blogTitle']);
}
    Blogs::where("id",$validatedRequest['id'])->update($validatedRequest);
    return response()->json([
    "message"=>"Blog has been Updated Successfully"
    ]);
    }catch(\Exception $err){
    Log::error($err->getMessage());
    return response()->json([
    "message"=>"Something Went Wrong"
    ]);
    }catch(ValidationException $errValidation){}
    Log::error($errValidation->getMessage());
    return response()->json([
    "message"=>$errValidation->getMessage()
    ]);
    }    
    


public function deleteBlog(Request $request){
try{
$validatedRequest = $request->validate([
"id"=>"exists:blogs,id"
]);
Blogs::where("id",$validatedRequest["id"])->delete();
return response()->json([
"message"=>"Blog Deleted Successfully"
,200]);
}catch(\Exception $err){
Log::error($err->getMessage());
return response()->json([
"message"=>"Something Went Wrong",
"content"=>$err->getMessage()
]);
}
}

public function fetchMyBlogs(Request $request){
try{
$user_id = $this->validator($request);    
$blogs = Blogs::where("olanka_users_id",$user_id)->with(["blogCategory"])->get();
return response()->json([
"message"=>"Blogs Fetched",
"data"=>$blogs
]);
}catch(\Exception $err){
Log:error($err->getMessage());
return response()->json([
"message"=>"Something Went Wrong".$err->getMessage()
]);
}
}


public function fetchSingularBlog(Request $request){
try{
$validatedRequest = $request->validate([
"blogSlug"=>"required|exists:blogs,blogSlug"
]);
$relevantBlog = Blogs::where("blogSlug",$validatedRequest['blogSlug'])->get()[0];
$relevantblogs = Blogs::where("blogSlug","!=",$validatedRequest['blogSlug'])->limit(6)->get()->shuffle();
return response()->json([
"message"=>"Blog Fetched",
"blogData"=>$relevantBlog,
"relevantBlogs"=>$relevantblogs
]);
}catch(\Exception $err){
Log::error($err->getMessage());
return response()->json([
]);
}}

public function fetchBlogsDisplay(Request $request){
try{
$blogs = Blogs::select(["created_at",'blogTitle','blogSlug','blogThumbnail','blogContent','id','olanka_users_id'])->with(["creatorBlog"])->where("published",true)->paginate();
return response()->json([
"message"=>"Blogs Fetched",
"blogs"=>$blogs->items(),
"nextUrl"=>$blogs->nextPageUrl(),
"previousUrl"=>$blogs->previousPageUrl()
]);
}catch(\Exception $err){
Log::error($err->getMessage());
return response()->json([
"message"=>"Something Went Wrong".$err->getMessage()
]);
}}



public function publishBlog(Request $request){
try{
$validatedRequest = $request->validate([
"id"=>"required|integer|exists:blogs,id"
]);
$id = $request->query('id');
$blog = Blogs::find($id);
$blog["published"] = true;
$blog->save();
return response()->json([
"message"=>"Blog has been published"
]);
}catch(\Exception $err){
Log::error($err->getMessage());
}}



public function unpublishBlog(Request $request){
    try{
    $validatedRequest = $request->validate([
    "id"=>"required|integer|exists:blogs,id"
    ]);
    $id = $request->query('id');
    $blog = Blogs::find($id);
    $blog["published"] = false;
    $blog->save();
    return response()->json([
    "message"=>"Blog has been un-published"
    ]);
    }catch(\Exception $err){
    Log::error($err->getMessage());
    }}






    public function adjustBlogStatus(Request $request){
    try{
   $validatedRequest =  $request->validate([
    "id"=>"required|exists:blogs,id",
    "status"=>"required"
]);
$id = $request->query("id");
$allowedStatuses = array("pending","allowed","rejected");
if(!in_array($validatedRequest['status'],$allowedStatuses,true)){
return response()->json([
"message"=>"Status Rejected"
]);
}
$blog = Blogs::find($id);
$blog['blogStatus'] = $validatedRequest['status'];
$blog->save();
return response()->json([
'message'=>'Blog Status Adjusted'
]);
}catch(\Exception $err){
Log::error($err->getMessage());
return response()->json([
'message'=>"Something Went Wrong"
],500);
}
}



}
