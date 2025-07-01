<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Attachment;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class MailerInvoices extends Mailable
{
    use Queueable, SerializesModels;
   public $storagePath;
    
    public function __construct($storePath){
     $this->storagePath = $storePath;
    }

    
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Invoice Alert',
        );
    }

   
    public function content(): Content
    {
        return new Content(
            view: 'AlertInvoice',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [
            Attachment::fromPath($this->storagePath)
        ];
    }
}
