<?php

namespace App\Listeners;

use App\Events\ActionRequired;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Models\OlankaUsers;
use Mail;
use App\Mail\MailerUpdateActions;

class UpdateAction{
    
    public function __construct() {

    }

   
    public function handle(ActionRequired $event): void {
        $superAdmins = OlankaUsers::where("superUser",true)->get();
         $adminData = OlankaUsers::find($event->entity["users_id"]);
          foreach ($superAdmins as $user) {
              Mail::to($user["Email"])->send(new MailerUpdateActions($event->entity['tableName'],$event->entity["entityReferenceName"],$user["userName"],$adminData['userName']));
          }
      }
}
