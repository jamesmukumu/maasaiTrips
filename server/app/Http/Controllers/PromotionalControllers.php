<?php

namespace App\Http\Controllers;

use App\Mail\MailPromotionalAlerts;
use App\Models\PromotionalNewsletters;
use Cloudinary\Cloudinary;
use Dotenv\Exception\ValidationException;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Symfony\Component\String\TruncateMode;
use Tymon\JWTAuth\Facades\JWTAuth;
use Log;
use Mail;
use App\Models\BulkMails;
use App\Models\MailStatus;
interface PromotionalInterface
{
    public function verificationToken(Request $request);
}
class PlaceVisit
{
    public $destinationTitle;
    public $destinationDescription;
    public $destinationImage;
    public $destinationPrice;

    public function __construct($title, $descp, $img, $price)
    {
        $this->destinationTitle = $title;
        $this->destinationDescription = $descp;
        $this->destinationImage = $img;
        $this->destinationPrice = $price;
    }
}




class PromotionalControllers extends Controller implements PromotionalInterface
{


    public function verificationToken(Request $request)
    {
        try {
            $tokenHeader = $request->header("Authorization");
            if (!$tokenHeader || strlen($tokenHeader) < 8) {
                throw new \Exception("Missing or invalid Token header");
            }

            $token = substr($tokenHeader, 7);
            $payload = JWTAuth::setToken($token)->getPayload();
            return $payload['sub'];

        } catch (\Exception $err) {
            Log::error($err->getMessage());
            throw new \Exception($err->getMessage());
        }
    }

    public function sendNewsLetterPromotional(Request $request)
    {
        try {
            $mailer = app(MailPromotionalAlerts::class);
            Mail::to("jamesmukumu03@gmail.com")->send($mailer);
            echo "Sent";
        } catch (\Exception $err) {
            echo $err->getMessage();
        }
    }



    public function savePromotionalNewsletters(Request $request)
    {
        try {

            $validatedRequest = $request->validate([
                "hotDiscount" => "required|integer",
                "hotOffer" => "required",
                "Title" => "required|unique:promotional_newsletters,Title",
                "hotOfferDiscount" => "required|min:0",
                "specialDeal" => "required",
                "specialDealDescription" => "required",
                "specialDiscountPrice" => "required|integer"
            ]);
            $validatedRequest["olanka_users_id"] = $this->verificationToken($request);

            $groupedDestinations = [];

            foreach ($request->all() as $key => $value) {
                if ($request->hasFile($key) && preg_match('/^destination([A-Za-z]+)(1|2|3|4|5|6)$/', $key, $matches)) {
                    $cld = new Cloudinary();
                    $fileUrl = $cld->uploadApi()->upload($request->file($key)->getRealPath());
                    $value = $fileUrl["url"];
                    $field = $matches[1];
                    $suffix = $matches[2];
                    $groupedDestinations[$suffix][$field] = $value;
                }

                if (preg_match('/^destination([A-Za-z]+)(1|2|3|4|5)$/', $key, $matches)) {
                    $field = $matches[1];
                    $suffix = $matches[2];


                    $groupedDestinations[$suffix][$field] = $value;
                }
            }


            $placeVisits = [];
            foreach ($groupedDestinations as $suffix => $data) {
                $placeVisits[] = [
                    'destinationTitle' => $data['Title'] ?? null,
                    'destinationDescription' => $data['Description'] ?? null,
                    'destinationImage' => $data['Image'] ?? null,
                    'destinationPrice' => $data['Price'] ?? null
                ];
            }
            $validatedRequest["placesVisit"] = json_encode($placeVisits);
           
            $validatedRequest["promotional_newsletters_Slug"] = Str::slug($validatedRequest["Title"], "_");

            PromotionalNewsletters::create($validatedRequest);
            return response()->json([
                "message" => "created"
            ]);

        } catch (\Exception $err) {
            return response()->json(['error' => $err->getMessage()], 500);
        } catch (ValidationException $errValidate) {
            return response()->json(['errors' => $errValidate->errors()], 422);
        }
    }





    public function UpdatePromotionalNewsletters(Request $request)
    {
        try {
            $validatedRequest = $request->validate([
                "hotDiscount" => "nullable",
                "hotOffer" => "nullable",
                "hotOfferDiscount" => "nullable",
                "specialDeal" => "nullable",
                "specialDealDescription" => "nullable",
                "specialDiscountPrice" => "nullable"
            ]);
            $validatedRequest["olanka_users_id"] = $this->verificationToken($request);
            $promotionalNewsletterid = $request->query("id");
            if ($request->hasFile("destinationImageOne")) {
                $groupedDestinations = [];

                foreach ($request->all() as $key => $value) {
                    if ($request->hasFile($key) && preg_match('/^destination([A-Za-z]+)(One|Two)$/', $key, $matches)) {
                        $cld = new Cloudinary();
                        $fileUrl = $cld->uploadApi()->upload($request->file($key)->getRealPath());
                        $value = $fileUrl["url"];
                        $field = $matches[1];
                        $suffix = $matches[2];
                        $groupedDestinations[$suffix][$field] = $value;
                    }

                    if (preg_match('/^destination([A-Za-z]+)(One|Two)$/', $key, $matches)) {
                        $field = $matches[1];
                        $suffix = $matches[2];


                        $groupedDestinations[$suffix][$field] = $value;
                    }
                }

                $placeVisits = [];
                foreach ($groupedDestinations as $suffix => $data) {
                    $placeVisits[] = [
                        'destinationTitle' => $data['Title'] ?? null,
                        'destinationDescription' => $data['Description'] ?? null,
                        'destinationImage' => $data['Image'] ?? null,
                        'destinationPrice' => $data['Price'] ?? null
                    ];
                }
                $validatedRequest["placesVisit"] = json_encode($placeVisits);
            }



            PromotionalNewsletters::where("id", $promotionalNewsletterid)->update($validatedRequest);
            return response()->json([
                "message" => "updated"
            ]);

        } catch (\Exception $err) {
            return response()->json(['error' => $err->getMessage()], 500);
        } catch (ValidationException $errValidate) {
            return response()->json(['errors' => $errValidate->errors()], 422);
        }
    }



