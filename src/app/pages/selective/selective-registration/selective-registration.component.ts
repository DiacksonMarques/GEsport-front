import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../../core/service/store.service';
import { SchoolService } from '../../../core/service/school.service';
import { SelectiveService } from '../../../core/service/selective.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../core/service/category.service';
import { Form } from '../../../core/modules/input.module';
import { NgxMaskDirective } from 'ngx-mask';
import { City } from '../../../core/models/Citys';
import { School } from '../../../core/models/School';
import { forkJoin, map, Observable, startWith } from 'rxjs';
import { Category } from '../../../core/models/Category';
import { AsyncPipe, NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { Candidate } from '../../../core/models/Candidate';

@Component({
  selector: 'app-selective-registration',
  standalone: true,
  imports: [
    Form,
    NgxMaskDirective,
    NgClass
  ],
  templateUrl: './selective-registration.component.html',
  styleUrl: './selective-registration.component.scss'
})
export class SelectiveRegistrationComponent implements OnInit{

  schools: School[] = [] as School[];
  categorys!: Category[];

  loadingSubmitForm: boolean = false;

  formCandidate!: FormGroup;

  constructor(
    private storeService: StoreService,
    private schoolService: SchoolService,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private selectiveService: SelectiveService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.loadPage();
  }

  onSubmit(): void {
    if(this.formCandidate.valid){
      this.loadingSubmitForm = true;
      const value = this.formCandidate.value as Candidate;
      
      const yearsAccepted = [2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014];
      const birthDate = new Date(value.birthDate);

      console.log(value);

      if(!yearsAccepted.includes(birthDate.getFullYear())){
        this.storeService.showMessage({
          type: 'warning',
          title: `Idade fora da faixa permitida!`,
          subTitle:`As inscrições para a Seletiva Masculina 2025 estão limitadas a uma faixa etária específica. 
            Caso sua idade não se enquadre, o sistema bloqueará o cadastro. Se ainda assim tiver interesse, fale com o clube pelo Instagram @acevoleibol.clube`,
          buttons:[{
            type: 'primary',
            text: 'Fechar',
            function: 'close'
          }]
        });
        this.loadingSubmitForm = false;
        return;
      }

      this.selectiveService.createCandidate(value).subscribe(response => {
          this.storeService.showMessage({
            type: 'success',
            title: `Sucesso ao finalizar seu cadastro!`,
            timing: 7000
          });

          this.router.navigateByUrl(`/seletiva/acompanhe/${response.enrollment}`);
        }, () => {
          this.loadingSubmitForm = false;
        }
      );
    }
  }

  loadPage(): void{
    forkJoin({
      schools: this.schoolService.getAll(),
      categorys: this.categoryService.getAll(),
    }).subscribe(response => {
      this.schools = response.schools;
      this.categorys = response.categorys;
    });

    this.formCandidate = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(5)]],
      birthDate: [null, Validators.required],
      height: [null, Validators.required],
      weight: [null, Validators.required],
      gender: [null, Validators.required],
      ddPhone: [null, [Validators.required, Validators.minLength(2)]],
      numberPhone: [null, [Validators.required, Validators.minLength(9)]],
      educationLevel: [null, Validators.required],
      school_id: [null],
      cpf: [null, Validators.required],
    });
  }
}
