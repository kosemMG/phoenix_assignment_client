import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { UploadResponse } from '../models/upload-response';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  private apiUrl = 'http://localhost:5000/api/files';

  private uploadSource = new Subject<UploadResponse>();

  public upload$: Observable<UploadResponse> = this.uploadSource.asObservable();

  constructor(private http: HttpClient) { }

  public getFilenames(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl + '/names');
  }

  public upload(formData: FormData): Observable<UploadResponse> {
    return this.http.post<UploadResponse>(this.apiUrl + '/upload', formData);
  }

  public dispatchUploadResponse(response: UploadResponse): void {
    this.uploadSource.next(response);
  }
}
