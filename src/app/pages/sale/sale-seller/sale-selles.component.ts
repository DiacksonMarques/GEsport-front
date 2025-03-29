import { Component, OnInit } from '@angular/core';
import { Form } from '../../../core/modules/input.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SaleService } from '../../../core/service/sale.service';

@Component({
  selector: 'app-sale-selles',
  standalone: true,
  imports: [
    Form
  ],
  templateUrl: './sale-selles.component.html',
  styleUrl: './sale-selles.component.scss'
})
export class SaleSellesComponent implements OnInit {

  formNumberSeller!: FormGroup;

  loadingSubmitForm = false;

  constructor(
    private _formBuilder: FormBuilder,
    private saleService: SaleService
  ){}

  ngOnInit(): void {
    this.loadPage();
  }

  onSubmitNumberSeller(): void{
    if(this.formNumberSeller.valid){
      this.saleService.getSaleSeller(this.formNumberSeller.get('idSeller')?.value).subscribe(value => {
        console.log(value);
      });
    }
  }

  loadPage(): void{
    this.formNumberSeller = this._formBuilder.group({
      idSeller: [null, [Validators.required]],
    });
  }
}
