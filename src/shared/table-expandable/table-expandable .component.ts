import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { getPortuguesePaginatorIntl } from './portuguese-pager-intl';
import { ColumnsTable } from './Table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ButtonLoadingComponent } from '../button-loading/button-loading.component';
import { NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import  {MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatButtonModule } from '@angular/material/button';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'table-expandable',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTooltipModule,
    CurrencyPipe,
    DatePipe,
    ButtonLoadingComponent,
    NgxMaskPipe,
    MatProgressSpinnerModule,
    MatIcon,
    MatButtonModule,
    NgTemplateOutlet,
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getPortuguesePaginatorIntl() },
    provideNgxMask()
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  templateUrl: './table-expandable .component.html',
  styleUrl: './table-expandable .component.scss'
})
export class TableExpandableComponent implements AfterViewInit, OnInit {
  @Input('tableColumns') displayedColumns!: ColumnsTable[];
  @Input('dataSourceData')
  set _dataSourceData(value: any[]){
    if(this.dataSource){
      this.dataSource.data = [...value];
    } else {
      this.dataSourceData = value;
    }
  };
  @Input('filterTable')
  set _filterTableDataSourceData(filterValue: string){
    if(this.dataSource){
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  };
  @Input() spinnerLoader = false;
  @Input() template!: TemplateRef<any>;

  dataSource!: MatTableDataSource<any>;
  columnsHeader!: string[];
  dataSourceData!: any[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort

  expandedElement: any;
  constructor() {}

  ngOnInit(): void {
    this.addColumnsHeader();
    this.dataSource = new MatTableDataSource(this.dataSourceData);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private addColumnsHeader(): void{
    this.columnsHeader = [];
    this.displayedColumns.forEach(value => {
      this.columnsHeader.push(value.tableColumn);
    });
    this.columnsHeader.push("expand");
  }
}
