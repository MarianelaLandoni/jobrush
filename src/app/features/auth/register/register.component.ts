import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from 'core/services/auth.service';
import { ButtonComponent } from 'shared/components/button/button.component';
import { InputComponent } from 'shared/components/input/input.component';
import { passwordMatchValidator } from '../validators/password-match.validator';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, InputComponent, ButtonComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm!: FormGroup;
  showErrorMsg = false;
  errorMsg = '';

  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);


  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.registerForm =this.fb.group({
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    },
    {
     validators: passwordMatchValidator(),
    });
  }

  onSubmit() {
    if (this.registerForm.valid){
      this.authService.login(this.registerForm.value).subscribe({
        next: (response) => {
          localStorage.setItem('token-user', response.token);
          this.router.navigate(['/inicio']);
        },
        error: (err) => {
          switch (err.status) {
            case 401:
              this.errorMsg =
                'Email o contraseña incorrectos. Prueba otra vez.';
              break;
            case 404:
              this.errorMsg =
                'Usuario no encontrado. Comprueba que el correo está bien.';
              break;
            case 500:
              this.errorMsg =
                'Error del servidor. Prueba más tarde, por favor.';
              break;
            default:
              this.errorMsg = 'Ha ocurrido un error';
          }
          this.showErrorMsg = true;
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  get userNameControl(): FormControl {
    return this.registerForm.get('userName') as FormControl;
  }

  get emailControl(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }

  get confirmPasswordControl(): FormControl {
    return this.registerForm.get('confirmPassword') as FormControl;
  }
}
