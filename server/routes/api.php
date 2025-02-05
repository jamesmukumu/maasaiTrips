<?php
use App\Http\Controllers\QuotationController;
use Illuminate\Support\Facades\Route;

Route::post("/save/quote",[QuotationController::class,"saveQuotations"]);
Route::get("/fetch/enquiries",[QuotationController::class,"fetchAllEnquiries"]);
Route::put("/update/enquiry",[QuotationController::class,"updateEnquiry"]);
Route::delete("/delete/enquiry",[QuotationController::class,"deleteEnquiry"]);




