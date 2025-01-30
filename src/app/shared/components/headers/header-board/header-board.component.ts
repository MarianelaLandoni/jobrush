import { Component, input, output } from '@angular/core';
import { Board } from 'core/models/board.model';
import { ButtonComponent } from 'shared/components/button/button.component';
import { SearchComponent } from 'shared/components/search/search.component';

@Component({
  selector: 'app-header-board',
  standalone: true,
  imports: [ButtonComponent, SearchComponent],
  templateUrl: './header-board.component.html',
  styleUrl: './header-board.component.scss',
})
export class HeaderBoardComponent {
  board = input<Board>();
  searchEvent = output<string>();
  gobackEvent = output<MouseEvent>();
  deleteEvent = output<MouseEvent>();

  isMobile = true;
}
