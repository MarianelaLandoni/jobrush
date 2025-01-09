import { NgClass } from '@angular/common';
import { Component, inject, output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonComponent } from '../button/button.component';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgClass, RouterModule, ButtonComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  isCollapsed = false;
  hoveredItem: string | null = null;
  
  collapseSidebarEvent = output<boolean>();

  router = inject(Router);

  menuItems = [
    { route: '/inicio', label: 'Home', icon: '/icons/home.svg', iconActive: '/icons/home-active.svg' },
    { route: '/tableros', label: 'Tableros', icon: '/icons/boards.svg', iconActive: '/icons/boards-active.svg' },
    { route: '/extension', label: 'Extensión', icon: '/icons/extension.svg', iconActive: '/icons/extension-active.svg' },
  ];

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.collapseSidebarEvent.emit(this.isCollapsed);
  }

  isActive(route: string): boolean {
    return this.router.isActive(route, {
      paths: 'exact',
      queryParams: 'ignored',
      matrixParams: 'ignored',
      fragment: 'ignored'});
  }
}
