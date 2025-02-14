import { Component } from '@angular/core';
import { Form } from '../../../core/modules/input.module';
import { TableComponent } from '../../../../shared/table/table.component';
import { ColumnsTable } from '../../../../shared/table/Table';
import { Candidate } from '../../../core/models/Candidate';
import { SelectiveService } from '../../../core/service/selective.service';

@Component({
  selector: 'app-confirm-presence',
  standalone: true,
  imports: [
    Form,
    TableComponent
  ],
  templateUrl: './confirm-presence.component.html',
  styleUrl: './confirm-presence.component.scss'
})
export class ConfirmPresenceComponent {

  displayedColumns = [
    { columnName: 'Inscrição', tableColumn: 'enrollment' },
    { columnName: 'Nome', tableColumn: 'name' },
    { columnName: 'CPF', tableColumn: 'cpf', mask: 'cpf' },
    { columnName: 'Confirma', tableColumn: 'button', button: {loading: false, icon: 'send', description: 'Presença'}}
  ] as ColumnsTable[];
  candidates!: Candidate[];
  loadingCandidates = false

  constructor(
    private selectiveService: SelectiveService
  ){
    this.loadPage();
  }

  confirmCandidate(value: Candidate): void{
    this.displayedColumns[3].button!.loading = true;

    this.selectiveService.confirmPresence(value.enrollment)
    .subscribe(response => {
      if(response.approvedRegistration){
        this.candidates = [];
        this.loadPage();
      }

      this.displayedColumns[3].button!.loading = false;
    }, () => {
      this.displayedColumns[3].button!.loading = false;
    });
  }

  loadPage(): void{
    console.log('passei');

    this.loadingCandidates = true;
    this.selectiveService.getCandidatePayment().subscribe(response => {
      this.candidates = response;
      this.loadingCandidates = false;
    },()=> this.loadingCandidates=false);
  }
}
