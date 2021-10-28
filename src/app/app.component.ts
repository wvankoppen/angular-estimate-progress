import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
  <button (click)="next()">Next step</button>
  <ng-container *ngIf="steps | estimateProgress: currentStep | async as s">
    Current step: {{ s.currentStep }} Total progress:
    {{ s.totalEstimatedProgress | percent }}
  </ng-container>
  `,
})
export class AppComponent {
  currentStep = 0;
  steps = [
    { name: 'First step', expectedDuration: 5000 },
    { name: 'Second step', target: 'second target', expectedDuration: 2500 },
    { name: 'Third step', expectedDuration: 2500 },
    { name: 'Fourth step (final)', expectedDuration: 10000 },
  ];

  next() {
    this.currentStep++;
  }
}
