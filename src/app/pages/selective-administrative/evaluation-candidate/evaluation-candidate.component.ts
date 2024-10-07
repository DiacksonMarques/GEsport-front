import { Component } from '@angular/core';
import { Form } from '../../../core/modules/input.module';
import { TableComponent } from '../../../../shared/table/table.component';
import { ColumnsTable } from '../../../../shared/table/Table';
import { Candidate } from '../../../core/models/Candidate';
import { SelectiveService } from '../../../core/service/selective.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogEvaluationComponent } from './dialog-evaluation/dialog-evaluation.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-evaluation-candidate',
  standalone: true,
  imports: [
    Form,
    TableComponent,
    MatDialogModule,
    MatButtonToggleModule,
  ],
  templateUrl: './evaluation-candidate.component.html',
  styleUrl: './evaluation-candidate.component.scss'
})
export class EvaluationCandidateComponent {

  displayedColumns = [
    { columnName: 'Inscrição', tableColumn: 'enrollment' },
    { columnName: 'Nome', tableColumn: 'name' },
    { columnName: 'Confirma', tableColumn: 'button', button: {loading: false, icon: 'assignment_turned_in', description: 'Avaliar', disabled: true}}
  ] as ColumnsTable[];
  candidates!: Candidate[];

  inputAppraiser = new FormControl(null as string|null, Validators.required);
  checkButtonAppraiser = false;
  formSearch!: FormGroup;

  constructor(
    private selectiveService: SelectiveService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ){
    this.checkAppraiser();
    this.loadForm();
  }

  saveAppraiser(): void{
    if(this.inputAppraiser.invalid){
      this.inputAppraiser.markAsTouched();
    }

    if(this.inputAppraiser.value){
      localStorage.setItem('appraiserStorage', this.inputAppraiser.value);
      this.checkAppraiser();
    }
  }

  deleteAppraiser(){
    localStorage.removeItem('appraiserStorage');
    this.inputAppraiser.enable();
    this.checkButtonAppraiser = false;
    this.displayedColumns[2].button!.disabled = true;
  }

  openDialog(value: Candidate) {
    const dialogRef = this.dialog.open(DialogEvaluationComponent,
      {
        data: value,
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if(result == 'load'){
        const valueForm = this.formSearch.value;
        this.loadTable(valueForm.gender, valueForm.hour);
      }
    });
  }

  loadForm(): void {
    this.formSearch = this.formBuilder.group({
      hour: [null],
      gender: [null]
    });

    this.formSearch.valueChanges.subscribe(value => {
      if(value.gender && value.hour){
        this.loadTable(value.gender, value.hour);
      }
    })
  }

  private loadTable(hour: string, gender: string): void{
    this.selectiveService.getCandidateForEvaluation(hour, gender).subscribe(response => {
      this.candidates = response;
    });
  }

  private checkAppraiser(){
    if(localStorage.getItem('appraiserStorage')){
      this.inputAppraiser.patchValue(localStorage.getItem('appraiserStorage'));
      if(this.inputAppraiser.valid){
        this.displayedColumns[2].button!.disabled = false;
      }

      this.inputAppraiser.disable();
      this.checkButtonAppraiser = true;
    }
  }
}
