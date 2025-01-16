import { Component, input, output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-card-button',
  standalone: true,
  imports: [NgClass, ButtonComponent],
  templateUrl: './card-button.component.html',
  styleUrl: './card-button.component.scss',
})
export class CardButtonComponent {
  title = input<string>();
  buttonClickEvent = output<MouseEvent>();

  isHover = false;
}
