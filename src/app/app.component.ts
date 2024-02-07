import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MenubarModule } from 'primeng/menubar';
import { StoreService } from './core/service/store.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatIconModule,
    MenubarModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  title = 'GEspost';
  isLogged = false;

  constructor(
    private storeService: StoreService
  ){}

  ngOnInit(): void {
    this.storeService.isLogged$.subscribe(value => {
      this.isLogged = value;
    });
  }
}
