import { Component, Input, OnInit } from '@angular/core';
import { Sale } from '../../../../core/models/Sale';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { Form } from '../../../../core/modules/input.module';
import { MessageHintComponent } from '../../../../../shared/message-hint/message-hint.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MessageRequest } from '../../../../core/models/Message';
import { Pix } from '../../../../core/models/Pix';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormControl } from '@angular/forms';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { ButtonLoadingComponent } from '../../../../../shared/button-loading/button-loading.component';
import { GenreicD } from '../../../../core/models/Generic';
import { StoreService } from '../../../../core/service/store.service';
import { SaleService } from '../../../../core/service/sale.service';

@Component({
  selector: 'app-sale-view-info',
  standalone: true,
  imports: [
    Form,
    MatCardModule,
    MatDividerModule,
    MessageHintComponent,
    ClipboardModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatStepperModule,
    DatePipe,
    CurrencyPipe,
    ButtonLoadingComponent
  ],
  templateUrl: './sale-view-info.component.html',
  styleUrl: './sale-view-info.component.scss'
})
export class SaleViewInfoComponent implements OnInit{

  @Input('sale') set saleInput(value: Sale|null){
    this.sale = null;
    this.viewMessagePayment = false;

    if(value){
      this.sale = value;
      this.checkPaymentMehod();
    }
  }
  sale!: Sale|null;
  paymentMehod = new FormControl();

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

  loadingPix: boolean = false;
  messagePayment!: MessageRequest;
  viewMessagePayment: boolean = false;
  pixQrcode!: Pix;

  constructor(
    private saleService: SaleService,
    private storeService: StoreService,
  ){}

  ngOnInit(): void {
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
