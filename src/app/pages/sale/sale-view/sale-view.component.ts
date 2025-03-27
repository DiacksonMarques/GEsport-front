import { SaleService } from './../../../core/service/sale.service';
import { Component, OnInit } from '@angular/core';
import { Form } from '../../../core/modules/input.module';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Sale } from '../../../core/models/Sale';
import { StoreService } from '../../../core/service/store.service';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ButtonLoadingComponent } from '../../../../shared/button-loading/button-loading.component';
import { MessageHintComponent } from '../../../../shared/message-hint/message-hint.component';
import { MessageRequest } from '../../../core/models/Message';
import { ActivatedRoute } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import {MatStepperModule} from '@angular/material/stepper';
import { GenreicD } from '../../../core/models/Generic';
import { Pix } from '../../../core/models/Pix';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-sale-view',
  standalone: true,
  imports: [
      Form,
      MatCardModule,
      MatDividerModule,
      MatIconModule,
      ButtonLoadingComponent,
      MessageHintComponent,
      ClipboardModule,
      DatePipe,
      CurrencyPipe,
      MatListModule,
      MatStepperModule,
      MatProgressSpinnerModule
    ],
  templateUrl: './sale-view.component.html',
  styleUrl: './sale-view.component.scss'
})
export class SaleViewComponent implements OnInit {

  formNumberSale!: FormGroup;
  paymentMehod = new FormControl();
  sale!: Sale|null;

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

  loadingSubmitForm: boolean = false;
  loadingPix: boolean = false;
  messagePayment!: MessageRequest;
  viewMessagePayment: boolean = false;
  pixQrcode!: Pix;


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
      this.viewMessagePayment = false;

      this.saleService.getSale(this.formNumberSale.controls['numberSale'].value).subscribe(
        response => {
          if(response.value != null
          ){
            this.sale = response.value;
            this.checkPaymentMehod();
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

    this.paymentMehod.valueChanges.subscribe(value=> {
      if(!this.sale?.paymentMehod){
        const paymentMehodValue = {
          numberSale: this.sale?.numberSale,
          paymentMethod: value,
          buyerName: this.sale?.buyerName,
          price: this.sale?.totalValue
        }

        this.saleService.putPaymentMethod(paymentMehodValue).subscribe(valueP => {
          if(this.sale){
            this.sale.paymentMehod = valueP.value.paymentMehod;
            this.checkPaymentMehod();
          }
        });
      }
    });
  }

  checkPaymentMehod():void{
    if(this.sale?.paymentMehod){
      this.loadingPix = true;
      this.viewMessagePayment = false;
      this.paymentMehod.patchValue(this.sale?.paymentMehod.paymentMehodId);
      this.paymentMehod.disable();

      if(this.sale.paymentMehod.paymentMehodId == 0){
        this.saleService.getPixSale(this.sale.paymentMehod.txid).subscribe(value => {
          if(value.value){
            this.pixQrcode = value.value;
            this.loadingPix = false;
            if(value.value.pixStatus == "CONCLUIDA"){
              this.messagePayment = {
                type: "success",
                icon: {
                  locale: "title",
                  type: "success"
                },
                subTitle: "Pagamento efetuado com sucesso!"
              }
              this.viewMessagePayment = true;
            }
          }
        });

      } else {
        if(this.sale.paymentMehod.linkCard == "ADD"){
          this.messagePayment = {
            type: "warning",
            icon: {
              locale: "title",
              type: "warning"
            },
            subTitle: "Aguardando o banco gerar link! volte em instantes"
          }
          this.viewMessagePayment = true;

        } else if(this.sale.paymentMehod.paid){
          this.messagePayment = {
            type: "success",
            icon: {
              locale: "title",
              type: "success"
            },
            subTitle: "Pagamento efetuado com sucesso!"
          }
          this.viewMessagePayment = true;
        }

        this.loadingPix = false;
      }
    }
  }

  openLinkCard(link: string){
    window.open(link, "_blank")
  }

  messageCopyPaste(message: string){
    this.storeService.showMessage({
      type: 'success',
      title: message,
      timing: 5000
    });
  }
}
