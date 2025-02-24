<?php

namespace App\Http\Controllers;

use App\Mail\MailNewsLEtterAlerts;
use Illuminate\Http\Request;
use App\Models\NewsletterAlerts;
use Cloudinary\Cloudinary;
use Tymon\JWTAuth\Facades\JWTAuth;
use Log;
use Mail;
use App\Models\BulkMails;
use App\Models\MailStatus;



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





    public function updateNewsLetterAlerts(Request $request)
    {
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
                "imageOne" => "nullable",
                "imageTwo" => "nullable",
                "imageThree" => "nullable",
                "imageFour" => "nullable",

            ]);
            $cld = new Cloudinary();
            if ($request->hasFile("imageOne")) {
                $imageMetaData = $cld->uploadApi()->upload($request->file("imageOne")->getRealPath());
                $validatedRequest["imageOne"] = $imageMetaData["url"];
            } else if ($request->hasFile("imageTwo")) {
                $imageMetaData = $cld->uploadApi()->upload($request->file("imageTwo")->getRealPath());
                $validatedRequest["imageTwo"] = $imageMetaData["url"];
            } else if ($request->hasFile("imageThree")) {
                $imageMetaData = $cld->uploadApi()->upload($request->file("imageThree")->getRealPath());
                $validatedRequest["imageThree"] = $imageMetaData["url"];
            } else if ($request->hasFile("imageFour")) {
                $imageMetaData = $cld->uploadApi()->upload($request->file("imageFour")->getRealPath());
                $validatedRequest["imageFour"] = $imageMetaData["url"];
            }
            $newsLetterID = $request->query("id");
            if (!NewsletterAlerts::find($newsLetterID)) {
                return response()->json([
                    "message" => "Newsletter non existent"
                ]);
            }
            NewsletterAlerts::where("id", $newsLetterID)->update($validatedRequest);

            return response()->json([
                "message" => "Template Updated"
            ], 200);
        } catch (\Exception $err) {
            return response()->json([
                "message" => $err->getMessage()
            ], 500);
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
        "id"=>"required|integer|exists:news_letters,id"
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



}
