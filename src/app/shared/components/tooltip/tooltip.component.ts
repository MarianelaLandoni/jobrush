import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [NgClass],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss'
})
export class TooltipComponent {
  readonly text = input<string>();
  readonly isActive = input<boolean>(false);
}
