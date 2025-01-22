import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Board } from 'core/models/board.model';
import { BoardService } from 'core/services/boards-service/board.service';
import { ButtonComponent } from 'shared/components/button/button.component';
import { InputComponent } from 'shared/components/input/input.component';

@Component({
  selector: 'app-add-board-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, ButtonComponent],
  templateUrl: './add-board-form.component.html',
  styleUrl: './add-board-form.component.scss'
})
export class AddBoardFormComponent {
  boardForm!: FormGroup;
  showErrorMsg = false;
  errorMsg = '';

  private fb = inject(FormBuilder);
  private boardService = inject(BoardService);
  dialogRef = inject<DialogRef<Board>>(DialogRef<Board>);
  data = inject(DIALOG_DATA);


  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.boardForm = this.fb.group({
      name: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.boardForm.valid) {
      this.boardService.addBoard(this.boardForm.value).subscribe({
        next: (response: Board) => {
         this.dialogRef.close(response);
        },
        error: (err) => {
          console.log('Ha habido un error:', err)
        },
      });
    } else {
      this.boardForm.markAllAsTouched();
    }
  }

  get nameControl(): FormControl {
    return this.boardForm.get('name') as FormControl;
  }


}
