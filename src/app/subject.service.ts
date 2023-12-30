import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private subjectsUrl = 'http://localhost:3000/subjects';
  private difficultyLevelsUrl = 'http://localhost:3000/difficultyLevels';
  private loginUrl = 'http://localhost:3000/subjects/signin';

  constructor(private http: HttpClient) {}

  getAllSubjects(): Observable<any[]> {
    return this.http.get<any[]>(this.subjectsUrl);
  }

  getLevelsForSubject(subjectId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/subjects/${subjectId}/levels`);
  }

  getPdfLink(subjectId: number, levelId: number): Observable<any[]> {
    const pdfLinkUrl = `http://localhost:3000/subjects/${subjectId}/levels/${levelId}`;
    return this.http.get<any[]>(pdfLinkUrl);
  }
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, { email, password });
  }


}
