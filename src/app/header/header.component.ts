import { Component, OnInit } from '@angular/core';
import { FilesService } from '../file-upload/files.service';
import { UploadResponse } from '../models/upload-response';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public menuOpened = false;
  public files: string[] = [];

  constructor(private filesService: FilesService) {
  }

  public ngOnInit(): void {
    this.fetchInitialFilenames();
    this.listenToFileUpload();
  }

  private fetchInitialFilenames(): void {
    this.filesService.getFilenames().subscribe((names: string[]) => this.files = names);
  }

  private listenToFileUpload(): void {
    this.filesService.upload$.subscribe((response: UploadResponse) => this.files = response.files!);
  }
}
