import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Application } from 'core/models/application.model';
import { ApplicationService } from 'core/services/application-service/application.service';
import { ButtonComponent } from 'shared/components/button/button.component';
import { InputComponent } from 'shared/components/input/input.component';

@Component({
  selector: 'app-add-application-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, ButtonComponent],
  templateUrl: './add-application-form.component.html',
  styleUrl: './add-application-form.component.scss',
})
export class AddApplicationFormComponent {
  applicationForm!: FormGroup;
  showErrorMsg = false;
  errorMsg = '';

  private fb = inject(FormBuilder);
  private applicationService = inject(ApplicationService);
  dialogRef = inject<DialogRef<Application>>(DialogRef<string>);
  data = inject(DIALOG_DATA);


  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.applicationForm = this.fb.group({
      title: ['', [Validators.required]],
      company: ['', [Validators.required]],
      location: ['', []],
      // url: ['', []],
      // imageUrl: ['', []],
      // description: ['', []],
      // platform: ['', []],
      boardId: [this.data.boardId, []],
      status: [this.data.status, []],
    });
  }

  onSubmit() {
    if (this.applicationForm.valid) {
      this.applicationService.addApplication(this.applicationForm.value).subscribe({
        next: (response: Application) => {
          this.dialogRef.close(response);
        },
        error: (err) => {
          console.log('Ha habido un error:', err)
        },
      });
    } else {
      this.applicationForm.markAllAsTouched();
    }
  }

  get titleControl(): FormControl {
    return this.applicationForm.get('title') as FormControl;
  }

  get companyControl(): FormControl {
    return this.applicationForm.get('company') as FormControl;
  }

  get imageUrlControl(): FormControl {
    return this.applicationForm.get('imageUrl') as FormControl;
  }

  get locationControl(): FormControl {
    return this.applicationForm.get('location') as FormControl;
  }

  get urlControl(): FormControl {
    return this.applicationForm.get('url') as FormControl;
  }

  get descriptionControl(): FormControl {
    return this.applicationForm.get('description') as FormControl;
  }


}
