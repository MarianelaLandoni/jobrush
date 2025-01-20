import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Application } from 'core/models/application.model';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  private http = inject(HttpClient);
  private url = environment.API_URL;

  getApplicationsByBoard(boardId: number): Observable<Application[]> {
    return this.http.get<Application[]>(
      `${this.url}/boards/${boardId}/applications`
    );
  }

  addApplication(data: Application): Observable<Application> {
    return this.http.post<Application>(`${this.url}/boards/${data.boardId}/applications`, data);
  }

  updateApplication(data: Application): Observable<Application> {
    return this.http.put<Application>(`${this.url}/boards/${data.boardId}/applications/${data.id}`, data);
  }

  deleteApplication(boardId: number, applicationId: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/boards/${boardId}/applications/${applicationId}`);
  }



}
