import { ChampionshipService } from './../../../core/service/championship.service';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Form } from '../../../core/modules/input.module';
import { ColumnsTable } from '../../../../shared/table/Table';
import { Championship } from '../../../core/models/Championship';
import { NgxMaskService } from 'ngx-mask';
import { TableExpandableComponent } from '../../../../shared/table-expandable/table-expandable .component';
import { MatListModule } from '@angular/material/list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormControl } from '@angular/forms';


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
    MatButtonToggleModule
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

  filterCategory!: FormControl;
  filterNaipe!: FormControl;

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
    this.filterCategory = new FormControl('TODOS');
    this.filterNaipe = new FormControl(['FEMININO','MASCULINO']);
    this.changeFilter();

    this.loadTable = true;
    this.championshipService.allTeams().subscribe(value => {
      this.championship = value.value;
      this.championshipCopy = value.value;
      this.loadTable = false;
    }, () => this.loadTable = false);
  }

  private changeFilter(): void{
    this.filterCategory.valueChanges.subscribe(_ =>{
      this.filterChampionship();
    });

    this.filterNaipe.valueChanges.subscribe(_ =>{
      this.filterChampionship();
    });
  }

  private filterChampionship(): void{
    const filterNaipe = this.naipeSelect();
    const filterCategory = this.filterCategory.value;
    const championshipFilter:Championship[] = [];

    this.championshipCopy.forEach(value => {
      if(value.categories.some(value => value.category == filterCategory && (value.naipe == filterNaipe || filterNaipe == 'AMB'))){
        championshipFilter.push(value);
      } else if(filterCategory == "TODOS" && (value.categories.some(value => value.naipe == filterNaipe || filterNaipe == 'AMB'))){
        championshipFilter.push(value);
      }
    });

    this.championship = championshipFilter;
  }

  private naipeSelect(): string{
    const filterNaipe = this.filterNaipe.value;

    if(filterNaipe.length == 1){
      return filterNaipe[0];
    }

    return 'AMB';
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
