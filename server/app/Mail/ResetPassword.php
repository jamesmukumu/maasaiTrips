<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ResetPassword extends Mailable{
    use Queueable, SerializesModels;

     public $userInfo;
     public $tokenString;
    public function __construct($userInfo,$tokenString){
       $this->userInfo = $userInfo;
       $this->tokenString  = $tokenString;

    }
   public function build(){
   return $this->subject("Password Reset Request")->view("resetPassword");
   }

      
  

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
