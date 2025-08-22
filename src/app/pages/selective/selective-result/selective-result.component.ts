import { Component, OnInit } from '@angular/core';
import { Form } from '../../../core/modules/input.module';
import { MatDividerModule } from '@angular/material/divider';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ResultRegistrationComponent } from './result-registration/result-registration.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Candidate } from '../../../core/models/Candidate';
import { SelectiveService } from '../../../core/service/selective.service';
import { StoreService } from '../../../core/service/store.service';
import { TrackRegistrationComponent } from './track-registration/track-registration.component';

@Component({
  selector: 'app-selective-result',
  standalone: true,
  imports: [
    Form,
    MatDividerModule,

    TrackRegistrationComponent,
    ResultRegistrationComponent
  ],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './selective-result.component.html',
  styleUrl: './selective-result.component.scss'
})
export class SelectiveResultComponent implements OnInit {
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
            this.checkTypeInformation = 0;
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
