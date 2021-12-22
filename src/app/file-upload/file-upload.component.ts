import { Component, Input, OnDestroy } from '@angular/core';
import { FilesService } from './files.service';
import { UploadResponse } from '../models/upload-response';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnDestroy {
  @Input() requiredFileTypes: string;

  public originalFilename: string;
  public newFilename: string;

  private file: File;
  private extension: string;
  private uploadSubscription: Subscription;

  constructor(private filesService: FilesService) {
  }

  public ngOnDestroy(): void {
    this.uploadSubscription.unsubscribe();
  }

  public onFileSelected(event: any): void {
    this.file = event.target?.files[0];

    if (!this.file) return;

    this.originalFilename = this.file.name;

    const splitFilename = this.file.name.split('.');
    this.extension = splitFilename[splitFilename.length - 1];
  }

  public uploadFile(): void {
    if (!this.file) return;

    const filename = !!this.newFilename
      ? `${this.newFilename}.${this.extension}`
      : this.originalFilename;

    const formData = new FormData();
    formData.append('file', this.file, filename);

    this.uploadSubscription = this.filesService.upload(formData)
      .subscribe((response: UploadResponse) => this.filesService.dispatchUploadResponse(response));
  }
}
