import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  private uploadUrl = '/api/files/upload';
  private downloadUrl = '/api/files/download';

  constructor(private http: HttpClient) { }

  public upload(formData: FormData): Observable<string[]> {
    return this.http.post<string[]>(this.uploadUrl, formData);
  }
}
