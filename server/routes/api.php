<?php
use App\Http\Controllers\BlogCategories;
use App\Http\Controllers\BlogsController;
use App\Http\Controllers\BulkMailControllers;
use App\Http\Controllers\DestinationController;
use App\Http\Controllers\HotelsController;
use App\Http\Controllers\NewsLettersController;
use App\Http\Controllers\OlankaUsersController;
use App\Http\Controllers\PackageController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\PromotionalControllers;
use App\Http\Controllers\QuotationController;
use App\Http\Controllers\RoomsController;
use App\Http\Middleware\VerifySuperUser;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\Verify;
use App\Http\Controllers\MailerController;
use App\Http\Controllers\NewsLetterAlert;
use App\Http\Middleware\EmailVerify;


// Middleware for super user
Route::middleware(VerifySuperUser::class)->group(function(){
Route::put("/adjust/status/destinations",[DestinationController::class,"updateActionPending"]);
Route::put("/adjust/status/hotels",[HotelsController::class,"updateActionPending"]);
Route::put("/adjust/status/packages",[PackageController::class,"updateActionPending"]);
Route::put("/adjust/status/rooms",[RoomsController::class,"updateActionPending"]);



// Admins Roles for users are here
Route::get("/see/all/users",[OlankaUsersController::class,"fetchAllUsers"]);
Route::put("/make/super/user",[OlankaUsersController::class,"makeSuperUser"]);
Route::put("/unmake/super/user",[OlankaUsersController::class,"unmakeSuperUser"]);
Route::delete("/delete/admin",[OlankaUsersController::class,"deleteAdmins"]);
Route::put("/update/admin",[OlankaUsersController::class,"updateAdmin"]);



// Blog Admin Api`s Go here
Route::patch("/adjust/blog/status",[BlogsController::class,"adjustBlogStatus"]);

});



// grouping my routes here  y the middleware verify.T
Route::middleware(Verify::class)->group(function () {
// mail apis
Route::post("/send/email",[MailerController::class,"sendMail"]);
Route::post("/save/email/template",[MailerController::class,"saveEmailTemplate"]);
Route::post("/save/bulk/from/csv",[BulkMailControllers::class,"saveFromCsv"]);
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
Route::post("/sync/bulks",[BulkMailControllers::class,"syncWithHotelMails"]);
Route::post("/save/mail/templates/csv",[MailerController::class,"saveMails_CSV"]);



// Protected user Routes
Route::get("/fetch/user/profile",[OlankaUsersController::class,"fetchUserProfile"]);




// Protected Enquiry Routes
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
Route::post("/save/alert/newsletters/csv",[NewsLetterAlert::class],"Alerts_From_Csv");




// promotional newsletters
Route::post("/dummy/promote",[PromotionalControllers::class,'sendNewsLetterPromotional']);
Route::post("/save/promotional/newsletters",[PromotionalControllers::class,'savePromotionalNewsletters']);
Route::post("/propagate/promotional/newsletters",[PromotionalControllers::class,"sendNewsLettersPromotional"]);
Route::get("/fetch/promotional/newsletter",[PromotionalControllers::class,"fetchMyTemplates"]);
Route::delete("/delete/promotional/newsletter",[PromotionalControllers::class,"deleteNewsLetterTemplateMail"]);
Route::post("/update/promotional/newsletter",[PromotionalControllers::class,"UpdatePromotionalNewsletters"]);
Route::post("/preview/promotional/newsletter",[PromotionalControllers::class,"previewPromotional"]);
Route::post("/save/promotional/content/csv",[PromotionalControllers::class,"promotional_newsletters_Csv"]);



// Hotels Api
Route::post("/add/new/hotel",[HotelsController::class,"createHotel"]);
Route::delete("/delete/hotel",[HotelsController::class,"deleteHotel"]);
Route::post("/update/hotel",[HotelsController::class,"updateHotel"]);
Route::put("/publish/hotel",[HotelsController::class,"publishHotel"]);
Route::get("/fetch/my/hotels",[HotelsController::class,"fetchMyHotels"]);
Route::put("/unpublish/hotel",[HotelsController::class,'unpublishHotel']);
Route::get("/fetch/all/hotels",[HotelsController::class,"fetchAllHotels"]);
Route::post("/save/hotels/from/csv",[HotelsController::class,"promotional_newsletters_Csv"]);
Route::post("/save/hotels/csv",[HotelsController::class,"save_Hotels_From_Csv"]);



// Rooms Api
Route::post("/create/new/room",[RoomsController::class,"createRoom"]);
Route::get("/find/my/rooms",[RoomsController::class,"fetchMyRooms"]);
Route::post("/update/room",[RoomsController::class,"updateRoom"]);
Route::post("/save/room/from/csv",[RoomsController::class,"saveRoomsCSV"]);






// Destination Api here
Route::post("/add/new/destination",[DestinationController::class,"createDestination"]);
Route::get("/fetch/my/destinations",[DestinationController::class,"myDestinations"]);
Route::delete("/delete/destination",[DestinationController::class,'DeleteDestination']);
Route::put("/publish/destination",[DestinationController::class,'PublishDestination']);
Route::put("/unpublish/destination",[DestinationController::class,"UnpublishDestination"]);
Route::post("/update/destination",[DestinationController::class,"updateDestination"]);
Route::post("/save/destinations/from/csv",[DestinationController::class,"save_Destinations_CSV"]);



// Packages APis here
Route::post("/create/new/package",[PackageController::class,"addPackage"]);
Route::get("/fetch/my/packages",[PackageController::class,'fetchMyPackages']);
Route::delete("/delete/package",[PackageController::class,'deletePackage']);
Route::put("/publish/package",[PackageController::class,"PublishPackage"]);
Route::put("/unpublish/package",[PackageController::class,"UnpublishPackage"]);
Route::post("/create/package/category",[PackageController::class,'addPackageCategory']);
Route::get("/fetch/package/categories",[PackageController::class,'fetchPackageCategories']);
Route::post("/update/package",[PackageController::class,'updatePackage']);
Route::post("/save/package/csv",[PackageController::class,'PackagesFromCsv']);




// Blog Api`s go here
Route::post("/create/new/blog",[BlogsController::class,"addBlog"]);
Route::post("/update/blog",[BlogsController::class,"updateBlog"]);
Route::delete('/delete/blog',[BlogsController::class,"deleteBlog"]);
Route::patch("/publish/blog",[BlogsController::class,"publishBlog"]);
Route::patch('/unpublish/blog',[BlogsController::class,"unpublishBlog"]);




Route::get("/fetch/my/blogs",[BlogsController::class,'fetchMyBlogs']);









// Blog Category Api here
Route::post("/create/new/blog/category",[BlogCategories::class,"addBlogCategory"]);
Route::get("/fetch/blog/categories",[BlogCategories::class,"fetchBlogCategories"]);

});





