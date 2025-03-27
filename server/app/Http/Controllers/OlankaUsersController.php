<?php

namespace App\Http\Controllers;

use App\Mail\ResetPassword;
use App\Mail\SignMail;
use App\Models\OlankaUsers;
use Dotenv\Exception\ValidationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Log;


interface VerifyUser{
public function verifyUser(Request $request);

}



class OlankaUsersController extends Controller implements VerifyUser{

public function verifyUser(Request $request){
try{
    $authHeader = $request->header("Authorization");
    $token = substr($authHeader,7);
    if(!$token || !$authHeader){
    throw new \Exception("Unauthorized",400);
    }
    $payload = JWTAuth::setToken($token)->getPayload();
    return $payload["sub"];
}catch(\Exception $err){
Log::error($err->getMessage());
throw new \Exception($err->getMessage(),500);
}


}

    public function handleRegister(Request $request){
      try {
          $validatedRequest = $request->validate([
              "userName" => "required",
              "password" => "required|min:5",
              "Email" => "required",
              "phoneNumber" => "required",
              "adminRoles"=>"required"
          ]);
  
          $olankaUser = new OlankaUsers();
          $olankaUser->userName = $validatedRequest["userName"];
          $olankaUser->adminRoles = $validatedRequest['adminRoles'];
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
                  "Content" => "Verification link sent to ".$validatedRequest["Email"]
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
$status = $matchingUser["superUser"];
return response()->json([
"message"=>"Successful Login",
"super"=>$status

])->header("Authorization",$token)->header("Access-Control-Expose-Headers","Authorization");
}
}else{
return response()->json([
"message"=>"User does not have an account"
]);
}
}catch(\Exception $err){

}}



public function RequestResetLink(Request $request){
try{
    $validatedRequest = $request -> validate([
        "Email" =>"required"
        ]);
        $user = new OlankaUsers();
        if(!$user->where("Email",$validatedRequest["Email"])->exists()){
        return response()->json([
        "message"=>"Email Non existent"
        ]);
        }else{
        $userDB = $user->where("Email",$validatedRequest["Email"])->first();
        JWTAuth::factory()->setTTl(5);
        $token = JWTAuth::fromUser($userDB);

        Mail::to($validatedRequest["Email"])->send(new ResetPassword($userDB,$token));
        return response()->json([
        "message"=>"Reset link sent",
      
        ]);
        }

}catch(\Exception $err){
die($err->getMessage());
}catch(ValidationException $err1){
return response()->json([
"message"=>"Validation Error"
]);   
}


}  



public function actualizeVerify(Request $request){
try{
$validatedRequest = $request ->validate([
"password"=>"required|min:6",
"confirmPassword"=>"required|min:6"
]);
if($validatedRequest["password"] != $validatedRequest["confirmPassword"]){
return response()->json([
"message"=>"Provide matching passwords"
]);
}
$tokenHeader = $request->header("Authorization");
$token = substr($tokenHeader,7);
$payload = JWTAuth::setToken($token)->getPayload();
$claimsToken = $payload->toArray();
$userID = $claimsToken["sub"];
$user = new OlankaUsers();
$matchingUser = $user->find($userID);
$matchingUser["password"] = Hash::make($validatedRequest["password"]);
$matchingUser ->save();
return response()->json([
"message"=>"Password updated successfully"
]);
}catch(\Exception $err){
return response()->json([
"message"=>$err->getMessage()
]);
}catch(ValidationException $err){
return response()->json([
"message"=>"Validation has failed"
]);
}
}
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
"message"=>"Something went wrong"
]);
}catch(JWTException $errJwt){
return response()->json([
"message"=>"Invalid token"
]);
}
}



public function fetchUserProfile(Request $request){
try{
$userID = $this->verifyUser($request);
$user =  OlankaUsers::select(["created_at","userName","Email","id","emailVerified","phoneNumber"])->find($userID);
return response()->json([
"data"=>$user,
"message"=>"User Data fetched"
]);
}catch(\Exception $err){
return response()->json([
"message"=>$err->getMessage()
],500);
}
}




public function fetchAllUsers(){
try{
$users = OlankaUsers::select(["created_at","userName","Email","phoneNumber","emailVerified","superUser","adminRoles"])->get();
return response()->json([
"message"=>'Users Fetched',
"data"=>$users
]);
}catch(\Exception $err){
Log::error($err->getMessage());
return response()->json([
"message"=>'Something Went Wrong'
]);
}
}



public function makeSuperUser(Request $request){
try{
$validatedRequest = $request->validate([
"id"=>"required|integer|exists:olanka_users,id"
]);
$id = $request->query("id");
$correspondentUser = OlankaUsers::find($id)->first();
$correspondentUser["superUser"] = true;
$correspondentUser->save();
return response()->json([
"message"=>"status updated"
]);
}catch(\Exception $err){
Log::error($err->getMessage());
return response()->json([
"message"=>"Something Went Wrong"
]);
}
}



public function unmakeSuperUser(Request $request){
    try{
    $validatedRequest = $request->validate([
    "id"=>"required|integer|exists:olanka_users,id"
    ]);
    $id = $request->query("id");
    $correspondentUser = OlankaUsers::find($id)->first();
    $correspondentUser["superUser"] = false;
    $correspondentUser->save();
    return response()->json([
    "message"=>"status updated"
    ]);
    }catch(\Exception $err){
    Log::error($err->getMessage());
    return response()->json([
    "message"=>"Something Went Wrong"
    ]);
    }
    }




public function deleteAdmins(Request $request){
try{
$validatedRequst = $request->validate([
"id"=>"required|integer|exists:olanka_users,id"
]);
$id = $request->query("id");
OlankaUsers::where("id",$id)->delete();
return response()->json([
"message"=>"Deleted Successfully"
]);
}catch(\Exception $err){
Log::error($err->getMessage());
return response()->json([
"message"=>"Something Went Wrong"
]);
}
}



}