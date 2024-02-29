import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { ButtonLoadingComponent } from '../../../shared/button-loading/button-loading.component';

export const Form = [
  FormsModule,
  ReactiveFormsModule,

  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  MatAutocompleteModule,
  MatButtonModule,
  ButtonLoadingComponent,
  MatIconModule
]
