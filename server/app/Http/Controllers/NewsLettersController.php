<?php

namespace App\Http\Controllers;

use Cloudinary\Cloudinary;
use Illuminate\Http\Request;
use App\Mail\NewsLettersMailer;
use Mail;
use Log;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Models\Newsletters;
 
interface Newsletter{
public function verifyTok(Request $request);
}

class NewsLettersController extends Controller implements Newsletter{
    public function verifyTok(Request $request){
    try {
        $tokenHeader = $request->header("Authorization");
        if (!$tokenHeader || strlen($tokenHeader) < 8) {
            throw new \Exception("Missing or invalid Token header");
        }

        $token = substr($tokenHeader, 7);
        $payload = JWTAuth::setToken($token)->getPayload();
        return $payload['sub']; 
        
    } catch (\Exception $err) {
        Log::error($err->getMessage());
        throw new \Exception($err->getMessage()); 
    }
}



public function sendNewsLetter(Request $request){
try{
$validatedRequest = $request->validate([
"content"=>"required"
]);

$mailer = app(NewsLettersMailer::class,["content"=>$validatedRequest["content"]]);
Mail::to("jamesmukumu03@gmail.com")->send($mailer);
echo "Sent";
}catch(\Exception $err){
echo $err->getMessage();
}
}


public function sendNewsLetters(Request $request){
try{
    $validatedRequest = $request->validate([
    "newsLetterTemplate"=>"required|integer",
    "destinations"=>"required|min:1"
    ]);
    $newsLetterTemp = Newsletters::select("content","Title")->find($validatedRequest['newsLetterTemplate']);
    $contentNewsletter = $newsLetterTemp["content"];
     $mailerCont = new NewsLettersMailer($contentNewsletter);
    $mailsTarget = explode(",",$validatedRequest["destinations"]);
    foreach($mailsTarget as $dest){
   
    Mail::to($dest)->send($mailerCont);
    }
    return response()->json([
    "message"=>"Emails propagated"
    ]);
  
    }catch(\Illuminate\Validation\ValidationException $errValidate){
    Log::error($errValidate->getMessage());
    return response()->json([
    "message"=> $errValidate->getMessage()
    ]);
    }catch(\Exception $err){
    echo $err->getMessage();
    }
    }
    

public function saveNewsLetter(Request $request){
try{
$validatedRequest = $request->validate([
"Title"=>"required|min:6|unique:news_letters,Title",
"content"=>"required"
]);
$validatedRequest["olanka_users_id"] = $this->verifyTok($request);
NewsLetters::create($validatedRequest); 
return response()->json([
"message"=>"News Letter saved successfully"
],200);
}catch(\Exception $err){
Log::error($err->getMessage());
return response()->json([
"message"=>$err->getMessage()
]);
}
}



public function openLive(Request $request){
try{
$this->verifyTok($request);
$validatedRequest = $request->validate([
"content"=>"required"
]);
return view("newsletter",["content"=>$validatedRequest['content']]);
}catch(\Exception $err){
echo $err->getMessage();
}
}



public function uploadtoCloudinary(Request $request){
try{
$this->verifyTok($request);
$cld = new Cloudinary();
$result = $cld->uploadApi()->upload($request->file("imageCld")->getRealPath());
return response()->json([
"message"=>"Success",
"url"=>$result['url']
]);
}catch(\Exception $err){
return response()->json([
"message"=>$err->getMessage()
],400);
}

}
}