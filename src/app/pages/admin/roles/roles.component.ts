import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessageService, SelectItem } from 'primeng/api';
import { RolesService } from '../../../core/service/roles.service';
import { Role } from '../../../core/models/Role';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [
    TableModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    CurrencyPipe,
    DropdownModule
  ],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss'
})
export class RolesComponent implements OnInit {
  products!: Role[];
  statuses!: SelectItem[];

  clonedProducts: { [s: string]: Role } = {};

  constructor(private productService: RolesService, private messageService: MessageService) {}

  ngOnInit() {
      this.productService.getProductsMini().then((data) => {
          this.products = data;
      });

      this.statuses = [
          { label: 'In Stock', value: 'INSTOCK' },
          { label: 'Low Stock', value: 'LOWSTOCK' },
          { label: 'Out of Stock', value: 'OUTOFSTOCK' }
      ];
  }

  onRowEditInit(product: Role) {
      this.clonedProducts[product.id as string] = { ...product };
  }

  onRowEditSave(product: Role) {
      if (product.price > 0) {
          delete this.clonedProducts[product.id as string];
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is updated' });
      } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Price' });
      }
  }

  onRowEditCancel(product: Role, index: number) {
      this.products[index] = this.clonedProducts[product.id as string];
      delete this.clonedProducts[product.id as string];
  }
}
