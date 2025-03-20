<?php

namespace App\Http\Controllers;

use App\Models\Quotation;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class QuotationController extends Controller{


public function fetchAllEnquiries(){
try{
$allEnquireis = Quotation::all();
$countEnquiries = count($allEnquireis);
if($countEnquiries  == 0){
return "No Active Enquiries";
}else{
    return response()->json(data: [
        "data"=>$allEnquireis
    ]);
}
}catch(\Exception $err){
die($err->getMessage());
}
}



public function updateEnquiry(Request $request){
try{
$validatedRequest = $request ->validate([
    "firstName"=>"required",
    "lastName"=>"required",
    "email"=>"required",
    "phoneNumber"=>"required",
    "adultsCount"=>"min:0",
    "childrenCount"=>"min:0",
    "travelDescription"=>"min:0",
    "startStayDate"=>"required",
    "endStayDate"=>"required",
    "roomsCount"=>"min:0",
    
    "kidsAges"=>"nullable"
]);

 
$quotation = new Quotation();
$quotation->firstName = $validatedRequest["firstName"];
$quotation->lastName = $validatedRequest["lastName"];
$quotation ->fullName = $quotation->conjoinNames();
$quotation -> email = $validatedRequest["email"];
$quotation->quotationAddressed = false;
$quotation -> roomsCount = $validatedRequest["roomsCount"];
$quotation -> startStayDate = $validatedRequest["startStayDate"];
$quotation -> endStayDate = $validatedRequest["endStayDate"];
$quotation -> phoneNumber = $validatedRequest["phoneNumber"];
$quotation -> adultsCount = $validatedRequest["adultsCount"];
$quotation -> childrenCount = $validatedRequest["childrenCount"];
$quotation -> travelDescription = $validatedRequest["travelDescription"];
$quotation -> kidsAges = $validatedRequest["kidsAges"];
$quotation ->updateOrCreate(
[
"email"=>$quotation->email,
],
[
    "firstName" => $validatedRequest["firstName"],
    "lastName" => $validatedRequest["lastName"],
    "fullName" => $validatedRequest["firstName"] . ' ' . $validatedRequest["lastName"], // Assuming conjoinNames() does this
    "email" => $validatedRequest["email"],
   
   
    "roomsCount" => $validatedRequest["roomsCount"],
    "startStayDate" => $validatedRequest["startStayDate"],
    "endStayDate" => $validatedRequest["endStayDate"],
    "phoneNumber" => $validatedRequest["phoneNumber"],
    "adultsCount" => $validatedRequest["adultsCount"],
    "childrenCount" => $validatedRequest["childrenCount"],
    "travelDescription" => $validatedRequest["travelDescription"],
    "kidsAges" => $validatedRequest["kidsAges"] ?? null,

]

);
return response()->json([
"message"=>"Update success"
],200);
}catch(\Exception $err){
die($err->getMessage());
}
}



public function deleteEnquiry(Request $req){
try{
$queries = $req->query();
$emailTarget = $queries["email"];
$quotation = new Quotation();
if($quotation->where("email",$emailTarget)->exists()){
$quotation->where("email",$emailTarget)->delete();
return response()->json([
"message"=>"Success"
],200);
}else{
    return response()->json([
        "message"=>"Email not found"
        ],401);   
}

}catch(\Exception $err){

return response()->json([
"message"=>"Something went wrong",
]);


}



}



public function saveQuotations(Request $request){
try{
    $validatedRequest = $request ->validate([
        "firstName"=>"required",
        "lastName"=>"required",
        "email"=>"required",
        "phoneNumber"=>"required",
        "adultsCount"=>"required",
        "childrenCount"=>"nullable",
        "travelDescription"=>"nullable",
        "startStayDate"=>"required",
        "endStayDate"=>"required",
        "roomsCount"=>"required"
        ]);
        
        
        $quotation = new Quotation();
        $quotation->firstName = $validatedRequest["firstName"];
        $quotation->lastName = $validatedRequest["lastName"];
        $quotation ->fullName = $quotation->conjoinNames();
        $quotation -> email = $validatedRequest["email"];
        $quotation->quotationAddressed = false;
        $quotation -> roomsCount = $validatedRequest["roomsCount"];
        $quotation -> startStayDate = $validatedRequest["startStayDate"];
        $quotation -> endStayDate = $validatedRequest["endStayDate"];
        $quotation -> phoneNumber = $validatedRequest["phoneNumber"];
        $quotation -> adultsCount = $validatedRequest["adultsCount"];
        $quotation -> childrenCount = $validatedRequest["childrenCount"];
        $quotation -> travelDescription = $validatedRequest["travelDescription"];
        $quotation -> kidsAges = $request["kidsAges"];
        
        
        $quotation ->save();
        return response()->json([
            "message"=>"Quotation added",
            
        ],200);

}catch(\Exception $e){
return response()->json([
"message"=>"Something Went wrong",
"error"=>$e->getMessage()
],500);
}catch(ValidationException $e){
return response()->json([
"message"=>"Validation failed"
],202);

}


}


}