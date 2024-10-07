import { MatTableDataSource } from '@angular/material/table';
import { Candidate } from './../../../core/models/Candidate';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectiveService } from '../../../core/service/selective.service';
import { Form } from '../../../core/modules/input.module';
import { MatTableModule } from '@angular/material/table';
import { TableComponent } from '../../../../shared/table/table.component';
import { ColumnsTable } from '../../../../shared/table/Table';

@Component({
  selector: 'app-defer-candidate',
  standalone: true,
  imports: [
    Form,
    TableComponent
  ],
  templateUrl: './defer-candidate.component.html',
  styleUrl: './defer-candidate.component.scss'
})
export class DeferCandidateComponent {

  displayedColumns = [
    { columnName: 'Inscrição', tableColumn: 'enrollment' },
    { columnName: 'Nome', tableColumn: 'name' },
    { columnName: 'Nome Pix', tableColumn: 'namePix' },
    { columnName: 'Deferir', tableColumn: 'button', button: {loading: false, icon: 'move_to_inbox', description: 'Deferir'}}
  ] as ColumnsTable[];
  candidates!: Candidate[];


  constructor(
    private selectiveService: SelectiveService
  ){
    this.loadPage();
  }

  deferCandidate(value: Candidate): void{
    this.displayedColumns[3].button!.loading = true;
    this.selectiveService.deferCandidate(value.enrollment)
    .subscribe(response => {
      if(response.approvedPix){
        this.loadPage();
      }
      this.displayedColumns[3].button!.loading = false;
    }, () => {
      this.displayedColumns[3].button!.loading = false;
    });
  }

  loadPage(): void{
    this.selectiveService.getCandidateNotDefer().subscribe(response => {
      this.candidates = response;
    });
  }
}
