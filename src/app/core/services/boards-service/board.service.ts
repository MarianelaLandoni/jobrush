import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Board } from 'core/models/board.model';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private http = inject(HttpClient);
  private url = environment.API_URL;

  getBoards(): Observable<Board[]>{
    return this.http.get<Board[]>(`${this.url}/boards`);
  }

  getBoardById(id: string): Observable<Board>{
    return this.http.get<Board>(`${this.url}/boards/${id}`);
  }
}
