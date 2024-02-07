import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import {MatIconModule} from '@angular/material/icon';
import { MenubarModule } from 'primeng/menubar';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgClass,
    AvatarModule,
    AvatarGroupModule,
    MatIconModule,
    MenubarModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent{
}
