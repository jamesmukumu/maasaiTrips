<?php

namespace App\Http\Controllers;

use App\Mail\MailerSend;
use App\Models\BulkMails;
use App\Models\EmailTemplates;
use App\Models\MailStatus;
use App\Models\OlankaUsers;
use Dotenv\Exception\ValidationException;
use App\Models\PromotionalNewsletters;

use Illuminate\Http\Request;
use Log;
use Mail;
use App\Http\Controllers\MailerController;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Models\NewsLetters;
use App\Models\NewsletterAlerts;
use App\Models\HotelsModel;
interface BulkMailsInterface{
public function verifyToken(Request $request);
}

class BulkMailControllers extends Controller implements BulkMailsInterface{
    
public function fetchMailStatus(Request $request){
    try{
    $olankaID =  $this->verifyToken($request);
    
    $mailData = MailStatus::where("olanka_users_id",$olankaID)->with(['bulkUserRelation'])->orderBy("created_at")->get();
    return response()->json([
    "message"=>"Status fetched",
    "data"=>$mailData
    ]);
    }catch(\Exception $err){
    return response()->json([
    "message"=>$err->getMessage()
    ],500);
    }catch(ValidationException $errValidate){
    return response()->json([
    "message"=>$errValidate->getMessage()
    ]);
    }
    }
public function verifyToken(Request $request){
try{
$tokenHeader = $request->header("Authorization");
$token = substr($tokenHeader,7);
if($token == '' || $tokenHeader == ''){
return response()->json([
"message"=>"Missing Token header"
],401);
}
$payload = JWTAuth::setToken($token)->getPayload();
$claims = $payload->toArray();
return $claims['sub'];
}catch(\Exception $err){
Log::error($err->getMessage());
return response()->json([
"message"=>$err->getMessage()
]);
}
}

public function sendMailsBulk(Request $request){
try{
$this->verifyToken($request); 
$validatedRequest = $request->validate([
"emailTemplate"=>"required|integer",
"destinations"=>"required|min:1"
]);
$emailTemplates = EmailTemplates::select("mailMessage","subject")->find($validatedRequest['emailTemplate']);
$mailMessage = $emailTemplates['mailMessage'];
$mailSubject = $emailTemplates['subject'];
$mailerCont = new MailerController();
if($request->hasFile("attachment")){
$targetMails = explode(",",$validatedRequest["destinations"]);
foreach($targetMails as $dest){
$mailerCont -> attachFile($request,$mailSubject,$mailMessage,$dest);
$bulkMailerLoad = BulkMails::where("email", $dest)->first();
if (!$bulkMailerLoad) {
return response()->json([
"message" => "Email target not found in BulkMails"
], 404);
}

$userID = $this->verifyToken($request);
$idBulk = $bulkMailerLoad->id;
$mailerSaverLoad = [
"status" => "delivered", 
"olanka_users_id" => $userID,
"bulk_mails_id" => $idBulk
];
MailStatus::create($mailerSaverLoad);
}
return response()->json([
"message"=>"Sent"
]);
}else{
$mailsTarget = explode(",",$validatedRequest["destinations"]);
foreach($mailsTarget as $dest){

    $bulkMailerLoad = BulkMails::where("email", $dest)->first();
if (!$bulkMailerLoad) {
return response()->json([
"message" => "Email target not found in BulkMails"
], 404);
}
$userID = $this->verifyToken($request);
$idBulk = $bulkMailerLoad->id;
$mailerSaverLoad = [
"status" => "delivered", 
"olanka_users_id" => $userID,
"bulk_mails_id" => $idBulk
];
$mailStatus = MailStatus::create($mailerSaverLoad);
$mailer = new MailerSend(
subject: $mailSubject,
msg: $mailMessage,
attachmentPath:"" 
);
Mail::to($dest)->send($mailer);
}
return response()->json([
"message"=>"Emails propagated"
]);
}

}catch(\Illuminate\Validation\ValidationException $errValidate){
Log::error($errValidate->getMessage());
return response()->json([
"message"=> $errValidate->getMessage()
]);
}catch(\Exception $err){
echo $err->getMessage();
}
}





public function saveBulkEmail(Request $request){
try{
$tokenHeader = $request->header("Authorization");
$token =  substr($tokenHeader,7);
if($token == '' || $tokenHeader == ''){
return response()->json([
"message"=>"Missing token header"
],401);
}
$payload = JWTAuth::setToken($token)->getPayload();
$claims = $payload->toArray();
$olanka_user_id = $claims["sub"];
$validatedRequest = $request->validate([
"fullname"=> "required|unique:bulk_mails,fullname",
"category"=> "required",
"identificationNumber"=>"required|min:8|unique:bulk_mails,identificationNumber",
"phoneNumber"=>"required|min:10|max:12|unique:bulk_mails,phoneNumber",
"description"=>"nullable",
"email"=>"required|unique:bulk_mails,email",
"identificationMethod"=>"required",
"country"=>"nullable",

]);
$validatedRequest["olanka_users_id"] = $olanka_user_id;
BulkMails::create($validatedRequest);
return response()->json([
"message"=>"Bulk mail saved"
],200);

}catch(\Exception $err){
return response()->json([
"message"=>$err->getMessage()
]);
}catch(ValidationException $errValidate){
return response()->json([
"message"=>$errValidate->getMessage()
]);
}
}

public function updateMailer(Request $request){
try{
    $validatedRequest = $request->validate([
        "fullname"=> "nullable",
        "category"=> "nullable",
        "identificationNumber"=>"nullable",
        "phoneNumber"=>"nullable",
        "description"=>"nullable",
        "email"=>"nullable",
        "identificationMethod"=>"nullable",
        "country"=>"nullable",

]);
$bulkQuery = $request->query('bulkQuery');
$olanka_user_id = $this->verifyToken($request);
$validatedRequest["olanka_users_id"] = $olanka_user_id;
$updateMail = BulkMails::where("id",$bulkQuery)->update($validatedRequest);
return response()->json([
"message"=>"Update Saved Successfully"
]);
}catch(\Exception $err){
return response()->json([
"message"=>$err->getMessage()
]);
}
}


public function removeFromBulks(Request $request){
try{
$validatedRequest = $request->validate([
"queryid"=>"required|integer"
]);
$id = $request->query("queryid");
if(BulkMails::where("id",$id)->exists()){
BulkMails::where("id",$id)->delete();
return response()->json([
"message"=>"Deleted"
]);
}else{
return response()->json([
"message"=>"Bulk mail non existent"
]);
}
}catch(\Exception $err){
echo $err->getMessage();
}catch(ValidationException $errValidate){
return response()->json([
"message"=>$errValidate->getMessage()
]);
}


}
public function fetchBulkMails(Request $request){
try{
$tokenHeader = $request->header("Authorization");
$token = substr($tokenHeader,7);
if($token == '' || $tokenHeader == ''){
return response()->json([
"message"=>"Missing header"
],401);
}
$payload = JWTAuth::setToken($token)->getPayload();
$claimsToken = $payload->toArray();
$id = $claimsToken["sub"];
$userData =  EmailTemplates::where("olanka_users_id",$id)->select("subject","id")->get();
$newsLetters = Newsletters::where("olanka_users_id",$id)->select("Title","id")->get();
$alertNewsLetters =  NewsletterAlerts::where("olanka_users_id",$id)->select("Title","id")->get();
$promotionalNewsLetters = PromotionalNewsletters::where("olanka_users_id",$id)->select("Title","id")->get();
$bulks = new BulkMails();
$results = $bulks->select("id","fullname","category","identificationNumber","phoneNumber","email","country")->orderBy("created_at")->paginate(1000);
return response()->json([
"message"=>"Fetched",
"count"=>$results->total(),
"alertnewsLetters"=>$alertNewsLetters,
"emailTemps"=>$userData, 
"promotional"=>$promotionalNewsLetters,
"data"=>$results->items(),
"nextPage"=> $results->nextPageUrl(),
"currentPage"=>$results->currentPage()

]);
}catch(\Exception $errFetch){
Log::error($errFetch->getMessage());
return response()->json([
"message"=>$errFetch->getMessage()
]);
}

}





public function saveFromCsv(Request $request){
    try {
        $validation = $request->validate([
            "bulk_csv" => "required"
        ]);

        $csvFile = $request->file("bulk_csv");
        $contentsFile = fopen($csvFile->getRealPath(), "r");

        $datacont = [];
        $headers = fgetcsv($contentsFile, 1000, ","); 

        while (($data = fgetcsv($contentsFile, 1000, ",")) !== false) {
            $datacont[] = array_combine($headers, $data); 
        }

        fclose($contentsFile);
     
        BulkMails::insert($datacont);
    

        return response()->json([
            "message" => "Data Saved",
        
        ]);

    } catch (\Exception $err) {
        return response()->json([
            "message" => "Something went wrong"
        ], 500);
    }catch(ValidationException $errValidate){
return response()->json([
"message"=>$errValidate->getMessage()
],500);
}
}


// Thought it would be wide to create a way to sync hotel mails with bulks
public function syncWithHotelMails(Request $request){
try{
$id_user = $this->verifyToken($request);

$allHotelMails = HotelsModel::all();
foreach($allHotelMails as $hotel){
try{

    $bulkName = strstr($hotel["contactEmail"],'@',true);
    $randomFigures = mt_rand(0,999);
    $randomFiguresString = "411"."$randomFigures";
    $bulkSave = [
    "fullname"=>$bulkName,
    "category"=>"Client Local",
    "identificationNumber"=>$randomFiguresString,
    "phoneNumber"=>$hotel['contactPhoneNumber'],
    "olanka_users_id"=>$id_user,
    "identificationMethod"=>"passport",
    "email"=>$hotel['contactEmail'],
    "country"=>"Kenya"
    ];
    BulkMails::create($bulkSave);
}catch(\Exception $err){
Log::error($err->getMessage());
}
}
return response()->json([
"message"=>"Emails Synced"
]);
}catch(\Exception $err){
Log::error($err->getMessage());
return response()->json([
"message"=>"Something Went wrong"
]);
}
}






}
