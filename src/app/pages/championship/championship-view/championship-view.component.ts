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
import { TableExpandableComponent } from '../../../../shared/table-expandable/table-expandable .component';
import { MatListModule } from '@angular/material/list';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-championship-view',
  standalone: true,
  imports: [
    TableExpandableComponent,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    Form,
    MatListModule,
  ],
  templateUrl: './championship-view.component.html',
  styleUrl: './championship-view.component.scss'
})
export class ChampionshipViewComponent {
  displayedColumnsTableSales = [
    { columnName: 'Incrição', tableColumn: 'enrollment'},
    { columnName: 'Time', tableColumn: 'name', complement: this.returnComplementTeam },
    { columnName: 'Categorias', tableColumn: 'categoriesLength', complement: this.returnCategoriesLength },
    { columnName: 'Cidade', tableColumn: 'view', complement: this.returnComplementCity},
    { columnName: 'Nome', tableColumn: 'responsibleN', complement: this.returnComplementResponsible},
    { columnName: 'Celular', tableColumn: 'responsibleP', complement: this.returnComplementResponsibleP.bind(this)}
  ] as ColumnsTable[];
  championship!: Championship[];
  championshipCopy!: Championship[];
  loadTable = false;

  listNaipesSelect = [
    {value: "AMB", label:"Masc e Femi"},
    {value: "MASCULINO", label:"Masculino"},
    {value: "FEMININO", label:"Feminino"},
  ];

  listCategoriesSelect = [
    {value: "ADL", label:"Adulto"},
    {value: "SUB19", label:"Sub-19"},
    {value: "SUB17", label:"Sub-17"},
    {value: "SUB14", label:"Sub-14"},
  ];

  constructor(
    private championshipService: ChampionshipService,
    private ngxMaskService: NgxMaskService
  ){this.loadPage()}

  labelCategory(value: string){
    return this.listCategoriesSelect.find(category => category.value == value)?.label
  }

  labelNaipe(value: string){
    return this.listNaipesSelect.find(naipe => naipe.value == value)?.label
  }

  private loadPage(): void{
    this.loadTable = true;
    this.championshipService.allTeams().subscribe(value => {
      this.championship = value.value;
      this.championshipCopy = value.value;
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
    return this.ngxMaskService.applyMask(value.responsible.phone, '(00) 0 0000-0000');
  }

  private returnCategoriesLength(value: Championship): string{
    return `${value.categories.length}`;
  }
}
