import { SaleService } from './../../../core/service/sale.service';
import { Component, OnInit } from '@angular/core';
import { Form } from '../../../core/modules/input.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sale } from '../../../core/models/Sale';
import { StoreService } from '../../../core/service/store.service';
import { MatIconModule } from '@angular/material/icon';
import { ButtonLoadingComponent } from '../../../../shared/button-loading/button-loading.component';
import { ActivatedRoute } from '@angular/router';
import { SaleViewInfoComponent } from "./sale-view-info/sale-view-info.component";

@Component({
  selector: 'app-sale-view',
  standalone: true,
  imports: [
    Form,
    MatIconModule,
    ButtonLoadingComponent,
    SaleViewInfoComponent
],
  templateUrl: './sale-view.component.html',
  styleUrl: './sale-view.component.scss'
})
export class SaleViewComponent implements OnInit {

  formNumberSale!: FormGroup;
  sale!: Sale|null;

  loadingSubmitForm: boolean = false;


  constructor(
    private _formBuilder: FormBuilder,
    private saleService: SaleService,
    private storeService: StoreService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.loadPage();

    if(this.route.snapshot.params?.['numberSale']){
      this.formNumberSale.controls['numberSale'].setValue(this.route.snapshot.params['numberSale']);
      this.onSubmitNumberSale();
    }
  }

  onSubmitNumberSale(){
    if(this.formNumberSale.valid){
      this.loadingSubmitForm = true;
      this.sale = null;

      this.saleService.getSale(this.formNumberSale.controls['numberSale'].value).subscribe(
        response => {
          if(response.value != null
          ){
            this.sale = response.value;
          } else {
            this.storeService.showMessage({
              type: 'warning',
              title: `Venda não encontrada`,
              timing: 4000
            });

            this.sale = null;
          }
          this.loadingSubmitForm = false;
        },
        () => {
          this.storeService.showMessage({
            type: 'error',
            title: `Error ao pesquisar, tente novamente!`,
            timing: 4000
          });

          this.loadingSubmitForm = false;
        }
      );
    }
  }

  loadPage(): void{
    this.formNumberSale = this._formBuilder.group({
      numberSale: [null, [Validators.required, Validators.minLength(6)]],
    });
  }
}
