import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'button-loading',
  standalone: true,
  imports: [
    MatButtonModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './button-loading.component.html',
  styleUrl: './button-loading.component.scss'
})
export class ButtonLoadingComponent {
  @Input() loading = false;
  @Input() disabled = false;
  @Input() type = 'button';
  @Input() color = '';
  @Input() description = 'Click me!';
  @Input() class!: string;
  @Input() icon!: string;
  @Input() iconNext!: string;
}
