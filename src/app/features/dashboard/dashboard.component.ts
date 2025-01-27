import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpinnerService } from 'core/services/spinner-service/spinner.service';
import { SidebarComponent } from 'shared/components/sidebar/sidebar.component';
import { SpinnerComponent } from 'shared/components/spinner/spinner.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, NgClass, SidebarComponent, SpinnerComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  isSidebarCollapsed = false;
  spinnerService = inject(SpinnerService);
  isLoading = this.spinnerService.isLoading;

  onSidebarToggle(isCollapsed: boolean) {
    this.isSidebarCollapsed = isCollapsed;
  }
}
