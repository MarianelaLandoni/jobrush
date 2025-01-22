import { NgClass } from '@angular/common';
import { Component, ElementRef, HostListener, inject, input, output } from '@angular/core';

@Component({
  selector: 'app-overflow-menu',
  standalone: true,
  imports: [NgClass],
  templateUrl: './overflow-menu.component.html',
  styleUrl: './overflow-menu.component.scss'
})
export class OverflowMenuComponent {
  isMenuOpen = false;
  private elementRef = inject(ElementRef);


  toggleMenu(event: Event) {
    event.stopPropagation();
    this.isMenuOpen = !this.isMenuOpen;

  }

  // Detecta clics fuera del componente
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isMenuOpen = false;
    }
  }


}
