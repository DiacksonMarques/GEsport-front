import { StoreService } from './../../core/service/store.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

import { Form } from '../../core/modules/input.module';
import { PersonService } from '../../core/service/person.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Athlete } from '../../core/models/Athlete'
import { SelectiveService } from '../../core/service/selective.service';
import { Candidate } from '../../core/models/Candidate';
import { TrackRegistrationComponent } from './track-registration/track-registration.component';
import { ResultRegistrationComponent } from './result-registration/result-registration.component';


@Component({
  selector: 'app-inscricao',
  standalone: true,
  imports: [
    Form,
    MatDividerModule,
    RouterLink,
    NgxMaskDirective,

    TrackRegistrationComponent,
    ResultRegistrationComponent
  ],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './inscricao.component.html',
  styleUrl: './inscricao.component.scss'
})
export class InscricaoComponent implements OnInit {
  formEnrollment!: FormGroup;
  result!: Candidate;

  loadingSubmitForm: boolean = false;
  link!: string;

  checkTypeInformation: number|null = null;

  constructor(
    private formBuilder: FormBuilder,
    private storeService: StoreService,
    private selectiveService: SelectiveService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.loadPage();

    if(this.route.snapshot.params?.['enrollment']){
      this.formEnrollment.controls['enrollment'].setValue(this.route.snapshot.params['enrollment']);
      this.onSubmitEnrollment();
    }
  }

  onSubmitEnrollment(){
    if(this.formEnrollment.valid){
      this.loadingSubmitForm = true;
      this.selectiveService.getCandidate(this.formEnrollment.controls['enrollment'].value).subscribe(
        response => {
          if(response.value != null &&
            response.value.enrollment != null &&
            response.value.result == null
          ){
            this.checkTypeInformation = 1;
            this.result = response.value;

          }  else if(response.value.result != null) {

            this.checkTypeInformation = 1;
            this.result = response.value;

          } else {
            this.storeService.showMessage({
              type: 'warning',
              title: `Inscrição não encontrada`,
              timing: 4000
            });

            this.checkTypeInformation = null;
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
      enrollment: [null, [Validators.required, Validators.minLength(6)]],
    })
  }
}
