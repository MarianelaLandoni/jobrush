import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Application } from 'core/models/application.model';
import { ApplicationService } from 'core/services/application-service/application.service';
import { ButtonComponent } from 'shared/components/button/button.component';

@Component({
  selector: 'app-application-detail',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent],
  templateUrl: './application-detail.component.html',
  styleUrl: './application-detail.component.scss',
})
export class ApplicationDetailComponent {
  dialogRef = inject<DialogRef<Application>>(DialogRef<Application>);
  data = inject(DIALOG_DATA);

  applicationDetailForm!: FormGroup;
  showErrorMsg = false;
  errorMsg = '';

  private fb = inject(FormBuilder);
  private applicationService = inject(ApplicationService);

  ngOnInit(): void {
    console.log(this.data.application);
    this.buildForm();
  }

  buildForm() {
    this.applicationDetailForm = this.fb.group({
      //title: [''],
      //company: ['', []],
      //location: ['', []],
      //url: ['', []],
      //imageUrl: ['', []],
      notes: [this.data.application.notes, []],
      //platform: ['', []],
      // boardId: [this.data.boardId, []],
      // status: [this.data.status, []],
    });
  }

  onSubmit() {
    if (this.applicationDetailForm.valid) {
      this.applicationService
        .updateApplicationNotes(
          this.applicationDetailForm.value,
          this.data.application.id,
          this.data.application.board_id
        )
        .subscribe({
          next: (applicationResponse: Application) => {
            this.dialogRef.close(applicationResponse);
          },
          error: (err) => {
            console.log('Ha habido un error:', err);
          },
        });
    } else {
      this.applicationDetailForm.markAllAsTouched();
    }
  }

  get descriptionControl(): FormControl {
    return this.applicationDetailForm.get('description') as FormControl;
  }

  onCancel() {
    this.dialogRef.close();
  }
}
