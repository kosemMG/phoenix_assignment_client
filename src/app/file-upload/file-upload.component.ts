import {Component, Input, OnInit} from '@angular/core';
import {FilesService} from "./files.service";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  @Input() requiredFileTypes: string;

  public originalFilename: string;
  public newFilename: string;

  private file: File;
  private extension: string;

  constructor(private filesService: FilesService) {
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
    formData.append(filename, this.file);

    this.filesService.upload(formData)
      .subscribe((files: string[]) => console.log(files));
  }
}
