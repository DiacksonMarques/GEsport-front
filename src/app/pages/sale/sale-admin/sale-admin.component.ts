import { Component, inject, OnInit } from '@angular/core';
import { TableComponent } from '../../../../shared/table/table.component';
import { ColumnsTable } from '../../../../shared/table/Table';
import { PaymentMehod, Sale } from '../../../core/models/Sale';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { SaleService } from '../../../core/service/sale.service';
import { SaleSellerModalComponent } from '../sale-seller/sale-seller-modal/sale-seller-modal.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SaleStatusComponent } from './sale-status/sale-status.component';
import { Form } from '../../../core/modules/input.module';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sale-admin',
  standalone: true,
  imports: [
    TableComponent,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    Form
  ],
  templateUrl: './sale-admin.component.html',
  styleUrl: './sale-admin.component.scss'
})
export class SaleAdminComponent implements OnInit {

  displayedColumnsTableSales = [
    { columnName: 'Venda', tableColumn: 'numberSale' },
    { columnName: 'Comprador', tableColumn: 'buyerName' },
    { columnName: 'Vendedor', tableColumn: 'nameSeller' },
    { columnName: 'Pagamento', tableColumn: 'paymentMehod', icon: this.returnIconTable},
    { columnName: 'Ver', tableColumn: 'view', button: {icon: 'file_open', callback: this.openModal.bind(this)} },
    { columnName: 'Status', tableColumn: 'status', button: {icon: 'system_security_update_good', callback: this.openModalStatus.bind(this)} }
  ] as ColumnsTable[];
  sales!: Sale[];
  salesCopy!: Sale[];
  loadTable = false;

  formFilter!: FormGroup;

  constructor(
    private saleService: SaleService,
    private dialog: MatDialog,
    private _formBuilder: FormBuilder
  ){}

  ngOnInit(): void {
    this.loadPage();

    this.formFilter = this._formBuilder.group({
      paid: [null],
      numberSale: [null],
      delivery: [null],
    });

    this.formFilter.get("paid")?.valueChanges.subscribe(value => {
      if(typeof value == "number"){
        if(value == 2){
          this.sales = this.salesCopy;
        } else {
          this.sales = this.salesCopy.filter(valueFilter => valueFilter.paymentMehod && valueFilter.paymentMehod.paymentMehodId == value)
        }
      }
    });

    this.formFilter.get("numberSale")?.valueChanges.subscribe(value => {
      if(value) {
        this.sales = this.salesCopy.filter(valueFilter => valueFilter.numberSale == value);
      } else if(value == ""){
        if(this.formFilter.get("paid")?.value == 2 || this.formFilter.get("paid")?.value == null){
          this.sales = this.salesCopy;
        } else {
          this.sales = this.salesCopy.filter(valueFilter => valueFilter.paymentMehod && valueFilter.paymentMehod.paymentMehodId == this.formFilter.get("paid")?.value);
        }
      }
    });

    this.formFilter.get("delivery")?.valueChanges.subscribe(value => {
      if(value == 0) {
        this.sales = [];
        this.loadTable = true;
        this.saleService.getAllSaleStatus().subscribe(value => {
          this.sales = value.value;
          this.salesCopy = value.value;
          this.loadTable = false;
        }, () => this.loadTable = false);
      } else if(value == 1){
        this.sales = [];
        this.loadTable = true;
        this.saleService.getAllSale().subscribe(value => {
          this.sales = value.value;
          this.salesCopy = value.value;
          this.loadTable = false;
        }, () => this.loadTable = false);
      }
    });
  }

  loadPage(): void{
    this.loadTable = true;
    this.saleService.getAllSaleStatus().subscribe(value => {
      this.sales = value.value;
      this.salesCopy = value.value;
      this.loadTable = false;
    }, () => this.loadTable = false);
  }

  private openModal(sale: Sale):void{
    this.dialog.open(SaleSellerModalComponent, {
      height: '90%',
      data: sale,
    });
  }

  private openModalStatus(sale: Sale):void{
    this.dialog.open(SaleStatusComponent, {
      height: '90%',
      minWidth: '100%',
      data: sale,
    });
  }

  private returnIconTable(value: PaymentMehod): string{
      if(value && value.paid){
        return 'check';
      }

      return 'warning';
    }
}
