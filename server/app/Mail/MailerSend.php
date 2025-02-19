<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Queue\SerializesModels;

class MailerSend extends Mailable
{
    use Queueable, SerializesModels;

    public $subject;
    public $attachmentPath;
    public $msg;

    public function __construct($subject, $msg, $attachmentPath)
    {
        $this->subject = $subject;
        $this->msg = $msg;
        $this->attachmentPath = $attachmentPath;
    }

    public function build()
    {
        return $this->subject($this->subject)
                    ->view('emailSend');
    }

    public function attachments(): array
    {
        $attachments = [];
    
        if (is_array($this->attachmentPath)) {
            foreach ($this->attachmentPath as $path) {
                $attachments[] = Attachment::fromStorage($path);
            }
        } elseif ($this->attachmentPath) {
            $attachments[] = Attachment::fromStorage($this->attachmentPath);
        }
    
        return $attachments;
    }
}