<?php

namespace App\Http\Controllers;

use App\Events\EmailSaver;
use App\Models\BulkMails;
use App\Models\MailStatus;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use App\Mail\MailerSend;
use Dotenv\Exception\ValidationException;
use App\Models\EmailTemplates;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;



interface MailerInterface
{
    public function verifyTok(Request $request);
}


class MailerController extends Controller implements MailerInterface
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







    public function attachFile(Request $request, $mailSub, $mailMess, $destination)
    {
        try {
            $filePath = [];
            $ccEmails = [];
            $attachments = $request->file('attachment');
            if (!is_array($attachments)) {
                $attachments = [$attachments];
            }

            foreach ($attachments as $file) {
                $filePath = $file->store('private');
                $mail = new MailerSend(
                    $mailSub,
                    $mailMess,
                    $filePath
                );

                Mail::to($destination)->send($mail);
                $filePath = null;
            }

        } catch (ValidationException $errValidate) {
            Log::error('Validation error: ' . $errValidate->getMessage());
            return response()->json([
                "message" => "Validation error: " . $errValidate->getMessage()
            ], 422);

        } catch (\Exception $err) {
            Log::error('Error sending email: ' . $err->getMessage());
            return response()->json([
                "message" => "Error sending email: " . $err->getMessage()
            ], 500);
        }
    }



    public function sendMail(Request $request)
    {
        try {
            $validatedRequest = $request->validate([
                "subject" => "required|min:6",
                "message" => "required",
                "emailTarget" => "required|email",
                "attachment" => "nullable|file",
                "ccs" => "nullable|string"
            ]);
            $userID = $this->verifyTok($request);
            $bulkMailerLoad = BulkMails::where("email", $validatedRequest["emailTarget"])->first();
            if (!$bulkMailerLoad) {
                return response()->json([
                    "message" => "Email target not found in BulkMails"
                ], 404);
            }
            $idBulk = $bulkMailerLoad->id;
            $mailerSaverLoad = [
                "status" => "pending",
                "olanka_users_id" => $userID,
                "bulk_mails_id" => $idBulk
            ];

            $mailStatus = MailStatus::create($mailerSaverLoad);

            $filePaths = [];
            $ccEmails = [];
            if (!empty($validatedRequest["ccs"])) {
                $ccEmails = array_filter(explode(",", $validatedRequest["ccs"]));
            }

            if ($request->hasFile("attachment")) {
                $attachments = $request->file("attachment");
                if (!is_array($attachments)) {
                    $attachments = [$attachments];
                }
                foreach ($attachments as $file) {
                    $filePaths[] = $file->store('private');
                }
            }

            $mail = new MailerSend(
                $validatedRequest["subject"],
                $validatedRequest["message"],
                $filePaths
            );

            $mailObject = Mail::to($validatedRequest["emailTarget"]);

            if (!empty($ccEmails)) {
                $mailObject->cc($ccEmails);
            }

            try {
                $mailObject->send($mail);
                $mailStatus->update(["status" => "delivered"]);
                foreach ($ccEmails as $cc) {
                    $ccBulkMailerLoad = BulkMails::where("email", $cc)->first();
                    if ($ccBulkMailerLoad) {
                        MailStatus::create([
                            "status" => "delivered",
                            "olanka_users_id" => $userID,
                            "bulk_mails_id" => $ccBulkMailerLoad->id
                        ]);
                    }
                }

                EmailSaver::dispatch($mailStatus);

                return response()->json([
                    "message" => "Email sent"
                ], 200);
            } catch (\Exception $sendError) {
                Log::error('Error sending email: ' . $sendError->getMessage());

                $mailStatus->update(["status" => "failed"]);

                return response()->json([
                    "message" => "Failed to send email: " . $sendError->getMessage()
                ], 500);
            }
        } catch (ValidationException $errValidate) {
            Log::error('Validation error: ' . $errValidate->getMessage());
            return response()->json([
                "message" => "Validation error: " . $errValidate->getMessage()
            ], 422);
        } catch (\Exception $err) {
            Log::error('Error processing request: ' . $err->getMessage());
            return response()->json([
                "message" => "Error processing request: " . $err->getMessage()
            ], 500);
        }
    }







    public function saveEmailTemplate(Request $request)
    {
        try {
            $tokenHeader = $request->header('Authorization');
            $token = substr($tokenHeader, 7);
            if ($token == '' || $tokenHeader == '') {
                return response()->json([
                    "message" => "Unauthorized"
                ]);
            }


            $validatedRequest = $request->validate([
                "subject" => "required|min:6",
                "mailMessage" => "required",
                "attachments" => "nullable|file"
            ]);
            $tokenLoad = JWTAuth::setToken($token)->getPayload();
            $claims = $tokenLoad->toArray();
            $idUser = $claims['sub'];
            $validatedRequest["olanka_users_id"] = $idUser;


            if ($request->hasFile("attachments")) {
                $validatedRequest["attachments"] = json_encode($validatedRequest["attachments"]);
            }
            $temps = new EmailTemplates();
            $temps->create($validatedRequest);
            return response()->json([
                "message" => "Email template Saved"
            ], 200);

        } catch (\Exception $err) {
            Log::error("err" . $err->getMessage());
            return response()->json([
                "message" => $err->getMessage()
            ], 500);
        } catch (ValidationException $errVal) {
            Log::error($errVal->getMessage());
            return response()->json([
                "message" => $errVal->getMessage()
            ], 200);
        }
    }


    public function updateEmailTemplate(Request $request)
    {
        try {
            $validatedRequest = $request->validate([
                "mailMessage" => "nullable",
                "subject" => "nullable",
                "id" => "integer|required"
            ]);
            $mailID = $request->query("id");
            EmailTemplates::where("id", $mailID)->update($validatedRequest);

            return response()->json([
                "message" => "Template Updated"
            ], 200);
        } catch (\Exception $err) {
            return response()->json([
                "message" => $err->getMessage()
            ], 500);
        }
    }

    public function fetchMyTemplates(Request $request)
    {
        try {
            $olankaid = $this->verifyTok($request);
            $data = EmailTemplates::where("olanka_users_id", $olankaid)->get();
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
    public function deleteTemplateMail(Request $request)
    {
        try {
            $validatedRequest = $request->validate([
                "id" => "required|integer"
            ]);
            $mailID = $request->query('id');
            EmailTemplates::where("id", $mailID)->delete();
            return response()->json([
                "message" => "Deleted"
            ]);
        } catch (\Exception $err) {
            return response()->json([
                "message" => $err->getMessage()
            ], 500);
        }
    }









}