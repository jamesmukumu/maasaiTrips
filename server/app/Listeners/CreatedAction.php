<?php

namespace App\Listeners;

use App\Events\ActionRequired;
use App\Mail\MailerCreaterUpdate;
use App\Models\OlankaUsers;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Mail;

class CreatedAction {
    
    public function handle(ActionRequired $event): void {
      $superAdmins = OlankaUsers::where("superUser",true)->get();
       $adminData = OlankaUsers::find($event->entity["users_id"]);
        foreach ($superAdmins as $user) {
            Mail::to($user["Email"])->send(new MailerCreaterUpdate($event->entity['tableName'],$event->entity["entityReferenceName"],$user["userName"],$adminData['userName']));
        }
    }
}
