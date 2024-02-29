import { StoreService } from './../../core/service/store.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

import { Form } from '../../core/modules/input.module';
import { PersonService } from '../../core/service/person.service';
import { RouterLink } from '@angular/router';
import { Athlete } from '../../core/models/Athlete';
import { MessageRequest } from '../../core/models/message';


@Component({
  selector: 'app-inscricao',
  standalone: true,
  imports: [
    Form,
    MatCardModule,
    MatDividerModule,
    RouterLink,
    NgxMaskDirective
  ],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './inscricao.component.html',
  styleUrl: './inscricao.component.scss'
})
export class InscricaoComponent implements OnInit {
  formEnrollment!: FormGroup;
  result!: Athlete;

  loadingSubmitForm: boolean = false;
  typeResult!: number|null;
  link!: string;

  constructor(
    private personService: PersonService,
    private formBuilder: FormBuilder,
    private storeService: StoreService
  ){}

  ngOnInit(): void {;
    this.loadPage();
  }

  onSubmitEnrollment(){
    if(this.formEnrollment.valid){
      this.loadingSubmitForm = true;
      this.personService.getEnrollment(this.formEnrollment.controls['enrollment'].value).subscribe(
        response => {
          if(response.value != null && response.value.enrolment != null){
            this.typeResult = 0;
            this.result = response.value;

            if(this.result.categoryId == 1){
              this.link = 'https://chat.whatsapp.com/Fh5oGwmRtukDC7DIA0SO9p';
            }else if(this.result.gender == "MASCULINO"){
              if(this.result.categoryId == 2){
                this.link = 'https://chat.whatsapp.com/IogBmc1trJZB2lRmjN0nJ7';
              } else {
                this.link = 'https://chat.whatsapp.com/EMAQZh6X7uQ4iJrrQrtO1t';
              }
            } else if(this.result.gender == "FEMININO"){
              if(this.result.categoryId == 2){
                this.link = 'https://chat.whatsapp.com/GeWTxHPiCu453Aovp194N6';
              } else {
                this.link = 'https://chat.whatsapp.com/F7pFeMTuSVFGe7AfBt8AX8';
              }
            }
          } else if(response.value != null && response.value.id != null ){
            this.typeResult = 1;
          }
          else {
            this.storeService.showMessage({
              type: 'warning',
              title: `Inscrição não encontrada`,
              timing: 4000
            });
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
    this.formEnrollment = this.formBuilder.group({
      enrollment: [null, [Validators.required, Validators.minLength(7)]],
    })
  }
}
