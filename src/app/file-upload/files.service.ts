import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { UploadResponseState } from '../models/upload-response-state';
import * as Upload from '../store/upload.actions';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private http: HttpClient, private store: Store<{ upload: UploadResponseState }>) {
  }

  public fetchFilenames(): void {
    this.http.get<string[]>(environment.apiUrl + '/names').subscribe((names: string[]) => {
      this.store.dispatch(new Upload.InitFiles(names));
    });
  }

  public upload(formData: FormData): void {
    this.http.post<UploadResponseState>(environment.apiUrl + '/upload', formData).subscribe({
      next: (response: UploadResponseState) => {
        this.store.dispatch(new Upload.UploadFile({ ...response }));
      },
      error: (response: HttpErrorResponse) => {
        this.store.dispatch(new Upload.UploadFile({ ...response.error } as UploadResponseState));
      }
    });
  }

  public download(filename: string): void {
    this.http.get(`${environment.apiUrl}/download?filename=${filename}`, { responseType: 'blob' as 'json' })
      .subscribe((response: any) => {
          const dataType = response.type;
          const binaryData = [];
          binaryData.push(response);

          const downloadLink = document.createElement('a');
          downloadLink.href = URL.createObjectURL(new Blob(binaryData, { type: dataType }));

          if (filename) {
            downloadLink.setAttribute('download', filename);
          }

          document.body.appendChild(downloadLink);
          downloadLink.click();
          downloadLink.remove();
        }
      );
  }
}
