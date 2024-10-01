import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { StoreService } from './core/service/store.service';
import { MenuComponent } from './pages/menu/menu.component';
import { TokenService } from './core/service/token.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'GEsport';
  public isLogged: boolean = false;

  constructor(
    private tokenService: TokenService,
  ){}

  ngOnInit() {
    this.tokenService.isLogged$.subscribe(value => this.isLogged = value);
  }

}
