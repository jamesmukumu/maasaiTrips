<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NewsLettersMailer extends Mailable{
    public $content;
    use Queueable, SerializesModels;
public function __construct($content){
        $this->content = $content;
    }

    
    public function envelope(): Envelope{
        return new Envelope(
            subject: 'News Letters Mailer',
        );
    }

    
    public function content(): Content{
        return new Content(
            view: 'newsletter',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array{
        return [];
    }
}
