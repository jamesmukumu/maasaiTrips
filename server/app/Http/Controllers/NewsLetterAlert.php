<?php

namespace App\Http\Controllers;

use App\Mail\MailNewsLEtterAlerts;
use Illuminate\Http\Request;
use App\Models\NewsletterAlerts;
use Cloudinary\Cloudinary;
use Str;
use Tymon\JWTAuth\Facades\JWTAuth;
use Log;
use Mail;
use App\Models\BulkMails;
use App\Models\MailStatus;
use Dotenv\Exception\ValidationException;


interface NewsAlertInterface{
public function verifyTok(Request $request);
}

class PageOneNewsletter
{
    public $Title;
    public $Image;

    public $FinalContent;
    public function __construct($Title, $Image, $FinalContent)
    {
        $this->Title = $Title;
        $this->Image = $Image;
        $this->FinalContent = $FinalContent;
    }
}
class NewsLetterAlert extends Controller implements NewsAlertInterface
{
    public function verifyTok(Request $request)
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


    public function saveNewsLetterAlert(Request $request)
    {
        try {
            $id = $this->verifyTok($request);
            $validatedRequest = $request->validate([
                "Title" => "required|unique:newsletter_alerts,Title",
                "TitleOne" => "required",
                "FinalContentOne" => "required",
                "TitleTwo" => "required",
                "FinalContentTwo" => "required",
                "TitleThree" => "required",
                "FinalContentThree" => "required",
                "TitleFour" => "required",
                "FinalContentFour" => "required",
                "imageOne" => "required|file",
                "imageTwo" => "required|file",
                "imageThree" => "required|file",
                "imageFour" => "required|file"
            ]);

            $cld = new Cloudinary();
            $imageOneUrl = $cld->uploadApi()->upload($request->file("imageOne")->getRealPath());
            $imageTwoUrl = $cld->uploadApi()->upload($request->file("imageTwo")->getRealPath());
            $imageThreeUrl = $cld->uploadApi()->upload($request->file("imageThree")->getRealPath());
            $imageFourUrl = $cld->uploadApi()->upload($request->file("imageFour")->getRealPath());

            $newsLetterSave = [
                "Title" => $validatedRequest["Title"],
                "TitleOne" => $validatedRequest["TitleOne"],
                "imageOne" => $imageOneUrl["url"],
                "FinalContentOne" => $validatedRequest["FinalContentOne"],
                "olanka_users_id" => $id,



                "TitleTwo" => $validatedRequest["TitleTwo"],
                "imageTwo" => $imageTwoUrl["url"],
                "FinalContentTwo" => $validatedRequest["FinalContentTwo"],

                "TitleThree" => $validatedRequest["TitleThree"],
                "imageThree" => $imageThreeUrl["url"],
                "FinalContentThree" => $validatedRequest["FinalContentThree"],

                "TitleFour" => $validatedRequest["TitleFour"],
                "imageFour" => $imageFourUrl["url"],
                "FinalContentFour" => $validatedRequest["FinalContentFour"],
            ];
            $newsLetterSave["alert_newsletters_Slug"] =  Str::slug($validatedRequest["Title"]);
           
            NewsletterAlerts::create($newsLetterSave);
            return response()->json([
                "message" => "NewsLetter Saved"
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "message" => $e->getMessage()
            ]);
        }
    }






