<?php

namespace App\Listeners;

use App\Events\EmailSaver;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
     
class Saver{
public function __construct(){
    
}

   
    public function handle(EmailSaver $event): void{
    try{
    $event->mailStatus->save();
   }catch(\Exception $err){
    echo $err->getMessage();
    }

    }
}
