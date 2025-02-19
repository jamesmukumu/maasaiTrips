<?php

namespace App\Http\Controllers;

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
$validatedRequest = $request->validate([
"content"=>"required"
]);
return view("newsletter",["content"=>$validatedRequest['content']]);
}catch(\Exception $err){
echo $err->getMessage();
}


}



}
