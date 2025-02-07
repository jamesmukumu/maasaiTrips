<?php

namespace App\Http\Controllers;

use App\Mail\SignMail;
use App\Models\OlankaUsers;
use Dotenv\Exception\ValidationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;



class OlankaUsersController extends Controller{
    public function handleRegister(Request $request){
      try {
          $validatedRequest = $request->validate([
              "userName" => "required",
              "password" => "required|min:5",
              "Email" => "required",
              "phoneNumber" => "required"
          ]);
  
          $olankaUser = new OlankaUsers();
          $olankaUser->userName = $validatedRequest["userName"];
          $olankaUser->password = Hash::make($validatedRequest["password"]);
          $olankaUser->Email = $validatedRequest["Email"];
          $olankaUser->phoneNumber = $validatedRequest["phoneNumber"];
          $olankaUser->superUser = false;
  
          if ($olankaUser->where("Email", $olankaUser["Email"])->exists()) {
              return response()->json([
                  "message" => "Duplicacy Detected"
              ]);
          } else {  
              $olankaUser->save();
              $token = JWTAuth::fromUser($olankaUser); 
              Mail::to($validatedRequest["Email"])->send(new SignMail($olankaUser,tokenString:$token));
              return response()->json([
                  "message" => "User Saved",
                  "token" => $token
              ], 200);
          }
      } catch (\Exception $e) {  
          die($e->getMessage());
      } catch (ValidationException $err) {
          return response()->json([
              "message" => "Validation Failed",
              "err" => $err->getMessage()
          ]);
      }
  }



public function handleLogin(Request $request){
try{
$validatedRequest = $request->validate([
"credential"=>"required",
"password"=>"required|min:6"
]);
$User = new OlankaUsers();
$User->userName = $validatedRequest["credential"];
$User -> Email = $validatedRequest["credential"];
if($User->where("userName",$User["userName"])->exists() || $User->where("Email",$User["Email"])->exists()){
$matchingUser =  $User->where("Email", $User["Email"])->first();

$matchingPassword = Hash::check($validatedRequest["password"],$matchingUser["password"]);
if(!$matchingPassword){
return response()->json([
"message"=> "Credentials mismatch"
]);
}else{
$token = JWTAuth::fromUser($matchingUser);
return response()->json([
"message"=>"Successful Login",
"token" => $token
]);
}
}else{
return response()->json([
"message"=>"User does not have an account"
]);
}
}catch(\Exception $err){

}}



public function verifyEmail(Request $request){
try{
$tokenHeader = $request->header("Authorization");
if($tokenHeader == ''){
return 'missing header';
}
$actualToken  = substr($tokenHeader,7);
$payload = JWTAuth::setToken($actualToken)->getPayload();
$tokenClaims = $payload->toArray();
$userID = $tokenClaims['sub'];
$olankaUser = new OlankaUsers();
$olankanewUser = $olankaUser->find($userID);
$olankanewUser -> emailVerified = true;
$olankanewUser ->save();
return "Updated successfully";

}catch(Exception $err){
return response()->json([
"message"=>"Something when wrong"
]);
}catch(JWTException $errJwt){
return response()->json([
"message"=>"Invalid token"
]);
}
}

}