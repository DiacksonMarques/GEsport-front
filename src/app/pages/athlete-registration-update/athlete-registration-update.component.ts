import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgClass } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router';

import { Observable, forkJoin, map, startWith } from 'rxjs';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';


import { Athlete } from '../../core/models/Athlete';
import { StoreService } from '../../core/service/store.service';
import { SchoolService } from '../../core/service/school.service';
import { PersonService } from '../../core/service/person.service';
import { CategoryService } from '../../core/service/category.service';
import { City } from '../../core/models/Citys';
import { School } from '../../core/models/School';
import { Form } from '../../core/modules/input.module';
import { Category } from './../../core/models/Category';

@Component({
  selector: 'app-athlete-registration-update',
  standalone: true,
  imports: [
    Form,
    MatCardModule,
    MatDividerModule,
    RouterLink,
    NgxMaskDirective,
    AsyncPipe,
    NgClass,
  ],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './athlete-registration-update.component.html',
  styleUrl: './athlete-registration-update.component.scss'
})
export class AthleteRegistrationUpdateComponent implements OnInit {

  citys!: City[];
  schools: School[] = [] as School[];
  categorys!: Category[];
  filteredOptionsNaturalness!: Observable<City[]>;
  filteredOptionsElectoralDomicile!: Observable<City[]>;
  filteredOptionsCity!: Observable<City[]>;
  result!: Athlete;

  formEnrollment!: FormGroup;
  formEnrollmentUpdate!: FormGroup;
  formResponsible: FormGroup| null = null;


  loadingSubmitForm: boolean = false;
  openForm: boolean = false;

  constructor(
    private storeService: StoreService,
    private schoolService: SchoolService,
    private personService: PersonService,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ){}

  ngOnInit(): void {;
    this.loadPage();
  }

  onSubmitEnrollment(){
    if(this.formEnrollment.valid){
      this.loadingSubmitForm = true;
      this.personService.getEnrollmentAthelete(this.formEnrollment.controls['enrollment'].value).subscribe(
        response => {
          if(response.value == null){
            this.openForm = false;
            this.storeService.showMessage({
              type: 'warning',
              title: `Usuário não encontrado`,
              timing: 4000
            });
            this.loadingSubmitForm = false;
            return;
          }

          response.value.educationLevel = response.value.school_id != null ? 1 : 0;
          response.value.electoral = response.value.electoralDomicile != null ? 1 : 0;
          response.value.responsible = null;

          this.formEnrollmentUpdate.patchValue(response.value);
          this.openForm = true;

          this.loadingSubmitForm = false;
        },
        () => {
          this.storeService.showMessage({
            type: 'error',
            title: `Error ao pesquisar, tente novamente!`,
            timing: 4000
          });

          this.loadingSubmitForm = false;
          this.openForm = false;
        }
      );
    }
  }

  onSubmit(){
    if(this.formEnrollmentUpdate.valid){
      if(this.formResponsible != null && this.formResponsible.invalid){
        return;
      }

      const value = this.formEnrollmentUpdate.value;
      value.responsible = this.formResponsible != null? this.formResponsible.value : null;

      this.personService.updatePersonParcial(value).subscribe(respnse => {
          this.storeService.showMessage({
            type: 'success',
            title: `Sucesso ao finalizar seu cadastro!`,
            timing: 4000
          });
        },() => {
          this.storeService.showMessage({
            type: 'error',
            title: `Error ao cadastra, Entre em contato com Diackson Marques para arrumar!`,
            timing: 4000
          });
        }
      )
    }
  }

  loadPage(): void{
    forkJoin({
      citys: this.storeService.citysAndState(),
      schools: this.schoolService.getAll(),
      categorys: this.categoryService.getAll(),
    }).subscribe(response => {
      this.citys = response.citys;
      this.schools = response.schools;
      this.categorys = response.categorys;
    },()=>{},
    ()=> {
      this.filteredOptionsNaturalness = this.formEnrollmentUpdate.controls['naturalness'].valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );

      this.filteredOptionsElectoralDomicile = this.formEnrollmentUpdate.controls['electoralDomicile'].valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );

      this.filteredOptionsCity = this.formEnrollmentUpdate.controls['city'].valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );
    });

    this.formEnrollment = this.formBuilder.group({
      enrollment: [null, [Validators.required, Validators.minLength(7)]],
    });

    this.formEnrollmentUpdate = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(5)]],
      naturalness: [null, Validators.required],
      birthDate: [{value: null, disabled: true}, Validators.required],
      height: [null, Validators.required],
      weight: [null, Validators.required],
      gender: [{value: null, disabled: true}, Validators.required],
      educationLevel: [null, Validators.required],
      school_id: [null],
      ddPhone: [null, [Validators.required, Validators.minLength(2)]],
      numberPhone: [null, [Validators.required, Validators.minLength(9)]],
      electoral: [null, Validators.required],
      electoralDomicile: [null],
      cpf: [null, Validators.required],
      category: [{value: null, disabled: true}, Validators.required],
      rg: [null, Validators.required],
      issuingBody: [null, Validators.required],
      ufEmitter: [null, Validators.required],
      cep: [null, Validators.required],
      adress: [null, Validators.required],
      neighborhood: [null, Validators.required],
      city: [null, Validators.required],
      responsible: null
    });
    this.addValidator();

    this.formEnrollmentUpdate.controls['birthDate'].valueChanges.subscribe(value => {
      if(!value){
        return;
      }
      const date = new Date(value);

      if(date.getFullYear() > 2005){
        this.formResponsible = this.formBuilder.group({
          name: [null, [Validators.required, Validators.minLength(5)]],
          ddPhone: [null, [Validators.required, Validators.minLength(2)]],
          numberPhone: [null, [Validators.required, Validators.minLength(9)]],
          cep: [null, Validators.required],
          adress: [null, Validators.required],
          neighborhood: [null, Validators.required],
          city: [null, Validators.required],
        });
      } else {
        this.formResponsible = null;
      }
    });
  }

  addValidator(): void {
    this.formEnrollmentUpdate.controls['educationLevel'].valueChanges.subscribe(value => {
      if(value == 1){
        this.formEnrollmentUpdate.controls['school_id'].addValidators(Validators.required);
      } else if (value == 0){
        this.formEnrollmentUpdate.controls['school_id'].removeValidators(Validators.required);
      }

      this.formEnrollmentUpdate.controls['school_id'].updateValueAndValidity();
    });

    this.formEnrollmentUpdate.controls['electoral'].valueChanges.subscribe(value => {
      if(value == 1){
        this.formEnrollmentUpdate.controls['electoralDomicile'].addValidators(Validators.required);
      } else if (value == 0){
        this.formEnrollmentUpdate.controls['electoralDomicile'].removeValidators(Validators.required);
      }

      this.formEnrollmentUpdate.controls['electoralDomicile'].updateValueAndValidity();
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
