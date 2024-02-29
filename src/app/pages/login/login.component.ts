import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgClass } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '../../core/service/auth.service';
import { UserService } from '../../core/service/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgClass
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  public formLogin!: FormGroup;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.loadForm();
  }

  submitLogin(signInForm: FormGroup): void {
    if(signInForm.valid){
      this.authService.authenticate(signInForm.value.username, signInForm.value.password).subscribe(response => {

      });
    }
  }

  private loadForm(): void {
    this.formLogin = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }
}
