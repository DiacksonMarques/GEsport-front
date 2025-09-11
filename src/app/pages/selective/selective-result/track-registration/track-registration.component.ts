import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../../../../environments/environment';
import { ButtonLoadingComponent } from '../../../../../shared/button-loading/button-loading.component';
import { MessageHintComponent } from '../../../../../shared/message-hint/message-hint.component';
import { Candidate } from '../../../../core/models/Candidate';
import { MessageRequest } from '../../../../core/models/Message';
import { Form } from '../../../../core/modules/input.module';
import { SelectiveService } from '../../../../core/service/selective.service';
import { StoreService } from '../../../../core/service/store.service';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { DatePipe } from '@angular/common';


interface InformationView {
  enrollment: string;
  dateSelective: string;
  hourSelective: string;
  locationSelective: string;
  pixCopyPaste: string;
  pixQrCode: string;
  pixName:string;
  pixValue: string;
  pixMaturity: string;
  age: number;
};

@Component({
  selector: 'app-track-registration',
  standalone: true,
  imports: [
    Form,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    ButtonLoadingComponent,
    MessageHintComponent,
    ClipboardModule,
    DatePipe
  ],
  templateUrl: './track-registration.component.html',
  styleUrl: './track-registration.component.scss'
})
export class TrackRegistrationComponent implements OnInit {

  formPayment!: FormGroup;
  @Input('valueCandidate') set valueCandidateInput(value: Candidate){
    if(value){
      this.valueCandidate = value;
      this.checkViewInformation();
      this.viewMessagePayment = false;
      this.sendNamePixCheck = false;
      this.checkViewMessage();
    }
  }
  valueCandidate!: Candidate;
  valueInformationView = {locationSelective: "Colégio Gov. Adauto Bezerra"} as InformationView;

  loadingSubmitForm: boolean = false;
  sendNamePixCheck: boolean = false;

  messagePayment!: MessageRequest;
  viewMessagePayment: boolean = false;

  constructor(
    private storeService: StoreService,
    private formBuilder: FormBuilder,
    private selectiveService: SelectiveService,
  ){}

  ngOnInit(): void {
    this.loadPage();
    this.checkViewInformation();
  }

  onSubmitPayment(){
    if(this.formPayment.valid){
      this.loadingSubmitForm = true;
      this.selectiveService.paymentCreate(this.valueCandidate.enrollment??'', this.formPayment.value.namePix)
      .subscribe(response => {
        this.valueCandidate = response;
        this.checkViewMessage();
        this.loadingSubmitForm = false;
      }, () => this.loadingSubmitForm = false)
    }
  }

  downloadTerm(){
    this.selectiveService.donwloadTerm().subscribe(response => {
      const url = window.URL.createObjectURL(response);
      const a = document.createElement('a');

      a.href = url;
      a.download = "TERMO_SEM_PAIS.pdf"
      a.click();

      window.URL.revokeObjectURL(url);
      a.remove();
    });
  }

  messagePixCopyPaste(){
    this.storeService.showMessage({
      type: 'success',
      title: `Sucesso ao copiar a chave PIX!`,
      timing: 5000
    });
  }

  private loadPage(): void{
    this.formPayment = this.formBuilder.group({
      namePix: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  private checkViewInformation(){
    this.valueInformationView.enrollment = this.valueCandidate.enrollment ?? '';
    this.valueInformationView.locationSelective = 'Colégio Pelúsio Correia';

    const birthDate = new Date(this.valueCandidate.birthDate);

    if([2012, 2013, 2014].includes(birthDate.getFullYear())){
      this.valueInformationView.dateSelective = "24/09/2025";
      this.valueInformationView.hourSelective = '18:30h às 19:30h';
    } else if([2009, 2010, 2011].includes(birthDate.getFullYear())){
      this.valueInformationView.dateSelective = "24/09/2025";
      this.valueInformationView.hourSelective = '18:30h às 19:30h';
    } else {
      this.valueInformationView.dateSelective = "24/09/2025";
      this.valueInformationView.hourSelective = '19:30 às 20:30h';
    }
    

    if(this.valueCandidate.txid != "NOTPAGE"){
      this.valueInformationView.pixName = this.valueCandidate.pixName;
      this.valueInformationView.pixMaturity = this.valueCandidate.pixMaturity;
      this.valueInformationView.pixValue = this.valueCandidate.pixValue;
      this.valueInformationView.pixCopyPaste = this.valueCandidate.pixCopyPaste;
      this.valueInformationView.pixQrCode = this.valueCandidate.pixQrCode;
    }

    /* 
      this.valueInformationView.dateSelective = this.valueCandidate.gender == 'MASCULINO' ? '25/02/2025' : '26/02/2025';
      this.valueInformationView.locationSelective = this.valueCandidate.gender == 'MASCULINO' ? 'Colégio D. Maria Amélia B.' : 'Colégio Gov. Adauto Bezerra'; 

      const today = new Date();
      const birthDate = new Date(this.valueCandidate.birthDate);

      const age = today.getFullYear() - birthDate.getFullYear();

      this.valueInformationView.age = age;

      if([2013,2012,2011,2010].includes(birthDate.getFullYear())){
        this.valueInformationView.hourSelective = '17h às 18h';
      } else if([2009, 2008, 2007, 2006].includes(birthDate.getFullYear())){
        this.valueInformationView.hourSelective = '18h às 19h';
      } else if([2005, 2004, 2003, 2002].includes(birthDate.getFullYear())){
        this.valueInformationView.hourSelective = '19h às 20h';
      } else if(age >= 18){
        this.valueInformationView.hourSelective = '19h às 20h';
      } else {
        this.valueInformationView.hourSelective = '17h às 18h';
      } 
    */
  }

  private checkViewMessage(): void{
    if(this.valueCandidate.pixStatus == "CONCLUIDA" && this.valueCandidate.txid != "NOTPAGE"){
      this.messagePayment = {
        type: "success",
        title: "Incrição deferida.",
        subTitle: "Pagamento feito com sucesso!"
      };

      this.viewMessagePayment = true;
      return;
    } else  if (this.valueCandidate.pixStatus == "CONCLUIDA" && this.valueCandidate.txid == "NOTPAGE") {
      this.messagePayment = {
        type: "success",
        title: "Incrição deferida.",
        subTitle: "A sua inscrição foi finalizada com sucesso!"
      };

      this.viewMessagePayment = true;
      return;
    }
  }
}
