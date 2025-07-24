import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Announcement {
  id: number;
  title: string;
  description: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  private apiUrl = `${environment.apiUrl}/announcements`;

  constructor(private http: HttpClient) { }

  private handleError = (error: HttpErrorResponse) => {
    console.error('Error en AnnouncementService:', error);
    return throwError(() => error);
  }

  getAnnouncements(): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  createAnnouncement(announcement: Omit<Announcement, 'id'>): Observable<any> {
    return this.http.post<any>(this.apiUrl, announcement)
      .pipe(catchError(this.handleError));
  }

  deleteAnnouncement(id: number): Observable<any> {
    const options = { body: { id } };
    return this.http.delete<any>(this.apiUrl, options)
      .pipe(catchError(this.handleError));
  }

  updateAnnouncement(announcement: Announcement): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${announcement.id}`, announcement)
      .pipe(catchError(this.handleError));
  }
}
