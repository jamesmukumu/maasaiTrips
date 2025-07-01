import { Component,OnInit,inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentsService } from '../../services/payments.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-onboard',
  templateUrl: './onboard.component.html',
  styleUrl: './onboard.component.css'
})
export class OnboardComponent {
  readonly snack = inject(MatSnackBar)
firstName = ''
lastName = ''
email = ''
id:any
purchasing = false
messageResponse = ''
constructor(private router:ActivatedRoute,private payments:PaymentsService){}


initiatePay(){
this.purchasing = true
this.payments.initializePayment({
"first_name":this.firstName,
"last_name":this.lastName,
"email":this.email
},
this.id
).then((data:any)=>{
var {message,url} = data
if(message === 'Payment started'){
  this.purchasing = false
window.open(url,"_blank")
let count = 0
var interval = setInterval(()=>{
count += 1
this.verifyPayment()
if(count >= 20 && this.messageResponse != 'Invoice saved to storage and email propagated' ){
this.snack.open(this.messageResponse,"Close")
clearInterval(interval)
}else if (this.messageResponse == 'Invoice saved to storage and email propagated'){
this.snack.open("Payment Processed and invoice sent","Success")
clearInterval(interval)
}
},10000)

}
})
}

verifyPayment(){
this.payments.verifyPayment().then((data)=>{
var {message} = data
if(message == 'Payment aborted' || message == "Something Went Wrong"){
this.messageResponse = message
}else{
this.messageResponse = message
}
})
}
ngOnInit(){
this.router.queryParamMap.subscribe((data)=>{
this.id =  data.get("onboard")
})
}
}
