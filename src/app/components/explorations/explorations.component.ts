import { Component } from '@angular/core';
import { trigger, state, style, transition, animate, AnimationEvent } from '@angular/animations';

@Component({
  selector: 'app-explorations',
  templateUrl: './explorations.component.html',
  styleUrls: ['./explorations.component.css'],
  animations: [
    trigger('fadeAnimation', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('visible => hidden', animate('1000ms ease-out')),
      transition('hidden => visible', animate('1000ms ease-in'))
    ])
  ]
})
export class ExplorationsComponent {
  block_quotes = [
    {
      creator: "Safari Enthusiast",
      block: "Witnessing the Great Migration in the Maasai Mara was a once-in-a-lifetime experience. Thousands of wildebeest and zebras moved together across the plains—it felt like watching nature’s greatest spectacle."
    },
    {
      creator: "Wildlife Photographer",
      block: "The golden sunsets in the Mara are unmatched. I captured lions resting under acacia trees, elephants marching across the horizon, and cheetahs sprinting through the grasslands—it’s paradise for photographers."
    },
    {
      creator: "Traveler’s Journal",
      block: "Spending time with the Maasai community gave me a deeper appreciation for their traditions and connection to the land. The Mara isn’t just about wildlife—it’s about culture and heritage too."
    }
  ];

  currentIndex = 0;
  state: 'visible' | 'hidden' = 'visible';

  constructor() {
    this.startRotation();
  }

  startRotation() {
    setTimeout(() => {
      this.state = 'hidden';
    }, 5000); // Initial display time
  }

  onFadeDone(event: AnimationEvent) {
    if (event.toState === 'hidden') {
      // After fade out, change the quote and fade in
      this.currentIndex = (this.currentIndex + 1) % this.block_quotes.length;
      this.state = 'visible';
    } else if (event.toState === 'visible') {
      // After fade in, start the timer for the next fade out
      setTimeout(() => {
        this.state = 'hidden';
      }, 5000);
    }
  }
}