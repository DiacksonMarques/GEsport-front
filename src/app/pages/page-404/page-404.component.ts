import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-page-404',
  standalone: true,
  imports: [
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './page-404.component.html',
  styleUrl: './page-404.component.scss'
})
export class Page404Component {

}
