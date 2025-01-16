import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Board } from 'core/models/board.model';
import { BoardService } from 'core/services/boards-service/board.service';
import { ButtonComponent } from 'shared/components/button/button.component';
import { CardButtonComponent } from 'shared/components/card-button/card-button.component';

@Component({
  selector: 'app-boards',
  standalone: true,
  imports: [ButtonComponent, CardButtonComponent],
  templateUrl: './boards.component.html',
  styleUrl: './boards.component.scss',
})
export class BoardsComponent implements OnInit {
  private boardService = inject(BoardService);
  private router = inject(Router);

  boards: Board[] = [];

  ngOnInit(): void {
    this.boardService.getBoards().subscribe({
      next: (response) => {
        console.log('Tableros:', response);
        this.boards = response;
      },
      error: (error) => {
        console.error('Error al obtener tableros:', error);
      },
    });
  }

  goToBoard(id: number): void {
    this.router.navigate(['/tableros', id]);
  }
}
