import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'core/services/auth-service/auth.service';
import { ButtonComponent } from 'shared/components/button/button.component';

import { InputComponent } from 'shared/components/input/input.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, ButtonComponent, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showErrorMsg = false;
  errorMsg = '';

  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({

        next: (response) => {
          localStorage.setItem('token-user', response.token);
          this.router.navigate(['/inicio']);
        },
        error: (err) => {
          this.showErrorMsg = true;
          this.errorMsg =  err.error?.msg || 'Ha ocurrido un error. Inténtalo de nuevo más tarde.';
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  get emailControl(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }
}
