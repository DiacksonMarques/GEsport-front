import { ChampionshipService } from './../../../core/service/championship.service';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TableComponent } from '../../../../shared/table/table.component';
import { Form } from '../../../core/modules/input.module';
import { ColumnsTable } from '../../../../shared/table/Table';
import { Championship } from '../../../core/models/Championship';
import { NgxMaskService } from 'ngx-mask';

@Component({
  selector: 'app-championship-view',
  standalone: true,
  imports: [
    TableComponent,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    Form,

  ],
  templateUrl: './championship-view.component.html',
  styleUrl: './championship-view.component.scss'
})
export class ChampionshipViewComponent {
  displayedColumnsTableSales = [
    { columnName: 'Incrição', tableColumn: 'enrollment',  },
    { columnName: 'Time', tableColumn: 'name', complement: this.returnComplementTeam },
    { columnName: 'Categoria', tableColumn: 'category' },
    { columnName: 'Naipe', tableColumn: 'naipe'},
    { columnName: 'Cidade', tableColumn: 'view', complement: this.returnComplementCity},
    { columnName: 'Nome', tableColumn: 'responsibleN', complement: this.returnComplementResponsible},
    { columnName: 'Celular', tableColumn: 'responsibleP', complement: this.returnComplementResponsibleP.bind(this)}
  ] as ColumnsTable[];
  championship!: Championship[];
  championshipCopy!: Championship[];
  loadTable = false;

  constructor(
    private championshipService: ChampionshipService,
    private ngxMaskService: NgxMaskService
  ){this.loadPage()}

  private loadPage(): void{
    this.loadTable = true;
    this.championshipService.allTeams().subscribe(value => {
      this.championship = value.value;
      this.championship = value.value;
      this.loadTable = false;
    }, () => this.loadTable = false);
  }

  private returnComplementTeam(value: Championship): string{
    return `${value.name} - ${value.acronym}`;
  }

  private returnComplementCity(value: Championship): string{
    return `${value.city.name} - ${value.city.uf}`;
  }

  private returnComplementResponsible(value: Championship): string{
    return `${value.responsible.name}`;
  }

  private returnComplementResponsibleP(value: Championship): string{
    return this.ngxMaskService.applyMask(value.responsible.phone, '(00) 0 0000-0000');;
  }
}
