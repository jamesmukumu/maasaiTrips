<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class Verify{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
public function handle(Request $request, Closure $next): Response{
$tokenHeader = $request->header("Authorization");
$token = substr($tokenHeader,7);
if($token == '' || $tokenHeader == ''){
return response()->json([
"message"=>"Missing token header"
]);
}
try{
$payload = JWTAuth::setToken($token)->getPayload();
return $next($request);
}catch(\Exception $err1){
return response()->json([
"message"=>$err1->getMessage()
]);
}catch(JWTException $err){
return response()->json([
"message"=>"Token Invalid"
],401);
}

}
}
