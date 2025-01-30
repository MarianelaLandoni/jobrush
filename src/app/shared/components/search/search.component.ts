import { Component, output } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  searchEvent = output<string>()

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value.trim();
    this.searchEvent.emit(value);
  }
}
