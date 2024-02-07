
import { AsyncPipe, NgClass } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, forkJoin, map, startWith } from 'rxjs';

import { ButtonLoadingComponent } from '../../../../shared/button-loading/button-loading.component';
import { PersonService } from '../../../core/service/person.service';
import { SchoolService } from './../../../core/service/school.service';
import { StoreService } from './../../../core/service/store.service';
import { School } from '../../../core/models/School';
import { City } from '../../../core/models/Citys';

import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { DateAdapter, MatDateFormats, MAT_DATE_FORMATS, MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { MenubarModule } from 'primeng/menubar';
import { FileUploadModule } from 'primeng/fileupload';
import { MessagesModule } from 'primeng/messages';
import { FieldsetModule } from 'primeng/fieldset';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { SkeletonModule } from 'primeng/skeleton';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';

interface View {
  date: string;
  hour: string;
  enrollment: string;
}

const CUSTDFTS: MatDateFormats = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateA11yLabel: 'LL',
    monthYearLabel: 'MMMM Y',
    dateInput: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM Y',
  },
};

@Component({
  selector: 'app-inscricao',
  standalone: true,
  imports: [
    NgClass,
    AvatarModule,
    AvatarGroupModule,
    MatIconModule,
    MenubarModule,
    MatFormFieldModule,
    MatInputModule,
    FileUploadModule,
    MatSelectModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    AsyncPipe,
    MatButtonModule,
    SkeletonModule,
    ButtonLoadingComponent,
    ToastModule,
    MatTabsModule,
    MessagesModule,
    FieldsetModule,
    ConfirmDialogModule
  ],
  providers: [
    provideNativeDateAdapter(),
    MessageService,
    ConfirmationService,
    { provide: MAT_DATE_FORMATS, useValue: CUSTDFTS },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}
  ],
  templateUrl: './inscricao.component.html',
  styleUrl: './inscricao.component.scss'
})
export class InscricaoComponent implements OnInit{
  citys!: City[];
  schools: School[] = [] as School[];
  viewValue: View = {} as View;
  filteredOptionsNaturalness!: Observable<City[]>;
  filteredOptionsElectoralDomicile!: Observable<City[]>;

  loadingSubmitForm: boolean = false;
  visible: boolean = false;
  showInformationEnrollment: boolean = false;
  indexTab: number = 0;

  form!: FormGroup;
  formEnrollment!: FormGroup;
  messages!: Message[];

  @ViewChild('matGruop') matGruop!: MatTabGroup;

  constructor(
    private storeService: StoreService,
    private schoolService: SchoolService,
    private personService: PersonService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ){}

  ngOnInit(): void {
    this.loadPage();
  }

  onSubmit(): void{
    if(this.form.valid){
      this.loadingSubmitForm = true;
      this.personService.createPersonParcial(this.form.value)
      .subscribe(response => {
        this.dialogConfirm(`Inscrição com o número ${response.matricula} efetuada com sucesso. Acessa a aba de acompanhamento para ter acesso a mais informações.`);
      }, () => {},
      ()=> {this.loadingSubmitForm = false});
    }
  }

  onSubmitEnrollment(){
    if(this.formEnrollment.valid){
      this.loadingSubmitForm = true;
      this.personService.getEnrollment(this.formEnrollment.controls['enrollment'].value)
      .subscribe(response => {
        if(response.value){
          this.showInformationEnrollment = true;
          const birthDate = new Date(response.value.birthDate);
          const dataAtual = new Date();
          let diferenca = dataAtual.getTime() - birthDate.getTime();
          let idade = Math.floor(diferenca / (1000 * 60 * 60 * 24 * 365.25));

          if(response.value.gender == "MASCULINO"){
            this.viewValue.date = "21/02";
          } else if(response.value.gender == "FEMININO"){
            this.viewValue.date = "19/02";
          }

          if(idade <= 14){
            this.viewValue.hour = "17:30";
            this.viewValue.enrollment = `Sub 14 ${response.value.gender == "MASCULINO"? "Masculino" : "Feminino"}`;
          } else if(idade > 14 && idade <= 17){
            this.viewValue.hour = "18:30";
            this.viewValue.enrollment = `Sub 17 ${response.value.gender == "MASCULINO"? "Masculino" : "Feminino"}`;
          } else if(idade > 17){
            this.viewValue.hour = "20:00";
            this.viewValue.enrollment = `Adulto ${response.value.gender == "MASCULINO"? "Masculino" : "Feminino"}`;
          }
        } else {
          this.messages = [
            { severity: 'error', summary: 'Atenção', detail: 'Inscrição não encontrada' }
          ];
        }
      }, () => {},
      ()=> {this.loadingSubmitForm = false});
    }
  }

  showConfirm(messsage: string) {
    if (!this.visible) {
        this.messageService.add({ key: 'confirm', sticky: true, severity: 'success', summary: messsage });
        this.visible = true;
    }
  }
  onConfirm() {
    this.messageService.clear('confirm');
    this.visible = false;
  }

  closeEnrollment(){
    this.showInformationEnrollment = false;
    this.viewValue = {} as View;
  }

  dialogConfirm(messsage: string) {
    this.confirmationService.confirm({
        header: 'Sucesso',
        message: messsage,
        acceptIcon: 'pi pi-check mr-2',
        acceptLabel: 'Entendido',
        acceptButtonStyleClass: 'p-button-sm',
        rejectVisible: false,
        accept: () => {
          this.indexTab = 1;
          this.matGruop._elementRef.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
          this.showConfirm(messsage);
        },
        reject: () => {
          this.indexTab = 1;
          this.showConfirm(messsage);
        }
    });
}

  loadPage(): void{
    forkJoin({
      citys: this.storeService.citysAndState(),
      schools: this.schoolService.getAll()
    }).subscribe(response => {
      this.citys = response.citys;
      this.schools = response.schools;
    },()=>{},
    ()=> {
      this.filteredOptionsNaturalness = this.form.controls['naturalness'].valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );

      this.filteredOptionsElectoralDomicile = this.form.controls['electoralDomicile'].valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );
    });

    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(5)]],
      naturalness: [null, Validators.required],
      birthDate: [null, Validators.required],
      height: [null, Validators.required],
      weight: [null, Validators.required],
      school_id: [null],
      ddPhone: [null, [Validators.required, Validators.minLength(2)]],
      numberPhone: [null, [Validators.required, Validators.minLength(9)]],
      electoral: [null, Validators.required],
      educationLevel: [null, Validators.required],
      electoralDomicile: [null],
      gender: [null, Validators.required],
    });
    this.addValidator();

    this.formEnrollment = this.formBuilder.group({
      enrollment: [null, [Validators.required, Validators.minLength(7)]],
    })
  }

  addValidator(): void {
    this.form.controls['educationLevel'].valueChanges.subscribe(value => {
      if(value == 1){
        this.form.controls['school_id'].addValidators(Validators.required);
      } else if (value == 0){
        this.form.controls['school_id'].removeValidators(Validators.required);
      }

      this.form.controls['school_id'].updateValueAndValidity();
    });

    this.form.controls['electoral'].valueChanges.subscribe(value => {
      if(value == 1){
        this.form.controls['electoralDomicile'].addValidators(Validators.required);
      } else if (value == 0){
        this.form.controls['electoralDomicile'].removeValidators(Validators.required);
      }

      this.form.controls['electoralDomicile'].updateValueAndValidity();
    });
  }

  private _filter(value: string): City[] {
    if(!value){
      return this.citys;
    }

    const filterValue = value.toLowerCase();

    return this.citys.filter(option => option.name.toLowerCase().includes(filterValue));
  }
}

