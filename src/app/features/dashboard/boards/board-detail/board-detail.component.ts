import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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
} from '@angular/cdk/drag-drop';
import { ButtonComponent } from 'shared/components/button/button.component';
import { Column } from 'core/models/board-column.model';
import { Application } from 'core/models/application.model';



@Component({
  selector: 'app-board-detail',
  standalone: true,
  imports: [CommonModule, CdkDropList, CdkDrag, ButtonComponent],
  templateUrl: './board-detail.component.html',
  styleUrl: './board-detail.component.scss',
})

export class BoardDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private boardService = inject(BoardService);

  board: Board | null = null;

  connectedColumns: string[] = [
    'favorites',
    'applied',
    'interview',
    'offer',
    'rejected',
  ];
  columns: Column[] = [
    {
      id: 'favorites',
      name: 'Favoritos',
      icon: '/icons/star.svg',
      applications: [
        {
          id: 1,
          title: 'Frontend Developer',
          company: 'Company A',
          status: 'favorites',
          created_at: '2024-01-15T10:00:00Z',
          image_url:
            'https://media.licdn.com/dms/image/v2/C560BAQEloqEBLHUukg/company-logo_100_100/company-logo_100_100/0/1630631081923/devoteam_logo?e=1744848000&v=beta&t=y_yQw-NkB1n-YWV_yoIYFNcz06b_s1uri4wJAgoXZNg',
        },
        {
          id: 2,
          title: 'Backend Developer',
          company: 'Company B',
          status: 'favorites',
          created_at: '2024-01-14T10:00:00Z',
          image_url:
            'https://media.licdn.com/dms/image/v2/C560BAQEloqEBLHUukg/company-logo_100_100/company-logo_100_100/0/1630631081923/devoteam_logo?e=1744848000&v=beta&t=y_yQw-NkB1n-YWV_yoIYFNcz06b_s1uri4wJAgoXZNg',
        },
      ],
    },
    {
      id: 'applied',
      name: 'Aplicados',
      icon: '/icons/document-check.svg',
      applications: [
        {
          id: 3,
          title: 'Product Manager',
          company: 'Company C',
          status: 'applied',
          created_at: '2024-01-10T10:00:00Z',
          image_url:
            'https://media.licdn.com/dms/image/v2/C560BAQEloqEBLHUukg/company-logo_100_100/company-logo_100_100/0/1630631081923/devoteam_logo?e=1744848000&v=beta&t=y_yQw-NkB1n-YWV_yoIYFNcz06b_s1uri4wJAgoXZNg',
        },
      ],
    },
    {
      id: 'interview',
      name: 'En entrevistas',
      icon: '/icons/interview.svg',
      applications: [
        {
          id: 4,
          title: 'UX Designer',
          company: 'Company D',
          status: 'interview',
          created_at: '2024-01-08T10:00:00Z',
          image_url:
            'https://media.licdn.com/dms/image/v2/C560BAQEloqEBLHUukg/company-logo_100_100/company-logo_100_100/0/1630631081923/devoteam_logo?e=1744848000&v=beta&t=y_yQw-NkB1n-YWV_yoIYFNcz06b_s1uri4wJAgoXZNg',
        },
      ],
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
  ];

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
      },
      error: (err) => {
        console.error('Error al cargar el tablero:', err);
      },
    });
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
    }
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

  goBack() {
    return this.router.navigate(['/tableros']);
  }
}
