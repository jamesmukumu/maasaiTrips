<?php
use App\Http\Controllers\BulkMailControllers;
use App\Http\Controllers\DestinationController;
use App\Http\Controllers\HotelsController;
use App\Http\Controllers\NewsLettersController;
use App\Http\Controllers\OlankaUsersController;
use App\Http\Controllers\PromotionalControllers;
use App\Http\Controllers\QuotationController;
use App\Http\Controllers\RoomsController;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\Verify;
use App\Http\Controllers\MailerController;
use App\Http\Controllers\NewsLetterAlert;
use App\Http\Middleware\EmailVerify;



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
Route::post("/send/newsletter",[NewsLettersController::class,"sendNewsLetter"]);
Route::post("/save/news/letter",[NewsLettersController::class,"saveNewsLetter"]);
Route::post("/live/preview",[NewsLettersController::class,"openLive"]);
Route::post("/save/to/cloud",[NewsLettersController::class,"uploadtoCloudinary"]);
Route::get("/fetch/mail/status",[BulkMailControllers::class,"fetchMailStatus"]);
Route::get("/fetch/email/templates",[MailerController::class,"fetchMyTemplates"]);
Route::put("/update/news/letter",[NewsLettersController::class,'updateNewsLetterTemplate']);
Route::get("/fetch/my/newsletters",[NewsLettersController::class,'fetchMyTemplates']);
Route::delete("/delete/news/letter",[NewsLettersController::class,'deleteNewsLetterTemplateMail']);
Route::post("/save/alerts/newsLetter",[NewsLetterAlert::class,'saveNewsLetterAlert']);




// Protected user Routes
Route::get("/fetch/user/profile",[OlankaUsersController::class,"fetchUserProfile"]);





Route::get("/fetch/enquiries",[QuotationController::class,"fetchAllEnquiries"]);
Route::put("/update/enquiry",[QuotationController::class,"updateEnquiry"]);
Route::delete("/delete/enquiry",[QuotationController::class,"deleteEnquiry"]);


// alert news letters
Route::post("/send/alerts/newsletter",[NewsLetterAlert::class,"sendNewsLetters"]);
Route::post("/update/alerts/template",[NewsLetterAlert::class,'updateNewsLetterAlerts']);
Route::get("/fetch/my/alert/news/alerts",[NewsLetterAlert::class,"fetchMyTemplates"]);
Route::delete("/delete/news/alert",[NewsLetterAlert::class,"deleteNewsLetterTemplateMail"]);
Route::post("/preview/alerts",[NewsLetterAlert::class,"previewAlerts"]);
Route::post("/preview/edit-mode/alerts",[NewsLetterAlert::class,"previewAlertsReady"]);
});


Route::post("/save/quote",[QuotationController::class,"saveQuotations"]);


//User Routes here
Route::post("/register/user",[OlankaUsersController::class,"handleRegister"]);
Route::post("/login/user",[OlankaUsersController::class,"handleLogin"])->middleware(EmailVerify::class);
Route::put("/verify/email",[OlankaUsersController::class,"verifyEmail"]);
Route::put("/reset/password",[OlankaUsersController::class,"actualizeVerify"])->middleware(Verify::class);
Route::post("/request/reset",[OlankaUsersController::class,"RequestResetLink"]);



Route::post("/save/bulk/from/csv",[BulkMailControllers::class,"saveFromCsv"]);
Route::post("/test/dummy",[NewsLettersController::class,"seeNewsLetter"]);


// promotional newsletters
Route::post("/dummy/promote",[PromotionalControllers::class,'sendNewsLetterPromotional']);
Route::post("/save/promotional/newsletters",[PromotionalControllers::class,'savePromotionalNewsletters']);
Route::post("/propagate/promotional/newsletters",[PromotionalControllers::class,"sendNewsLettersPromotional"]);
Route::get("/fetch/promotional/newsletter",[PromotionalControllers::class,"fetchMyTemplates"]);
Route::delete("/delete/promotional/newsletter",[PromotionalControllers::class,"deleteNewsLetterTemplateMail"]);
Route::post("/update/promotional/newsletter",[PromotionalControllers::class,"UpdatePromotionalNewsletters"]);
Route::post("/preview/promotional/newsletter",[PromotionalControllers::class,"previewPromotional"]);






// Hotels Api
Route::post("/add/new/hotel",[HotelsController::class,"createHotel"]);
Route::delete("/delete/hotel",[HotelsController::class,"deleteHotel"]);
Route::post("/update/hotel",[HotelsController::class,"updateHotel"]);
Route::put("/publish/hotel",[HotelsController::class,"publishHotel"]);
Route::get("/fetch/hotel",[HotelsController::class,"fetchHotel"]);
Route::get("/fetch/my/hotels",[HotelsController::class,"fetchMyHotels"]);




// Rooms Api
Route::post("/create/new/room",[RoomsController::class,"createRoom"]);







// Destination Api here
Route::post("/add/new/destination",[DestinationController::class,"createDestination"]);
Route::get("/find/all/destinations",[DestinationController::class,"fetchDestinations"]);











