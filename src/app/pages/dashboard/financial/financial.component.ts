import { UserService } from './../../../core/service/user.service';
import { PaymentService } from './../../../core/service/payment.service';
import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../../shared/table/table.component';
import { Payment } from './Fiancial';
import { User } from '../../../core/models/User';
import { forkJoin } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ColumnsTable } from '../../../../shared/table/Table';

@Component({
  selector: 'app-financial',
  standalone: true,
  imports: [
    MatIconModule,
    TableComponent,
    MatCardModule
  ],
  templateUrl: './financial.component.html',
  styleUrl: './financial.component.scss'
})
export class FinancialComponent implements OnInit {

  displayedColumnsTableUser = [
    { columnName: 'Vencimento', tableColumn: 'maturity', mask: 'date' },
    { columnName: 'Data Pagamento', tableColumn: 'paymentDate', mask: 'date' },
    { columnName: 'Forma de Pagamento', tableColumn: 'formPayment' },
    { columnName: 'Valor Pago', tableColumn: 'valuePayment', mask: 'currency' }
  ] as ColumnsTable[];
  paymentsUsers!: Payment[];
  user!: User;

  constructor(
    private paymentService: PaymentService,
    private userService: UserService
  ){}

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage(): void{
    forkJoin({
      user: this.userService.getUser(),
      paymentsUsers: this.paymentService.getAllMyPayment()
    }).subscribe(response => {
      this.user = response.user;
      this.paymentsUsers = response.paymentsUsers;
    })
  }
}
