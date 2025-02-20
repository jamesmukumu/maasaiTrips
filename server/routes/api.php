<?php
use App\Http\Controllers\BulkMailControllers;
use App\Http\Controllers\NewsLettersController;
use App\Http\Controllers\OlankaUsersController;
use App\Http\Controllers\QuotationController;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\Verify;
use App\Http\Controllers\MailerController;


// grouping my routes here  y the middleware verify.T
Route::middleware(Verify::class)->group(function () {


    // mail apis
Route::post("/send/email",[MailerController::class,"sendMail"]);
Route::post("/save/email/template",[MailerController::class,"saveEmailTemplate"]);
Route::post("/save/email/bulk",[BulkMailControllers::class,'saveBulkEmail']);
Route::get("/fetch/bulk/emails",[BulkMailControllers::class,"fetchBulkMails"]);
Route::post("/send/bulk/mails",[BulkMailControllers::class,"sendMailsBulk"]);
Route::patch("/update/bulk/users",[BulkMailControllers::class,"updateMailer"]);
Route::delete("/delete/bulks",[BulkMailControllers::class,"removeFromBulks"]);
Route::post("/propagate/newsletters",[NewsLettersController::class,"sendNewsLetters"]);
Route::put("/update/mail/template",[MailerController::class,'updateEmailTemplate']);
Route::delete("/delete/email/template",[MailerController::class,"deleteTemplateMail"]);
});


Route::post("/save/quote",[QuotationController::class,"saveQuotations"]);
Route::get("/fetch/enquiries",[QuotationController::class,"fetchAllEnquiries"]);
Route::put("/update/enquiry",[QuotationController::class,"updateEnquiry"]);
Route::delete("/delete/enquiry",[QuotationController::class,"deleteEnquiry"]);


//User Routes here
Route::post("/register/user",[OlankaUsersController::class,"handleRegister"]);
Route::post("/login/user",[OlankaUsersController::class,"handleLogin"]);
Route::put("/verify/email",[OlankaUsersController::class,"verifyEmail"]);
Route::put("/reset/password",[OlankaUsersController::class,"actualizeVerify"])->middleware(Verify::class);
Route::post("/request/reset",[OlankaUsersController::class,"RequestResetLink"]);

Route::post("/send/newsletter",[NewsLettersController::class,"sendNewsLetter"]);
Route::post("/save/news/letter",[NewsLettersController::class,"saveNewsLetter"]);
Route::post("/live/preview",[NewsLettersController::class,"openLive"]);
Route::post("/save/to/cloud",[NewsLettersController::class,"uploadtoCloudinary"]);

