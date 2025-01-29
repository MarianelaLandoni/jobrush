import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Board } from 'core/models/board.model';
import { BoardService } from 'core/services/boards-service/board.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
  CdkDragMove,
  CdkDragPlaceholder,
} from '@angular/cdk/drag-drop';
import { ButtonComponent } from 'shared/components/button/button.component';
import { Column } from 'core/models/board-column.model';
import { Application } from 'core/models/application.model';
import { Dialog } from '@angular/cdk/dialog';
import { AddApplicationFormComponent } from '../applications/add-application-form/add-application-form.component';
import { ApplicationService } from 'core/services/application-service/application.service';
import { ConfirmModalComponent } from 'shared/components/modals/confirm-modal/confirm-modal.component';
import { ApplicationDetailComponent } from '../applications/application-detail/application-detail.component';
import { SpinnerService } from 'core/services/spinner-service/spinner.service';

@Component({
  selector: 'app-board-detail',
  standalone: true,
  imports: [
    CommonModule,
    CdkDropList,
    CdkDrag,
    CdkDragPlaceholder,
    ButtonComponent,
  ],
  templateUrl: './board-detail.component.html',
  styleUrl: './board-detail.component.scss',
})
export class BoardDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private boardService = inject(BoardService);
  private spinnerService = inject(SpinnerService);
  private applicationService = inject(ApplicationService);
  private dialog = inject(Dialog);

  isLoading = this.spinnerService.isLoading;
  board!: Board;

  columns = signal<Column[]>([
    {
      id: 'favorites',
      name: 'Favoritos',
      icon: '/icons/star.svg',
      applications: [],
    },
    {
      id: 'applied',
      name: 'Aplicados',
      icon: '/icons/document-check.svg',
      applications: [],
    },
    {
      id: 'interview',
      name: 'En entrevistas',
      icon: '/icons/interview.svg',
      applications: [],
    },
    {
      id: 'offer',
      name: 'Oferta',
      icon: '/icons/briefcase.svg',
      applications: [],
    },
    {
      id: 'rejected',
      name: 'Rechazado',
      icon: '/icons/rejected.svg',
      applications: [],
    },
  ]);

  connectedColumns = computed(() => this.columns().map((column) => column.id));

  ngOnInit(): void {
    const boardId = this.route.snapshot.paramMap.get('id');
    if (boardId) {
      this.getBoard(boardId);
    } else {
      console.error('No se encontró el id del tablero en la URL');
    }
  }


  getBoard(id: string): void {
    this.boardService.getBoardById(id).subscribe({
      next: (data) => {
        this.board = data;
        this.getApplications();
      },
      error: (err) => {
        console.error('Error al cargar el tablero:', err);
      },
    });
  }

  getApplications(): void {
    this.applicationService.getApplicationsByBoard(this.board?.id).subscribe({
      next: (applications) => {
        this.organizeApplicationsByStatus(applications);
      },
      error: (err) => {
        console.error('Error al cargar las postulaciones:', err);
      },
    });
  }

  organizeApplicationsByStatus(applications: Application[]): void {
    applications.forEach((application) => {
      const targetColumn = this.columns().find(
        (column) => column.id === application.status
      );
      if (targetColumn) {
        targetColumn.applications.push(application);
      }
    });

    this.columns.set([...this.columns()]);
  }

  drop(event: CdkDragDrop<Application[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      this.updateApplicationStatus(event);
    }
  }

  updateApplicationStatus(event: CdkDragDrop<Application[]>) {
    const applicationData = event.container.data[event.currentIndex];
    const currentColumn = event.container.id;
    applicationData.status = currentColumn;

    this.applicationService.updateApplication(applicationData).subscribe({
      next: () => {},
      error: (err) => {
        console.error('Error al actualizar la postulación:', err);
      },
    });
  }

  onDragMoved(event: CdkDragMove) {
    const boardGroup = document.querySelector('.board__group') as HTMLElement;

    if (boardGroup) {
      const threshold = 100;

      if (event.pointerPosition.x < threshold) {
        boardGroup.scrollLeft -= 20;
      } else if (event.pointerPosition.x > boardGroup.offsetWidth - threshold) {
        boardGroup.scrollLeft += 20;
      }
    }
  }

  openApplicationModal(columnId: string) {
    const dialogRef = this.dialog.open(AddApplicationFormComponent, {
      minWidth: '375px',
      data: {
        boardId: this.board?.id,
        status: columnId,
      },
    });

    dialogRef.closed.subscribe((newApplication: any) => {
      if (newApplication) {
        const updatedColumns = this.columns().map((column) => {
          if (column.id === columnId) {
            return {
              ...column,
              applications: [...column.applications, newApplication],
            };
          }
          return column;
        });

        this.columns.set(updatedColumns);
      } else {
        console.log('No se recibió la nueva aplicación.');
      }
    });
  }

  openConfirmationModal(applicationId: number, event: Event) {
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
          'Esta acción no se puede deshacer. Si eliminas tu postulación, no podrás volver a recuperarla.',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        confirmAction: 'delete',
        isWarningButton: true,
      },
    });

    dialogRef.closed.subscribe((result) => {
      if (result === 'delete') {
        this.deleteApplication(applicationId);
      } else {
        console.log('Action canceled or other action.');
      }
    });
  }

  deleteApplication(applicationId: number) {
    this.applicationService
      .deleteApplication(this.board.id, applicationId)
      .subscribe({
        next: () => {
          const updatedColumns = this.columns().map((column) => ({
            ...column,
            applications: column.applications.filter(
              (application) => application.id !== applicationId
            ),
          }));

          this.columns.set(updatedColumns);
        },
        error: (err) => {
          console.error('Error al eliminar la postulación:', err);
        },
      });
  }

  openApplicationDetail(application: Application) {
    const dialogRef = this.dialog.open(ApplicationDetailComponent, {
      minWidth: '340px',
      maxWidth: '450px',
      panelClass: 'application-detail-modal',
      autoFocus: false,
      data: {
        application: application,
      },
    });

    dialogRef.closed.subscribe((result: any) => {
      if (result) {
        const updatedApplication = result.application;

        const updatedColumns = this.columns().map((column) => {
          if (column.id === updatedApplication.status) {
            return {
              ...column,
              applications: column.applications.map((application) =>
                application.id === updatedApplication.id
                  ? { ...application, notes: updatedApplication.notes }
                  : application
              ),
            };
          }
          return column;
        });

        this.columns.set(updatedColumns);
      }
    });
  }

  openDeleteBoardModal(boardId: number, event: Event){
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

  deleteBoard(boardId: number){
    this.boardService.deleteBoard(boardId).subscribe({
      next:() => {
        this.goBack();
      },
      error:(err) => {
        console.log("No se ha podido eliminar el tablero", err)
      }
    })
  }

  goBack() {
    return this.router.navigate(['/tableros']);
  }
}
