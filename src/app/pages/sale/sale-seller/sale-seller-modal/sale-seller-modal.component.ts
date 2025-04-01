import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Sale } from '../../../../core/models/Sale';
import { SaleViewInfoComponent } from "../../sale-view/sale-view-info/sale-view-info.component";
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-sale-seller-modal',
  standalone: true,
  imports: [
    SaleViewInfoComponent,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './sale-seller-modal.component.html',
  styleUrl: './sale-seller-modal.component.scss'
})
export class SaleSellerModalComponent {

  constructor(
    public dialogRef: MatDialogRef<SaleSellerModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Sale,
  ) {}

}
