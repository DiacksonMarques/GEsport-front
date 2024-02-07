import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MenubarModule } from 'primeng/menubar';
import { JsonPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatIconModule,
    MenubarModule,
    NgClass,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  menuOpen: boolean = true
}
