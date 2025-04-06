import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { StoreService } from '../../../../core/service/store.service';
import { GenreicD } from '../../../../core/models/Generic';
import { MatStepperModule } from '@angular/material/stepper';
import { Sale } from '../../../../core/models/Sale';
import { MatCardModule } from '@angular/material/card';
import { Form } from '../../../../core/modules/input.module';
import { FormControl } from '@angular/forms';
import { SaleService } from '../../../../core/service/sale.service';

@Component({
  selector: 'app-sale-status',
  standalone: true,
  imports: [
    MatStepperModule,
    MatDialogModule,
    Form
  ],
  templateUrl: './sale-status.component.html',
  styleUrl: './sale-status.component.scss'
})
export class SaleStatusComponent {

  statusSale: GenreicD[]= [
    {
      id: 0,
      description: "Pedido Solicitado"
    },
    {
      id: 1,
      description: "Pagamento Efetuado"
    },
    {
      id: 2,
      description: "Preparando Pedido"
    },
    {
      id: 3,
      description: "Saiu para entrega"
    },
    {
      id: 4,
      description: "Pedido entregue"
    },
  ];
  statusId = new FormControl();
  idStepper!: number;

  constructor(
    public dialogRef: MatDialogRef<SaleStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public sale: Sale,
    private saleService: SaleService,
  ){
    this.idStepper = this.sale.deliveryStatus;

    this.statusId.valueChanges.subscribe(value=> {
      this.saleService.putDeliveryStatus({numberSale: this.sale.numberSale, statusId: value}).subscribe(valueS => {
        this.sale.deliveryStatus = valueS.value.deliveryStatus;
        setTimeout(() => {
          this.idStepper = valueS.value.deliveryStatus;
        }, 0);
      })
    })
  }

}
