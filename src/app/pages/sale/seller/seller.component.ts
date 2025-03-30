import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TableComponent } from '../../../../shared/table/table.component';
import { Genreic } from '../../../core/models/Generic';
import { ColumnsTable } from '../../../../shared/table/Table';
import { SaleService } from '../../../core/service/sale.service';
import { ClipboardModule, Clipboard } from '@angular/cdk/clipboard';
import { environment } from '../../../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Form } from '../../../core/modules/input.module';

@Component({
  selector: 'app-seller',
  standalone: true,
  imports: [
    Form,
    MatCardModule,
    MatIconModule,
    TableComponent,
    ClipboardModule
  ],
  templateUrl: './seller.component.html',
  styleUrl: './seller.component.scss'
})
export class SellerComponent implements OnInit{

  displayedColumnsTableSeller = [
    { columnName: 'Id', tableColumn: 'id'},
    { columnName: 'Nome', tableColumn: 'name'},
    { columnName: 'Link vendedor', tableColumn: 'view', button: {icon: 'content_copy'}}
  ] as ColumnsTable[];
  sellers!: Genreic[];

  formSeller!: FormGroup;

  loadingSubmitForm = false;

  constructor(
    private saleService: SaleService,
    private clipboard: Clipboard,
    private _formBuilder: FormBuilder
  ){}

  ngOnInit(): void {
    this.loadTable();

    this.formSeller = this._formBuilder.group({
      name: [null, [Validators.required]]
    });
  }

  loadTable(): void{
    this.saleService.getAllSeller().subscribe(value => {
      if(value.value){
        this.sellers = value.value;
      }
    });
  }

  onSubmitSeller(): void{
    if(this.formSeller.valid){
      this.saleService.postCreateSeller(this.formSeller.value).subscribe(() => {
        this.formSeller.reset();
        this.loadTable();
      });
    }
  }

  copyLinkSeller(value: Genreic): void{
    this.clipboard.copy(`${environment.url}/venda/v/${value.id}`)
  }
}
