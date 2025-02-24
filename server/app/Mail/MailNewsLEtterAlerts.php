<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class MailNewsLEtterAlerts extends Mailable{
    use Queueable, SerializesModels;

    public  $contentPageOne;
  public $contentPageTwo;
  public $contentPageThree;
  public $contentPageFour;
  public function __construct($contentPageone,$contentPagetwo,$contentPagethree,$contentPagefour){
    $this->contentPageOne = $contentPageone;
    $this->contentPageTwo = $contentPagetwo;
    $this->contentPageThree = $contentPagethree;
    $this->contentPageFour = $contentPagefour;

}

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Newsletter Alerts',
        );
    }

   
    public function content(): Content
    {
        return new Content(
            view: 'newsletterTemplate1',
        );
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
