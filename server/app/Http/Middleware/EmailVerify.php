<?php

namespace App\Http\Middleware;

use App\Models\OlankaUsers;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Mail;
use App\Mail\SignMail;
use Tymon\JWTAuth\Facades\JWTAuth;

class EmailVerify{
    /**

     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!OlankaUsers::where("Email", $request["credential"])->exists()) {
            return response()->json([
                "message" => "User does not have an account"
            ], Response::HTTP_NOT_FOUND);
        }
        $matchingUser = OlankaUsers::where("Email", $request["credential"])->get();
        if (!$matchingUser[0]["emailVerified"]) {
            $token = JWTAuth::fromUser($matchingUser[0]);
            Mail::to($request["credential"])->send(new SignMail($matchingUser[0], tokenString: $token));
            return response()->json([
                "message" => "Verification link approved and sent"
            ], 200);
        } else {
            return $next($request);
        }
    }
}


