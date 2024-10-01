import { MatIconModule } from '@angular/material/icon';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-result-registration',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './result-registration.component.html',
  styleUrl: './result-registration.component.scss'
})
export class ResultRegistrationComponent {

}