// All Unprotected Routes 
Route::post("/save/quote",[QuotationController::class,"saveQuotations"]); //route for saving an enquiry.
Route::get("/fetch/display/hotels",[HotelsController::class,'fetchDisplayHotels']);//route for fetching all hotels to display
Route::get("/fetch/hotel",[HotelsController::class,"fetchHotel"]);


//User Routes here
Route::post("/register/user",[OlankaUsersController::class,"handleRegister"]);
Route::post("/login/user",[OlankaUsersController::class,"handleLogin"])->middleware(EmailVerify::class);
Route::put("/verify/email",[OlankaUsersController::class,"verifyEmail"]);
Route::put("/reset/password",[OlankaUsersController::class,"actualizeVerify"])->middleware(Verify::class);
Route::post("/request/reset",[OlankaUsersController::class,"RequestResetLink"]);


Route::get("/find/all/destinations",[DestinationController::class,"fetchDestinations"]);//route for fetching all destinations for which to display
Route::get("/find/single/destination",[DestinationController::class,"findSingularDestination"]);//unprotected route for finding just a singular destination
Route::get("/fetch/destinations",[DestinationController::class,"findAllDestinations"]);


Route::get("/fetch/display/packages",[PackageController::class,'fetchDisplayPackages']);//route for finding all packages to showcase
Route::get("/fetch/singular/package",[PackageController::class,'findSingularPackage']);//single package route


// Unprotected Blogs Apis
Route::get("/fetch/display/blogs",[BlogsController::class,'fetchBlogsDisplay']);
Route::get('/fetch/singular/blog',[BlogsController::class,"fetchSingularBlog"]);







//  payments link
Route::get("/download/invoice",[PaymentController::class,"downloadPdf"]);
Route::post("/verify/payment",[PaymentController::class,"verifySavePayment"]);
Route::post("/create/payment/{packageid}",[PaymentController::class,'requestPayment']);