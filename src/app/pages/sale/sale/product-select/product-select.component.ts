import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { Form } from '../../../../core/modules/input.module';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FollowUp, Product, ProductSale } from '../../../../core/models/Product';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { StoreService } from '../../../../core/service/store.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-select',
  standalone: true,
  imports: [
    Form,
    MatButtonModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDividerModule,
    MatListModule,
    MatButtonModule,
    CurrencyPipe
  ],
  templateUrl: './product-select.component.html',
  styleUrl: './product-select.component.scss'
})
export class ProductSelectComponent implements OnInit {

  fromProduct!: FormGroup;

  productControl: FormControl<number|null> = new FormControl(null, [Validators.required]);
  qtdFollowUps: number = 0;

  followUpSale!: FollowUp[];

  constructor(
    public dialogRef: MatDialogRef<ProductSelectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {products: Product[], product: Product},
    public _formBuilder: FormBuilder,
    private storeService: StoreService,
  ) {}

  ngOnInit(): void {
    this.loadPage();
  }

  onAdd(): void{
    if(this.fromProduct.invalid || this.qtdFollowUps < 4){
      this.storeService.showMessage({
        type: 'warning',
        title: `Preencha todos os campos!`,
        timing: 7000
      });

      return;
    }

    this.dialogRef.close(this.fromProduct.value);
  }

  loadPage(): void{
    this.fromProduct = this._formBuilder.group({
      idProduct: [null, Validators.required],
      price: [0, Validators.required],
      followUps: [[]],
      followUpsPages: [[]]
    });

    this.productControl.valueChanges.subscribe(value => {
      if(typeof value == "number"){
        const product = this.data.products[value];
        this.fromProduct.get('idProduct')?.patchValue(product.id);
        this.fromProduct.get('price')?.patchValue(product.value);

         this.followUpSale = this.data.products[value].followUps;
      }
    });
  }

  addfollowUp(value: FollowUp):void{
    if(this.qtdFollowUps >= 4)  return;

    const followUpsSelects = this.fromProduct.get("followUps")?.value as Array<FollowUp>;
    const indexFollowUp = followUpsSelects.findIndex(valueS => valueS.id == value.id);

    if(indexFollowUp == -1){
      value.amount = 1;
      followUpsSelects.push(value);
    } else if (indexFollowUp >= 0 && followUpsSelects[indexFollowUp].amount != null){
      followUpsSelects[indexFollowUp].amount++;
    }

    this.checkChoice();
  }

  removefollowUp(value: FollowUp): void{

    const followUpsSelects = this.fromProduct.get("followUps")?.value as Array<FollowUp>;
    const indexFollowUp = followUpsSelects.findIndex(valueS => valueS.id == value.id);

    if(indexFollowUp > -1){
      if(followUpsSelects[indexFollowUp].amount > 1){
        followUpsSelects[indexFollowUp].amount--;
      } else if(followUpsSelects[indexFollowUp].amount == 1){
        followUpsSelects.splice(indexFollowUp, 1);
      }
    }

    this.checkChoice();
  }

  checkButtonNegative(value: FollowUp): boolean{
    const followUpsSelects = this.fromProduct.get("followUps")?.value as Array<FollowUp>;
    if(followUpsSelects.length){
      return !!followUpsSelects.find(valueS => valueS.id == value.id);
    }

    return false;
  }

  addfollowUpPage(value: FollowUp):void{
    const followUpsSelects = this.fromProduct.get("followUpsPages")?.value as Array<FollowUp>;
    const indexFollowUp = followUpsSelects.findIndex(valueS => valueS.id == value.id);

    let priceTotal = this.fromProduct.get("price")?.value;

    if(indexFollowUp == -1){
      value.amount = 1;
      followUpsSelects.push(value);
      priceTotal = priceTotal + value.value;
    } else if (indexFollowUp >= 0 && followUpsSelects[indexFollowUp].amount != null){
      followUpsSelects[indexFollowUp].amount++;
      priceTotal = priceTotal + value.value;
    }

    this.fromProduct.get("price")?.patchValue(priceTotal);
  }

  removefollowUpPage(value: FollowUp): void{

    const followUpsSelects = this.fromProduct.get("followUpsPages")?.value as Array<FollowUp>;
    const indexFollowUp = followUpsSelects.findIndex(valueS => valueS.id == value.id);

    let priceTotal = this.fromProduct.get("price")?.value;

    if(indexFollowUp > -1){
      if(followUpsSelects[indexFollowUp].amount > 1){
        followUpsSelects[indexFollowUp].amount--;
        priceTotal = priceTotal - value.value;
      } else if(followUpsSelects[indexFollowUp].amount == 1){
        followUpsSelects.splice(indexFollowUp, 1);
        priceTotal = priceTotal - value.value;
      }
    }

    this.fromProduct.get("price")?.patchValue(priceTotal);
  }

  checkButtonNegativePage(value: FollowUp): boolean{
    const followUpsSelects = this.fromProduct.get("followUpsPages")?.value as Array<FollowUp>;
    if(followUpsSelects.length){
      return !!followUpsSelects.find(valueS => valueS.id == value.id);
    }

    return false;
  }

  checkChoice(): void{
    const followUpsSelects = this.fromProduct.get("followUps")?.value as Array<FollowUp>;
    let followUp = 0;

    followUpsSelects.forEach(value => {
      followUp = followUp + value.amount;
    });

    this.qtdFollowUps = followUp;
  }
}
