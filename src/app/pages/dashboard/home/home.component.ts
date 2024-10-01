import { Component } from '@angular/core';
import { PaymentService } from '../../../core/service/payment.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(
    private paymentService: PaymentService,
  ){
    this.paymentService.getAllMyPayment().subscribe(() => {})
  }

}
