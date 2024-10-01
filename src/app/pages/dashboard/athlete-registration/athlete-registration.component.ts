import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AsyncPipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

import { Observable, forkJoin, map, startWith } from 'rxjs';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

import { StoreService } from '../../../core/service/store.service';
import { SchoolService } from '../../../core/service/school.service';
import { PersonService } from '../../../core/service/person.service';
import { CategoryService } from '../../../core/service/category.service';
import { City } from '../../../core/models/Citys';
import { School } from '../../../core/models/School';
import { Form } from '../../../core/modules/input.module';
import { Category } from '../../../core/models/Category';

@Component({
  selector: 'app-athlete-registration',
  standalone: true,
  imports: [
    Form,
    MatCardModule,
    MatDividerModule,
    NgClass,
    AsyncPipe,
    RouterLink,
    NgxMaskDirective
  ],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './athlete-registration.component.html',
  styleUrl: './athlete-registration.component.scss'
})
export class AthleteRegistrationComponent implements OnInit{
  citys!: City[];
  schools: School[] = [] as School[];
  categorys!: Category[];
  filteredOptionsNaturalness!: Observable<City[]>;
  filteredOptionsElectoralDomicile!: Observable<City[]>;
  filteredOptionsCity!: Observable<City[]>;

  loadingSubmitForm: boolean = false;

  formEnrollment!: FormGroup;
  formResponsible: FormGroup| null = null;

  constructor(
    private storeService: StoreService,
    private schoolService: SchoolService,
    private personService: PersonService,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ){}

  ngOnInit(): void {
    this.loadPage();
  }

  onSubmit(): void {
    if(this.formEnrollment.valid){
      if(this.formResponsible != null && this.formResponsible.invalid){
        return;
      }

      const value = this.formEnrollment.value;
      value.responsible = this.formResponsible != null? this.formResponsible.value : null;

      this.personService.createPersonParcial(value).subscribe(respnse => {
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
      this.filteredOptionsNaturalness = this.formEnrollment.controls['naturalness'].valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );

      this.filteredOptionsElectoralDomicile = this.formEnrollment.controls['electoralDomicile'].valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );

      this.filteredOptionsCity = this.formEnrollment.controls['city'].valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );
    });

    this.formEnrollment = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(5)]],
      naturalness: [null, Validators.required],
      birthDate: [null, Validators.required],
      height: [null, Validators.required],
      weight: [null, Validators.required],
      gender: [null, Validators.required],
      educationLevel: [null, Validators.required],
      school_id: [null],
      ddPhone: [null, [Validators.required, Validators.minLength(2)]],
      numberPhone: [null, [Validators.required, Validators.minLength(9)]],
      electoral: [null, Validators.required],
      electoralDomicile: [null],
      cpf: [null, Validators.required],
      category: [null, Validators.required],
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

    this.formEnrollment.controls['birthDate'].valueChanges.subscribe(value => {
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
    this.formEnrollment.controls['educationLevel'].valueChanges.subscribe(value => {
      if(value == 1){
        this.formEnrollment.controls['school_id'].addValidators(Validators.required);
      } else if (value == 0){
        this.formEnrollment.controls['school_id'].removeValidators(Validators.required);
      }

      this.formEnrollment.controls['school_id'].updateValueAndValidity();
    });

    this.formEnrollment.controls['electoral'].valueChanges.subscribe(value => {
      if(value == 1){
        this.formEnrollment.controls['electoralDomicile'].addValidators(Validators.required);
      } else if (value == 0){
        this.formEnrollment.controls['electoralDomicile'].removeValidators(Validators.required);
      }

      this.formEnrollment.controls['electoralDomicile'].updateValueAndValidity();
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
