import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { ButtonComponent } from 'shared/components/button/button.component';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss'
})
export class ConfirmModalComponent {
  dialogRef = inject<DialogRef<boolean>>(DialogRef<boolean>);
  data = inject(DIALOG_DATA);

  onConfirm() {
    this.dialogRef.close(this.data.confirmAction);
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
