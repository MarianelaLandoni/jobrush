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
  @Input() text = '';
  @Input() disabled = false;
  @Input() iconButton = false;
  @Input() iconSrc = '';
  @Input() iconAlt = '';
  @Input() isSmall = false;
  @Input() isOutlinePrimary = false;
  @Input() isOutline = false;
  @Input() isWarning = false;
  @Input() isLeftIcon = false;
  @Input() leftIconSrc = '';



  isHover = false;
}
