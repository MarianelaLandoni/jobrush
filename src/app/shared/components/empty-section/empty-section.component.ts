import { Component, input, output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-empty-section',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './empty-section.component.html',
  styleUrl: './empty-section.component.scss'
})
export class EmptySectionComponent {
  title = input<string>('');
  text = input<string>('');
  buttonText = input<string>('');
  buttonLeftIcon = input<string>('');
  image = input<string>('');

  buttonClickEvent = output();


}
