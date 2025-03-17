<?php

namespace App\Http\Middleware;

use App\Models\OlankaUsers;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Log;




class VerifySuperUser{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response {
       try{
         $tokenHeader = $request->header("Authorization");
         $actualToken = substr($tokenHeader,7);
         if($tokenHeader=='' || $actualToken == ''){
         return response()->json([
        "message"=>"Unauthorized",
        
         ],401);
         }
       $payload = JWTAuth::setToken($actualToken)->getPayload();
       $user = OlankaUsers::find($payload['sub']);
       if(!$user['superUser']){
        return response()->json([
        "message"=>"Unauthorized function",
        "content"=>"You are not authorized to handle this action"
        ],200);
       }else{
        return $next($request);
       }
    }catch(\Exception $err){
    Log::error($err->getMessage());
    return response()->json([
    "message"=>$err->getMessage()
    ]);
    }
}
}
