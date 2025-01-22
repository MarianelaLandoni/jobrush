import { Component, input, output } from '@angular/core';
import { OverflowMenuComponent } from '../overflow-menu/overflow-menu.component';
import { Board } from 'core/models/board.model';

@Component({
  selector: 'app-card-button',
  standalone: true,
  imports: [OverflowMenuComponent],
  templateUrl: './card-button.component.html',
  styleUrl: './card-button.component.scss',
})
export class CardButtonComponent {
  title = input<string>();
  buttonClickEvent = output<MouseEvent>();
  deleteBoardEvent = output<MouseEvent>();

  isHover = false;

}
