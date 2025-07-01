<?php

namespace App\Http\Controllers;

use App\Models\DeviceTokens;
use Illuminate\Http\Request;
use Log;

class DeviceControllers extends Controller{
    

public function saveDeviceToken(Request $request){
try{
$validatedRequest = $request->validate([
"deviceToken"=>'required|unique:device_tokens,deviceToken'
]);
DeviceTokens::create($validatedRequest);
return response()->json([
'message'=>'Device token saved'
]);
}catch(\Exception $err){
Log::error($err->getMessage());
}
}




}
