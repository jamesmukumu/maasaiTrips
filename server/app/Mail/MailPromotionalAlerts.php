<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class MailPromotionalAlerts extends Mailable
{
    use Queueable, SerializesModels;

  public $promotionalContent;
  public $placesVisit;
    public function __construct($contentPromotional,$places){
    $this->promotionalContent = $contentPromotional;
    $this->placesVisit = $places;
    }

   
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Mail Promotional Alerts',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'promotionalNewsLetter',
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
