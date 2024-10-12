import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Candidate } from '../../../../core/models/Candidate';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Form } from '../../../../core/modules/input.module';
import { SelectiveService } from '../../../../core/service/selective.service';

@Component({
  selector: 'app-dialog-evaluation',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonToggleModule,
    MatButtonModule,
    Form
  ],
  templateUrl: './dialog-evaluation.component.html',
  styleUrl: './dialog-evaluation.component.scss'
})
export class DialogEvaluationComponent {

  formEvaluation!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<DialogEvaluationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Candidate,

    private formBuilder: FormBuilder,
    private selectiveService: SelectiveService,
  ){
    this.formEvaluation = this.formBuilder.group({
      headline: [null],
      touch: [null],
      service: [null],
      frontDesk: [null],
      defense: [null],
      attack: [null],
      lock: [null],
      appraiser: [localStorage.getItem('appraiserStorage')]
    });

    if(this.data.result != null){
      const index = this.data.result.findIndex(value => value.appraiser == localStorage.getItem('appraiserStorage'));
      console.log(index);

      this.formEvaluation.patchValue(this.data.result[index]);
    }
  }

  onSubmit(): void{
    if(this.formEvaluation.invalid){
      this.formEvaluation.markAllAsTouched();
      return;
    }

    this.selectiveService.resultCandidate(this.data.enrollment, this.formEvaluation.value).subscribe(response => {
      if(response.result.length){
        this.dialogRef.close('load');
      }
    });
  }

  checkTyeResult(): string{
    return typeof this.data.result;
  }
}
