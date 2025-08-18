import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OnboardingsService } from '../../services/onboardings.service';

interface feedback {
  checkBoxResponse: any;
  textAreaResponse: any;
}
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css',
})
export class FeedbackComponent implements OnInit {
  Feedback: feedback = {
    checkBoxResponse: [],
    textAreaResponse: [].filter(Boolean),
  };
  itemsDummy: any[] = [];

  saveResponse() {
    console.log(this.Feedback);
  }
  captureCheckboxes(event: any, idx: any, ans: any) {
   
    
    if (event.checked) {
      this.Feedback.checkBoxResponse.push(ans);
    } else {
      const idx = this.Feedback.checkBoxResponse.indexOf(ans);
      if (idx > -1) this.Feedback.checkBoxResponse.splice(idx, 1);
    }
   
  }
  getQuestionKeys(item: any): string[] {
    return Object.keys(item).filter((key) =>
      key.toLowerCase().startsWith('question')
    );
  }
  idSelected: any;
  constructor(
    private onboard: OnboardingsService,
    private router: ActivatedRoute
  ) {}
  fetching = false;
  async fetchForm() {
    this.fetching = true;
    try {
      let { data } = await this.onboard.getForm(this.idSelected);
      this.itemsDummy = data.onBoardingQuestionaire.items;
      this.fetching = false;
    } catch (err) {
      console.error(err);
      this.fetching = false;
    }
  }

  async ngOnInit() {
    this.router.paramMap.subscribe((param) => {
      this.idSelected = param.get('feedbackid');
    });
    await this.fetchForm();
  }
}
