<?php

namespace App\Http\Controllers;

use App\Mail\MailerSend;
use App\Models\BulkMails;
use App\Models\EmailTemplates;
use Dotenv\Exception\ValidationException;
use Illuminate\Http\Request;
use Log;
use Mail;
use App\Http\Controllers\MailerController;




class BulkMailControllers extends Controller{

// here i send mails to bulk
public function sendMailsBulk(Request $request){
try{
$validatedRequest = $request->validate([
"emailTemplate"=>"required|integer",
"destinations"=>"required|min:1"
]);
$emailTemplates = EmailTemplates::select("mailMessage","subject")->find($validatedRequest['emailTemplate']);
$mailMessage = $emailTemplates['mailMessage'];
$mailSubject = $emailTemplates['subject'];
$mailerCont = new MailerController();
if($request->hasFile("attachment")){
$mailerCont -> attachFile($request,$mailSubject,$mailMessage);

return response()->json([
"message"=>"Sent"
]);
}else{
    foreach($validatedRequest["destinations"] as $dest){
     
    $mailer = new MailerSend(
    subject: $mailSubject,
    msg: $mailMessage,
    attachmentPath:""
    );
    Mail::to($dest)->send($mailer);
    }
    
return response()->json([
    "message"=>"Emails propgated"
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






public function fetchBulkMails(Request $request){
try{
$bulks = new BulkMails();
$results = $bulks->select("fullname","category","identificationNumber","phoneNumber","email","country")->orderBy("created_at")->paginate(30);
return response()->json([
"message"=>"Fetched",
"count"=>$results->total(),
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



}
