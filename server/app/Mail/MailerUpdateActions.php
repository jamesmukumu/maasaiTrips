<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class MailerUpdateActions extends Mailable{
    use Queueable, SerializesModels;
    public $entityName;
    public $tableName;
    public $adminName;
    public $superAdminName;

    public function __construct($tableName,$entityName,$superAdminName,$adminName){
        $this->tableName = $tableName;
        $this->entityName = $entityName;
        $this->adminName = $adminName;
        $this->superAdminName = $superAdminName;
        }
    
    public function envelope(): Envelope {
        return new Envelope(
            subject: 'Updates Alert',
        );
    }

   
    public function content(): Content
    {
        return new Content(
            view: 'UpdateAction',
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