    public function sendNewsLettersPromotional(Request $request)
    {
        try {
            $validatedRequest = $request->validate([
                "newsLetterTemplate" => "required|integer",
                "destinations" => "required|min:1"
            ]);
            $newsLetterTemp = PromotionalNewsletters::find($validatedRequest['newsLetterTemplate']);
            $placesData = json_decode($newsLetterTemp["placesVisit"], true);

            $mailerCont = new MailPromotionalAlerts($newsLetterTemp, $placesData);
            $mailsTarget = explode(",", $validatedRequest["destinations"]);
            foreach ($mailsTarget as $dest) {
                Mail::to($dest)->send($mailerCont);
                $bulkMailerLoad = BulkMails::where("email", $dest)->first();
                if (!$bulkMailerLoad) {
                    return response()->json([
                        "message" => "Email target not found in BulkMails"
                    ], 404);
                }

                $userID = $this->verificationToken($request);
                $idBulk = $bulkMailerLoad->id;
                $mailerSaverLoad = [
                    "status" => "delivered",
                    "olanka_users_id" => $userID,
                    "bulk_mails_id" => $idBulk
                ];
                MailStatus::create($mailerSaverLoad);
            }
            return response()->json([
                "message" => "Emails propagated"
            ]);

        } catch (\Illuminate\Validation\ValidationException $errValidate) {
            Log::error($errValidate->getMessage());
            return response()->json([
                "message" => $errValidate->getMessage()
            ]);
        } catch (\Exception $err) {
            echo $err->getMessage();
        }
    }










    public function fetchMyTemplates(Request $request)
    {
        try {
            $olankaid = $this->verificationToken($request);
            $data = PromotionalNewsletters::where("olanka_users_id", $olankaid)->get();
            if (count($data) > 0) {
                return response()->json([
                    "message" => "Fetched",
                    "data" => $data
                ]);
            } else {
                return response()->json([
                    "message" => "You have no templates saved"
                ]);
            }
        } catch (\Exception $err) {
            return response()->json([
                "message" => $err->getMessage()
            ]);
        }
    }


    public function deleteNewsLetterTemplateMail(Request $request)
    {
        try {
            $validatedRequest = $request->validate([
                "id" => "required|integer|exists:promotional_newsletters,id"
            ]);
            $newsletterid = $request->query('id');
            PromotionalNewsletters::where("id", $newsletterid)->delete();
            return response()->json([
                "message" => "Deleted"
            ]);
        } catch (\Exception $err) {
            return response()->json([
                "message" => $err->getMessage()
            ], 500);
        }
    }










    public function previewPromotional(Request $request)
    {
        try {

            $validatedRequest = $request->validate([
                "hotDiscount" => "nullable|integer",
                "hotOffer" => "nullable",
                "hotOfferDiscount" => "nullable",
                "specialDeal" => "nullable",
                "specialDealDescription" => "nullable",
                "specialDiscountPrice" => "nullable"
            ]);
            $groupedDestinations = [];
            foreach ($request->all() as $key => $value) {
                if ($request->hasFile($key) && preg_match('/^destination([A-Za-z]+)(1|2|3|4|5|6)$/', $key, $matches)) {
                    $cld = new Cloudinary();
                    $fileUrl = $cld->uploadApi()->upload($request->file($key)->getRealPath());
                    $value = $fileUrl["url"];
                    $field = $matches[1];
                    $suffix = $matches[2];
                    $groupedDestinations[$suffix][$field] = $value;
                }

                if (preg_match('/^destination([A-Za-z]+)(1|2|3|4|5)$/', $key, $matches)) {
                    $field = $matches[1];
                    $suffix = $matches[2];


                    $groupedDestinations[$suffix][$field] = $value;
                }
            }


            $placeVisits = [];
            foreach ($groupedDestinations as $suffix => $data) {
                $placeVisits[] = [
                    'destinationTitle' => $data['Title'] ?? null,
                    'destinationDescription' => $data['Description'] ?? null,
                    'destinationImage' => $data['Image'] ?? null,
                    'destinationPrice' => $data['Price'] ?? null
                ];
                }
              $promotionalContent = [$validatedRequest];
              return view("promotionalNewsLetter", ["promotionalContent" => (object)$validatedRequest, "placesVisit" => $placeVisits]);

           
        } catch (\Exception $err) {
         return response()->json([
         "message"=>$err->getMessage()
         ],500);

        }}




        public function promotional_newsletters_Csv(Request $request){
            try {
                $validation = $request->validate([
                    "newsletters_csv" => "required"
                ]);
        
                $csvFile = $request->file("newsletters_csv");
                $contentsFile = fopen($csvFile->getRealPath(), "r");
        
                $datacont = [];
                $headers = fgetcsv($contentsFile, 1000, ","); 
        
                while (($data = fgetcsv($contentsFile, 1000, ",")) !== false) {
                    $datacont[] = array_combine($headers, $data); 
                }
        
                fclose($contentsFile);
             
                PromotionalNewsletters::insert($datacont);
            
        
                return response()->json([
                    "message" => "Promotional Newsletters Saved",
                
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
        





}
