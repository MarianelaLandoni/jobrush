import { Dialog } from '@angular/cdk/dialog';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Board } from 'core/models/board.model';
import { BoardService } from 'core/services/boards-service/board.service';
import { ButtonComponent } from 'shared/components/button/button.component';
import { CardButtonComponent } from 'shared/components/card-button/card-button.component';
import { AddBoardFormComponent } from './add-board-form/add-board-form.component';
import { ConfirmModalComponent } from 'shared/components/modals/confirm-modal/confirm-modal.component';
import { EmptySectionComponent } from 'shared/components/empty-section/empty-section.component';
import { SpinnerService } from 'core/services/spinner-service/spinner.service';

@Component({
  selector: 'app-boards',
  standalone: true,
  imports: [ButtonComponent, CardButtonComponent, EmptySectionComponent],
  templateUrl: './boards.component.html',
  styleUrl: './boards.component.scss',
})
export class BoardsComponent implements OnInit {
  private boardService = inject(BoardService);
  private spinnerService = inject(SpinnerService);
  private router = inject(Router);
  private dialog = inject(Dialog);

  boards = signal<Board[]>([]);

  ngOnInit(): void {
    this.getBoards();
  }

  getBoards() {
    this.boardService.getBoards().subscribe({
      next: (response) => {
        this.boards.set(response);
      },
      error: (error) => {
        console.error('Error al obtener tableros:', error);
      },
    });
  }

  get noBoards(){
    return !this.spinnerService.isLoading() && this.boards().length === 0;
  }

  openAddBoardModal() {
    const dialogRef = this.dialog.open(AddBoardFormComponent, {
      minWidth: '375px',
    });

    dialogRef.closed.subscribe((newBoard: any) => {
      if (newBoard) {
        this.boards.set([...this.boards(), newBoard]);
      } else {
        console.log('No se recibió el nuevo tablero.');
      }
    });
  }

  openDeleteBoardModal(boardId: number, event: Event) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      maxWidth: '400px',
      autoFocus: false,
      data: {
        showImage: true,
        srcImage: '/images/delete-bg.svg',
        altImage: 'Imagen de papelera',
        title: '¿Estás seguro?',
        description:
          'Esta acción no se puede deshacer. Si eliminas el tablero, perderás todas las postulaciones y no podrás volver a recuperarlo.',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        confirmAction: 'delete',
        isWarningButton: true,
      },
    });

    dialogRef.closed.subscribe((result) => {
      if (result === 'delete') {
        this.deleteBoard(boardId);
      } else {
        console.log('Action canceled or other action.');
      }
    });
  }

  deleteBoard(boardId: number) {
    this.boardService.deleteBoard(boardId).subscribe({
      next: () => {
        const updatedBoards = this.boards().filter(
          (board) => board.id !== boardId
        );
        this.boards.set(updatedBoards);
      },
      error: (err) => {
        console.log('No se ha podido eliminar el tablero', err);
      },
    });
  }

  goToBoard(id: number): void {
    this.router.navigate(['/tableros', id]);
  }
}
