import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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

@Component({
  selector: 'table-paginator',
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
    MatIcon
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getPortuguesePaginatorIntl() },
    provideNgxMask()
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements AfterViewInit, OnInit {
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

  dataSource!: MatTableDataSource<any>;
  columnsHeader!: string[];
  dataSourceData!: any[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort

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
    })
  }
}
