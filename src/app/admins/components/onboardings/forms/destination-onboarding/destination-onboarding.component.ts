import { Component, OnInit,inject } from '@angular/core';
import { HotelsService } from '../../../../../services/hotels.service';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OnboardingsService } from '../../../../../services/onboardings.service';
interface onboarding {
  onboardingType: string;
  id?: number;
  destinationTarget?: any;
  questionaire: {
    items: {
      questionOne: string;
      answers: string[];
    }[];
  };
  clientsCredential?: {
    name: string;
    email: string;
    phoneNumber: string;
  }[];
}

@Component({
  selector: 'app-destination-onboarding',
  templateUrl: './destination-onboarding.component.html',
  styleUrls: ['./destination-onboarding.component.css'],
  providers:[provideNativeDateAdapter()]
})
export class DestinationOnboardingComponent implements OnInit {
  readonly snack = inject(MatSnackBar)
  Onboarding: onboarding = {
    onboardingType: 'destinations',
    clientsCredential: [
     
      {
        name: '',
        email: '',
        phoneNumber: ''
      }
    ],
    questionaire: {
      items: [],
    },
  };

  dests: any[] = [];
  fetching = false;

  constructor(private destinations: HotelsService,private onboard:OnboardingsService) {}

  async ngOnInit() {
    await this.fetchDestinations();
  }

  fetchDestinations() {
    this.fetching = true;
    this.destinations
      .fetchDestinations()
      .then((data: any) => {
        this.dests = data;
        this.fetching = false;
      })
      .catch((err) => {
        console.error(err);
        this.fetching = false;
      });
  }

  addClient() {
    this.Onboarding.clientsCredential?.push({
      name: '',
      email: '',
      phoneNumber: '',
    });
  }

  removeClient(index: number) {
    this.Onboarding.clientsCredential?.splice(index, 1);
  }

  addQuestion() {
    this.Onboarding.questionaire?.items.push({
      questionOne: '',
      answers: [],
    });
  }
removeQuestion() {
    this.Onboarding.questionaire?.items.pop();
  }
  addAnswer(event: any, index: number) {
    const input = event.input;
    const value = event.value?.trim();

    if (value) {
      this.Onboarding.questionaire?.items[index].answers.push(value);
    }

    if (input) {
      input.value = '';
    }
  }

  removeAnswer(index: number, answer: string) {
    const answers = this.Onboarding.questionaire?.items[index].answers;
    if (answers) {
      const i = answers.indexOf(answer);
      if (i >= 0) {
        answers.splice(i, 1);
      }
    }
  }
startDate:any
endDate:any
  seeStartDate(event:any){
    var {value} = event
    this.startDate = new Date(value)
    }

    endStartDate(event:any){
      var {value} = event
      this.endDate = new Date(value)
      }
      saving = false
  save(){
this.saving = true
this.onboard.saveOnboarding(
    {
      "onboarding_type":"destinations",
      "destination_id":this.Onboarding.destinationTarget.id,
      "onBoardingQuestionaire":{
      "items":this.Onboarding.questionaire.items
      
      },
      "clientsCredential":this.Onboarding.clientsCredential,
      "startDate":this.startDate,
      "endDate":this.endDate,
      "onboardingTitle":"Some title"
      }


  ).then((data:any)=>{
 if(data.message  === "onboarding set"){
  this.snack.open("Saved","Onboarding Saved")
  this.saving = false
 }else{
  this.snack.open("Failed",data.message)
  this.saving = false
 }

  }).catch((err)=>{

  this.snack.open("Failed","Something has gone wrong")
  console.error(err)
  this.saving = false
  })
  }

}