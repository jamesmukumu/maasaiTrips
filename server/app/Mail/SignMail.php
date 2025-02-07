<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SignMail extends Mailable
{
    use Queueable, SerializesModels;
    public $tokenString;
     public $user;
     
    public function __construct($user,$tokenString){
    $this->user = $user;
    $this->tokenString = $tokenString;
    }

    /**
     * Get the message envelope.
     */
   

     public function build(){
     return $this->subject("Welcome")->view('sample1');
     }
    

    
   

    /**
     * Get the attachments for the message.
     *
     * @return array<int, 
     */
    public function attachments(): array
    {
        return [];
    }
}
