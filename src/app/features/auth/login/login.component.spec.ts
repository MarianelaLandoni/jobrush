import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { AuthService } from 'core/services/auth.service';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceMock: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authServiceMock = jasmine.createSpyObj('AuthService', ['login']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty controls and configured validations', () => {
    const form = component.loginForm;

    expect(form).toBeDefined();
    expect(form.get('email')?.value).toBe('');
    expect(form.get('password')?.value).toBe('');
    expect(form.get('email')?.valid).toBeFalse();
    expect(form.get('password')?.valid).toBeFalse();
  });
});
