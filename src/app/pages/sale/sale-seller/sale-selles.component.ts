import { Component, OnInit } from '@angular/core';
import { Form } from '../../../core/modules/input.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SaleService } from '../../../core/service/sale.service';
import { TableComponent } from '../../../../shared/table/table.component';
import { ColumnsTable } from '../../../../shared/table/Table';
import { PaymentMehod, Sale } from '../../../core/models/Sale';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { SaleSellerModalComponent } from './sale-seller-modal/sale-seller-modal.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sale-selles',
  standalone: true,
  imports: [
    Form,
    TableComponent,
  ],
  templateUrl: './sale-selles.component.html',
  styleUrl: './sale-selles.component.scss'
})
export class SaleSellesComponent implements OnInit {

  formNumberSeller!: FormGroup;

  displayedColumnsTableSales = [
    { columnName: 'Venda', tableColumn: 'numberSale' },
    { columnName: 'Comprador', tableColumn: 'buyerName' },
    { columnName: 'Pagamento', tableColumn: 'paymentMehod', icon: this.returnIconTable },
    { columnName: 'Ver venda', tableColumn: 'view', button: {icon: 'file_open', callback: this.openModal.bind(this)} }
  ] as ColumnsTable[];
  sales!: Sale[];

  loadingSubmitForm = false;

  constructor(
    private _formBuilder: FormBuilder,
    private saleService: SaleService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.loadPage();

    if(this.route.snapshot.params?.['idSeller']){
      this.formNumberSeller.controls['idSeller'].setValue(this.route.snapshot.params['idSeller']);
      this.onSubmitNumberSeller();
    }
  }

  onSubmitNumberSeller(): void{
    if(this.formNumberSeller.valid){
      this.saleService.getSaleSeller(this.formNumberSeller.get('idSeller')?.value).subscribe(value => {
        this.sales = value.value;
      });
    }
  }

  private openModal(sale: Sale):void{
    this.dialog.open(SaleSellerModalComponent, {
      height: '90%',
      data: sale,
    });
  }

  loadPage(): void{
    this.formNumberSeller = this._formBuilder.group({
      idSeller: [null, [Validators.required]],
    });
  }

  private returnIconTable(value: PaymentMehod): string{
    if(value && value.paid){
      return 'check';
    }

    return 'warning';
  }
}
