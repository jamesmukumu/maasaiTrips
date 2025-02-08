<?php
use App\Http\Controllers\OlankaUsersController;
use App\Http\Controllers\QuotationController;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\Verify;



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