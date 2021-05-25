import { Component, Input } from '@angular/core';

export interface CheckoutSteps {
  step1: boolean;
  step2: boolean;
  step3: boolean;
  step4: boolean;
}

@Component({
  selector: 'app-checkout-steps',
  templateUrl: './checkout-steps.component.html',
  styleUrls: ['./checkout-steps.component.css'],
})
export class CheckoutStepsComponent {
  @Input() steps: CheckoutSteps;
}
