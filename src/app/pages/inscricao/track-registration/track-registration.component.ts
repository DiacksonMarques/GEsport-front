import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { ButtonLoadingComponent } from '../../../../shared/button-loading/button-loading.component';
import { StoreService } from '../../../core/service/store.service';
import { Form } from '../../../core/modules/input.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageHintComponent } from '../../../../shared/message-hint/message-hint.component';
import { MessageRequest } from '../../../core/models/Message';
import { SelectiveService } from '../../../core/service/selective.service';
import { Candidate } from '../../../core/models/Candidate';
import { environment } from '../../../../environments/environment';

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
    ClipboardModule,
    ButtonLoadingComponent,
    MessageHintComponent
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

    this.valueInformationView.dateSelective = this.valueCandidate.gender == 'MASCULINO' ? '09/10/2024' : '07/10/2024';

    this.valueInformationView.pixName = 'AWAITTECH SOLUCOES DIGITAIS E TECNOLOGIA LTDA';
    this.valueInformationView.pixMaturity = this.valueCandidate.gender == 'MASCULINO' ? '09/10/2024' : '07/10/2024';

    const today = new Date();
    const birthDate = new Date(this.valueCandidate.birthDate);

    const age = today.getFullYear() - birthDate.getFullYear();

    this.valueInformationView.age = age;

    if(age > 18){
      this.valueInformationView.hourSelective = '20h';
      this.valueInformationView.pixQrCode = `${environment.api}/assets/30.png`;
      this.valueInformationView.pixCopyPaste = `00020126580014BR.GOV.BCB.PIX01366ffcce92-d453-4593-bdd1-e8fefff60def520400005303986540530.005802BR5925AWAITTECH SOLUCOES DIGITA6009SAO PAULO61080540900062240520AnihMSMXbBbf8n887o08630430F1`;
      this.valueInformationView.pixValue = `R$ 30,00`;
    } else if(age > 15 && age <= 18 ){
      this.valueInformationView.hourSelective = '19h';
      this.valueInformationView.pixQrCode = `${environment.api}/assets/10.png`;
      this.valueInformationView.pixCopyPaste = `00020126580014BR.GOV.BCB.PIX01366ffcce92-d453-4593-bdd1-e8fefff60def520400005303986540510.005802BR5925AWAITTECH SOLUCOES DIGITA6009SAO PAULO61080540900062240520gJ68YZcvsLC2zxR87o08630423A2`;
      this.valueInformationView.pixValue = `R$ 10,00`;
    } else if( age <= 15 ){
      this.valueInformationView.hourSelective = '18h';
      this.valueInformationView.pixQrCode = `${environment.api}/assets/10.png`;
      this.valueInformationView.pixCopyPaste = `00020126580014BR.GOV.BCB.PIX01366ffcce92-d453-4593-bdd1-e8fefff60def520400005303986540510.005802BR5925AWAITTECH SOLUCOES DIGITA6009SAO PAULO61080540900062240520gJ68YZcvsLC2zxR87o08630423A2`;
      this.valueInformationView.pixValue = `R$ 10,00`;
    }
  }

  private checkViewMessage(): void{
    if(this.valueCandidate.namePix != ""){
      if(this.valueCandidate.approvedPix == true){
        this.messagePayment = {
          type: "success",
          title: "Incrição deferida.",
          subTitle: "Pagamento feito com sucesso!"
        };

        this.viewMessagePayment = true;
        return;
      }

      this.messagePayment = {
        type: "warning",
        title: "Pagamento informado.",
        subTitle: "Aguardando o deferimento!"
      };

      this.viewMessagePayment = true;
    }
  }
}
