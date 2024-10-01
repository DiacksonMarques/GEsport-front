import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { NgClass } from '@angular/common';
import { AuthService } from '../../core/service/auth.service';
import { UserService } from '../../core/service/user.service';
import { finalize, first } from 'rxjs';
import { Form } from '../../core/modules/input.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    Form,
    NgClass
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  public formLogin!: FormGroup;

  loadingSubmitForm!: boolean;

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
      this.loadingSubmitForm = true;

      this.authService.authenticate(signInForm.value.username, signInForm.value.password).pipe(
        first(),
        finalize(() => this.loadingSubmitForm = false)
      )
      .subscribe(
        () => {}
      );
    }
  }

  private loadForm(): void {
    this.formLogin = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }
}
