import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() text = 'Botón';
  @Input() disabled = false;
  @Input() iconButton = false;
  @Input() iconSrc = '';
  @Input() iconAlt = '';



  isHover = false;
}
