<?php
use App\Http\Controllers\BulkMailControllers;
use App\Http\Controllers\OlankaUsersController;
use App\Http\Controllers\QuotationController;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\Verify;
use App\Http\Controllers\MailerController;


// grouping my routes here  y the middleware verify.T
Route::middleware(Verify::class)->group(function () {
    Route::post("/save/quote",[QuotationController::class,"saveQuotations"]);
    Route::get("/fetch/enquiries",[QuotationController::class,"fetchAllEnquiries"]);
    Route::put("/update/enquiry",[QuotationController::class,"updateEnquiry"]);
    Route::delete("/delete/enquiry",[QuotationController::class,"deleteEnquiry"]);
    

    // mail apis
Route::post("/send/email",[MailerController::class,"sendMail"]);
Route::post("/save/email/template",[MailerController::class,"saveEmailTemplate"]);




});







//User Routes here
Route::post("/register/user",[OlankaUsersController::class,"handleRegister"]);
Route::post("/login/user",[OlankaUsersController::class,"handleLogin"]);
Route::put("/verify/email",[OlankaUsersController::class,"verifyEmail"]);
Route::put("/reset/password",[OlankaUsersController::class,"actualizeVerify"])->middleware(Verify::class);
Route::post("/request/reset",[OlankaUsersController::class,"RequestResetLink"]);


Route::get("/fetch/bulk/emails",[BulkMailControllers::class,"fetchBulkMails"]);
Route::post("/send/bulk/mails",[BulkMailControllers::class,"sendMailsBulk"]);



