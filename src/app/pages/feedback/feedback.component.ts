import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OnboardingsService } from '../../services/onboardings.service';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent implements OnInit {

  
  itemsDummy:any[] = [
    {
        "answers": [
            "Good",
            "Poor",
            "satisfactory"
        ],
        "questionOne": "What are the expectations"
    },
    {
      "answers": [
          "A",
          "B"
      ],
      "questionTwo": "What are the expectations"
  },
  {
    "answers": [
        "A",
        "B"
    ],
    "questionThree": "What are the expectations"
},

]


getQuestionKeys(item: any): string[] {
  return Object.keys(item).filter(key => key.toLowerCase().startsWith('question'));
}
idSelected:any
constructor(private onboard:OnboardingsService,private router:ActivatedRoute){}
fetching = false
async fetchForm(){
this.fetching = true
try{
let {data} = await this.onboard.getForm(this.idSelected)
this.itemsDummy = data.onBoardingQuestionaire.items
this.fetching = false
}catch(err){
console.error(err)
this.fetching = false
}
}


async ngOnInit(){
this.router.paramMap.subscribe((param)=>{
this.idSelected = param.get("feedbackid")

})
await this.fetchForm()
}


}
