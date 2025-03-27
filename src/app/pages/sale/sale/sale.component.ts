import { Product, ProductSale } from './../../../core/models/Product';
import { Component, OnInit } from '@angular/core';
import { SaleService } from '../../../core/service/sale.service';
import { forkJoin, map, Observable } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, UntypedFormArray, Validators } from '@angular/forms';
import { Form } from '../../../core/modules/input.module';
import { CurrencyPipe } from '@angular/common';
import {AsyncPipe} from '@angular/common';
import {StepperOrientation, MatStepperModule} from '@angular/material/stepper';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MatDialog} from '@angular/material/dialog';
import { ProductSelectComponent } from './product-select/product-select.component';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { NgxMaskDirective } from 'ngx-mask';
import { StoreService } from '../../../core/service/store.service';
import { Router } from '@angular/router';
import { MessageRequest } from '../../../core/models/Message';
import { MessageHintComponent } from '../../../../shared/message-hint/message-hint.component';

@Component({
  selector: 'app-sale',
  standalone: true,
  imports: [
    Form,
    CurrencyPipe,
    MatStepperModule,
    AsyncPipe,
    MatDividerModule,
    MatListModule,
    NgxMaskDirective,
    MessageHintComponent
  ],
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.scss'
})
export class SaleComponent implements OnInit {

  products!: Product[];
  productsSelect: ProductSale[] = [];

  fromSale!: FormGroup;
  withdrawalCheck!: boolean;

  stepperOrientation!: Observable<StepperOrientation>;

  messagePayment!: MessageRequest;
  viewMessagePayment: boolean = false;
  delivery: boolean = false;


  constructor(
    private saleService: SaleService,
    private formBuilder: FormBuilder,
    private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    private storeService: StoreService,
    private router: Router
  ){
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {
    this.loadPage();
  }

  openDialog() {
    const dialogRef = this.dialog.open(ProductSelectComponent, {
      width: '90%',
      data: {
        products: this.products
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(typeof result == "object"){
        this.addProduct(result);
      }
    });
  }

  onSubmit(): void {
    if(this.fromSale.valid && this.productsSelect.length){
      this.saleService.postCreateSale(this.fromSale.value).subscribe(valeu => {
        if(valeu){
          this.storeService.showMessage({
            type: 'success',
            title: `Venda finalizada com sucesso`,
            timing: 7000
          });

          this.router.navigateByUrl(`venda/${valeu.numberSale}`);
        }
      })
    } else {
      this.storeService.showMessage({
        type: 'warning',
        title: `Preencha todos os campos obrigatórios`,
        timing: 7000
      });
    }
  }

  private loadPage(): void{
    forkJoin({
      products: this.saleService.getProduct()
    }).subscribe(response => {
      this.products = response.products.value
    });

    this.fromSale = this.formBuilder.group({
      product: [[]],
      totalValue: [0, [Validators.required]],
      address: [null, []],
      neighborhood: [null, []],
      number: [null, []],
      referencePoint: [null, []],
      phone: [null, [Validators.required]],
      buyerName: [null, [Validators.required]],
      withdrawal: [null, [Validators.required]],
      sellerId: [null, [Validators.required]],
      sellerName: [{value: '', disabled: true}, Validators.required],
    });

    this.fromSale.get('sellerId')?.valueChanges.subscribe(value => {
      this.fromSale.get('sellerName')?.patchValue(null);

      if(value){
        this.saleService.getSeller(value).subscribe(valueReturn => {
          if(valueReturn.value){
            this.fromSale.get('sellerName')?.patchValue(valueReturn.value.name);
          } else {
            this.storeService.showMessage({
              type: 'warning',
              title: `Vendendor não encontrado!`,
              timing: 7000
            });
            this.fromSale.get('sellerId')?.patchValue(null);
          }
        });
      }
    });

    this.fromSale.get('withdrawal')?.valueChanges.subscribe(value => {
      this.withdrawalCheck = value;
      if(!value){
        this.fromSale.get('address')?.addValidators(Validators.required);
        this.fromSale.get('neighborhood')?.addValidators(Validators.required);
        this.fromSale.get('number')?.addValidators(Validators.required);
        this.fromSale.get('referencePoint')?.addValidators(Validators.required);
        this.fromSale.updateValueAndValidity();

        this.messagePayment = {
          type: "warning",
          icon: {
            locale: "title",
            type: "warning"
          },
          subTitle: "Taxa de entrega: R$ 2,00"
        }
        this.viewMessagePayment = true;
        this.delivery = true;
      } else {
        this.fromSale.get('address')?.clearValidators();
        this.fromSale.get('address')?.setErrors(null);
        this.fromSale.get('neighborhood')?.clearValidators();
        this.fromSale.get('neighborhood')?.setErrors(null);
        this.fromSale.get('number')?.clearValidators();
        this.fromSale.get('number')?.setErrors(null);
        this.fromSale.get('referencePoint')?.clearValidators();
        this.fromSale.get('referencePoint')?.setErrors(null);
        this.fromSale.updateValueAndValidity();

        this.viewMessagePayment = false;
        this.delivery = false;
      }

      this.recalculateTotalPrice();
    });
  }

  private addProduct(productSelect: any){
    const product = this.fromSale.get('product')?.value as UntypedFormArray;
    const productCopy = [...this.products];

    product.push(productSelect);

    const productSelectView = productCopy.find(value => value.id == productSelect.idProduct);

    if(productSelectView?.id != null){
      const newProduct = {
        id: productSelectView.id,
        description: productSelectView.description,
        value: productSelect.price,
        followUps: productSelect.followUps,
        followUpsPage: productSelect.followUpsPages,
      } as ProductSale;

      this.productsSelect.push(newProduct);
    }

    this.recalculateTotalPrice();
  }

  recalculateTotalPrice(): void{
    let some = 0;

    this.productsSelect.forEach(value => {
      some = some + value.value;
    });

    if(this.delivery){
      some = some + 2
    }

    this.fromSale.get('totalValue')?.patchValue(some);
  }
}
