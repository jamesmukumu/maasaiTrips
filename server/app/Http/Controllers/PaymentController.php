<?php

namespace App\Http\Controllers;

use App\Mail\MailerInvoices;
use App\Models\Package;
use App\Models\Payments;
use Barryvdh\DomPDF\Facade\Pdf;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Log;
use Storage;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Facades\JWTFactory;
use Tymon\JWTAuth\JWT;

class PaymentController extends Controller{
   
// payload will contain amount
// first find the package after the params,then fetch the packageCharge,then fetchPackageChargeCurrency.
// if package currency is not in dollars,do a conversion from initial charge to dollars


    public function requestPayment(Request $request) {
        try {
            $package_id = $request->route('packageid');
            $validatedRequest = $request->validate([
              "first_name"=>"required",
              "last_name"=>"required",
              "email"=>"required"
            ]);
             $relevantPackage = Package::find($package_id);
             $packageCurrency = $relevantPackage['packageChargeCurrency'];
             $packageAmount = $relevantPackage['packageCharge'];
            if($relevantPackage['packageChargeCurrency'] != 'KES'){
             $conversionsResponse =  Http::get('https://v6.exchangerate-api.com/v6/b12e72d566da2b9a73b8dfc7/latest/USD');
             $responseConversions =  json_decode($conversionsResponse->body(),true);
            $currencyOptions =  $responseConversions['conversion_rates'];
              $conversionRate = isset($currencyOptions[$packageCurrency]) ? $currencyOptions[$packageCurrency] : null;
              $packageAmount  =  floor($packageAmount/$conversionRate);
            

            }
       $resp = Http::withHeaders([
                "X-IntaSend-Public-API-Key" => env("INTASENDSECRET"),
                "Content-Type" => 'application/json'
            ])->post("https://api.intasend.com/api/v1/checkout/", [
                "amount" => "$packageAmount",
                "currency" => "KES",
                "first_name"=>$validatedRequest['first_name'],
                "last_name"=>$validatedRequest['last_name'],
                "email"=>$validatedRequest['email']
             
            ]);
            $responseData = $resp->json();
            $id = $responseData['id'];
            $signature = $responseData['signature'];
            $payload = JWTFactory::customClaims([
                "sub" => $package_id ?? "Checkout Process",  
                "signature" => $signature,
                "checkout_id" => $id
            ])->make();
            
            $token = JWTAuth::encode($payload)->get();
            return response()->json(
            [
            "message"=>"Payment started",
            "url"=>$responseData['url']
          
            ]
            )->header("Authorization","Bearer $token")->header("Access-Control-Expose-Headers","Authorization");
        } catch (\Exception $err) {
            Log::error($err->getMessage());
            return response()->json(['error' => 'Payment request failed.'], 500);
        }
    }
    


public function verifySavePayment(Request $request){
    try{
    $tokenHeader = $request->header('Authorization');
   $token = substr($tokenHeader,7);
   if(!$tokenHeader || !$token){
    throw new Exception("Payment Unauthorized",401);
   }
   $payload = JWTAuth::setToken($token)->getPayload();
    $signature = $payload['signature'];
    $checkout_id = $payload['checkout_id'];
     $sub = $payload['sub'];
      $resp = Http::withHeaders([
        "X-IntaSend-Public-API-Key" => env("INTASENDSECRET"),
        "Content-Type" => 'application/json'
      ])->post("https://api.intasend.com/api/v1/checkout/details/",[
        "checkout_id"=>$checkout_id,
        "signature"=>$signature
      ]);
      $responseData =  $resp->json();

      if(!$responseData['paid']){
       
      return response()->json([
        "message"=>"Payment aborted"
      ],200);
      }else{
        $packages = Package::find($sub);
        $Payload = [
          "signature"=>$responseData['signature'],
          '_id'=>$responseData['id'],
          'paymentFor'=>'Packages',
          "amountPaid"=>$responseData['amount'],
          "firstName"=>$responseData['first_name'] ?? "John",
          "lastName"=>$responseData['last_name'] ?? "Doe",
          "email"=>$responseData['email'] ?? "johndoe@gmail.con",
          "packages"=>$sub
          ];
        
    
        Payments::create($Payload);
        return $this->downloadPdf($Payload,$packages);
      }
}catch(\Exception $err){
     Log::error($err->getMessage());
      return response()->json([
    "message"=>"Something Went Wrong"
      ],500);
    }


  }




  public function downloadPdf($payload,$packages){
    $pdf = Pdf::loadView("Invoice",[
      "payload"=>$payload,
      "packages"=>$packages
    ]);
    $pdfContent  = $pdf->output();
   $mailer = new MailerInvoices("storage/invoices/packages/invoice.pdf");
   Mail::to($payload['email'])->send($mailer);
Storage::disk("public")->put("invoices/packages/invoice.pdf",$pdfContent);
return response()->json([
 "message"=>"Invoice saved to storage and email propagated",
 "url"=>Storage::url("invoices/packages/invoice.pdf") 
]);
  }
}
