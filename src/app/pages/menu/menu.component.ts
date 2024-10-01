import { AuthService } from './../../core/service/auth.service';
import { UserService } from './../../core/service/user.service';
import { StoreService } from './../../core/service/store.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Role } from '../../core/models/Role';
import { firstValueFrom } from 'rxjs';
import { User } from '../../core/models/User';
import { response } from 'express';

@Component({
  selector: 'outlet-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    MatIconModule,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  mobileScreen: any = window.innerWidth;
  roleMenu!: Role;
  user!: User;

  constructor(
    private storeService: StoreService,
    private userService: UserService,
    public authService: AuthService
  ){}

  ngOnInit(): void {
    this.loadPage();
  }

  async loadPage(){
    this.user = await firstValueFrom(this.userService.getUser());

    this.storeService.showDataMenu(this.user.role).subscribe(response => this.roleMenu = response);
  }
}