    public function sendNewsLetters(Request $request)
    {
        try {
            $validatedRequest = $request->validate([
                "newsLetterTemplate" => "required|integer",
                "destinations" => "required|min:1"
            ]);
            $newsLetterTemp = NewsletterAlerts::find($validatedRequest["newsLetterTemplate"]);

            $pageNewsLetter = new PageOneNewsletter(
                $newsLetterTemp["TitleOne"],
                $newsLetterTemp["imageOne"],
                $newsLetterTemp["FinalContentOne"]
            );
            $pageNewsLetterTwo = new PageOneNewsletter(
                $newsLetterTemp["TitleTwo"],
                $newsLetterTemp["imageTwo"],
                $newsLetterTemp["FinalContentTwo"]
            );
            $pageNewsLetterThree = new PageOneNewsletter(
                $newsLetterTemp["TitleThree"],
                $newsLetterTemp["imageThree"],
                $newsLetterTemp["FinalContentThree"]
            );
            $pageNewsLetterFour = new PageOneNewsletter(
                $newsLetterTemp["TitleFour"],
                $newsLetterTemp["imageFour"],
                $newsLetterTemp["FinalContentFour"]
            );


            $mailsTarget = explode(",", $validatedRequest["destinations"]);

            foreach ($mailsTarget as $dest) {
                $mailerTest = app(MailNewsLEtterAlerts::class, ["contentPageone" => $pageNewsLetter, "contentPagetwo" => $pageNewsLetterTwo, "contentPagethree" => $pageNewsLetterThree, "contentPagefour" => $pageNewsLetterFour]);
                Mail::to($dest)->send($mailerTest);
                $bulkMailerLoad = BulkMails::where("email", $dest)->first();
                if (!$bulkMailerLoad) {
                    return response()->json([
                        "message" => "Email target not found in BulkMails"
                    ], 404);
                }

                $userID = $this->verifyTok($request);
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




    public function updateNewsLetterAlerts(Request $request) {
        try {
            $validatedRequest = $request->validate([
                "Title" => "nullable",
                "TitleOne" => "nullable",
                "FinalContentOne" => "nullable",
                "TitleTwo" => "nullable",
                "FinalContentTwo" => "nullable",
                "TitleThree" => "nullable",
                "FinalContentThree" => "nullable",
                "TitleFour" => "nullable",
                "FinalContentFour" => "nullable",
                "imageOne" => "nullable|file",
                "imageTwo" => "nullable|file",
                "imageThree" => "nullable|file",
                "imageFour" => "nullable|file",
            ]);
    
            $cld = new Cloudinary();
            $imageFields = ["imageOne", "imageTwo", "imageThree", "imageFour"];
    
            foreach ($imageFields as $imageField) {
                if ($request->hasFile($imageField)) {
                    $imageMetaData = $cld->uploadApi()->upload($request->file($imageField)->getRealPath());
                    $validatedRequest[$imageField] = $imageMetaData["url"];
                }
            }
    
            $newsLetterID = $request->query("id");
            $newsletter = NewsletterAlerts::find($newsLetterID);
    
            if (!$newsletter) {
                return response()->json(["message" => "Newsletter non existent"], 404);
            }
            $newsletter->update($validatedRequest);
            return response()->json(["message" => "Template Updated"], 200);
        } catch (\Exception $err) {
            return response()->json(["message" => $err->getMessage()], 200);
        }
    }
    





        public function fetchMyTemplates(Request $request){
        try{
        $olankaid = $this->verifyTok($request);
        $data = NewsletterAlerts::where("olanka_users_id",$olankaid)->get();
        if(count($data)> 0 ){
        return response()->json([
                "message"=>"Fetched",
                "data"=>$data
                ]);
        }else{
        return response()->json([
        "message"=>"You have no templates saved"
        ]);
        }
        }catch(\Exception $err){
        return response()->json([
        "message"=>$err->getMessage()
        ]);
        }
        }
        public function deleteNewsLetterTemplateMail(Request $request){
        try{
        $validatedRequest = $request->validate([
        "id"=>"required|integer|exists:newsletter_alerts,id"
        ]);
        $newsletterid = $request->query('id');
        NewsletterAlerts::where("id",$newsletterid)->delete();
        return response()->json([
        "message"=>"Deleted"
        ]);        
        }catch(\Exception $err){
        return response()->json([
        "message"=>$err->getMessage()
        ],500);
        }
        }


public function previewAlerts(Request $request){
try{
    
    $validatedRequest = $request->validate([
      
        "TitleOne" => "nullable",
        "FinalContentOne" => "nullable",
        "TitleTwo" => "nullable",
        "FinalContentTwo" => "nullable",
        "TitleThree" => "nullable",
        "FinalContentThree" => "nullable",
        "TitleFour" => "nullable",
        "FinalContentFour" => "nullable",
        "imageOne" => "nullable|file",
        "imageTwo" => "nullable|file",
        "imageThree" => "nullable|file",
        "imageFour" => "nullable|file"
    ]);

    $cld = new Cloudinary();
    if($request->hasFile("imageOne")){
        $imageOneUrl = $cld->uploadApi()->upload($request->file("imageOne")->getRealPath());

    }else if($request->hasFile("imageTwo")){
        $imageTwoUrl = $cld->uploadApi()->upload($request->file("imageTwo")->getRealPath());
    }else if($request->hasFile("imageThree")){
        $imageThreeUrl = $cld->uploadApi()->upload($request->file("imageThree")->getRealPath());
    }else if($request->hasFile("imageFour")){
    $imageFourUrl = $cld->uploadApi()->upload($request->file("imageFour")->getRealPath());
    }
  
    $newsLetterSave = [
        
        "TitleOne" => $validatedRequest["TitleOne"] ?? null,
        "imageOne" => $imageOneUrl["url"] ?? null,
        "FinalContentOne" => $validatedRequest["FinalContentOne"] ?? null,
    



      "TitleTwo" => $validatedRequest["TitleTwo"] ?? null,
        "imageTwo" => $imageTwoUrl["url"] ?? null,
        "FinalContentTwo" => $validatedRequest["FinalContentTwo"] ?? null,

        "TitleThree" => $validatedRequest["TitleThree"] ?? null,
        "imageThree" => $imageThreeUrl["url"] ?? null,
        "FinalContentThree" => $validatedRequest["FinalContentThree"] ?? null,

        "TitleFour" => $validatedRequest["TitleFour"] ?? null,
        "imageFour" => $imageFourUrl["url"] ?? null,
        "FinalContentFour" => $validatedRequest["FinalContentFour"] ?? null,
    ];

    
    $pageNewsLetter = new PageOneNewsletter(
        $newsLetterSave["TitleOne"],
        $newsLetterSave["imageOne"],
        $newsLetterSave["FinalContentOne"]
    );
    $pageNewsLetterTwo = new PageOneNewsletter(
        $newsLetterSave["TitleTwo"],
        $newsLetterSave["imageTwo"],
        $newsLetterSave["FinalContentTwo"]
    );
    $pageNewsLetterThree = new PageOneNewsletter(
        $newsLetterSave["TitleThree"],
        $newsLetterSave["imageThree"],
        $newsLetterSave["FinalContentThree"]
    );
    $pageNewsLetterFour = new PageOneNewsletter(
        $newsLetterSave["TitleFour"],
        $newsLetterSave["imageFour"],
        $newsLetterSave["FinalContentFour"]
    );
    return view("newsletterTemplate1",["contentPageOne" => $pageNewsLetter, "contentPageTwo" => $pageNewsLetterTwo, "contentPageThree" => $pageNewsLetterThree, "contentPageFour" => $pageNewsLetterFour]);

}catch(\Exception $err){
echo $err->getMessage();
}



}






public function previewAlertsReady(Request $request){
    try{
        
        $validatedRequest = $request->validate([
          
            "TitleOne" => "required",
            "FinalContentOne" => "required",
            "TitleTwo" => "required",
            "FinalContentTwo" => "required",
            "TitleThree" => "required",
            "FinalContentThree" => "required",
            "TitleFour" => "required",
            "FinalContentFour" => "required",
            "imageOne" => "required",
            "imageTwo" => "required",
            "imageThree" => "required",
            "imageFour" => "required"
        ]);
    
    
    
       
     $newsLetterSave = [
            
            "TitleOne" => $validatedRequest["TitleOne"] ?? null,
            "imageOne" => $validatedRequest["imageOne"] ?? null,
            "FinalContentOne" => $validatedRequest["FinalContentOne"] ?? null,
        
    
    
    
          "TitleTwo" => $validatedRequest["TitleTwo"] ?? null,
            "imageTwo" => $validatedRequest["imageTwo"]  ?? null,
            "FinalContentTwo" => $validatedRequest["FinalContentTwo"] ?? null,
    
            "TitleThree" => $validatedRequest["TitleThree"] ?? null,
            "imageThree" => $validatedRequest["imageThree"]  ?? null,
            "FinalContentThree" => $validatedRequest["FinalContentThree"] ?? null,
    
            "TitleFour" => $validatedRequest["TitleFour"] ?? null,
            "imageFour" => $validatedRequest["imageFour"]  ?? null,
            "FinalContentFour" => $validatedRequest["FinalContentFour"] ?? null,
        ];
    
        
        $pageNewsLetter = new PageOneNewsletter(
            $newsLetterSave["TitleOne"],
            $newsLetterSave["imageOne"],
            $newsLetterSave["FinalContentOne"]
        );
        $pageNewsLetterTwo = new PageOneNewsletter(
            $newsLetterSave["TitleTwo"],
            $newsLetterSave["imageTwo"],
            $newsLetterSave["FinalContentTwo"]
        );
        $pageNewsLetterThree = new PageOneNewsletter(
            $newsLetterSave["TitleThree"],
            $newsLetterSave["imageThree"],
            $newsLetterSave["FinalContentThree"]
        );
        $pageNewsLetterFour = new PageOneNewsletter(
            $newsLetterSave["TitleFour"],
            $newsLetterSave["imageFour"],
            $newsLetterSave["FinalContentFour"]
        );
        return view("newsletterTemplate1",["contentPageOne" => $pageNewsLetter, "contentPageTwo" => $pageNewsLetterTwo, "contentPageThree" => $pageNewsLetterThree, "contentPageFour" => $pageNewsLetterFour]);
    
    }catch(\Exception $err){
    echo $err->getMessage();
    }}
    




    public function Alerts_From_Csv(Request $request){
        try {
            $validation = $request->validate([
                "alert_promotional_csv" => "required"
            ]);
    
            $csvFile = $request->file("alert_promotional_csv");
            $contentsFile = fopen($csvFile->getRealPath(), "r");
    
            $datacont = [];
            $headers = fgetcsv($contentsFile, 1000, ","); 
    
            while (($data = fgetcsv($contentsFile, 1000, ",")) !== false) {
                $datacont[] = array_combine($headers, $data); 
            }
    
            fclose($contentsFile);
         
            NewsletterAlerts::insert($datacont);
        
    
            return response()->json([
                "message" => "Promotional Alerts Saved",
            
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
