import { Component, OnDestroy, OnInit } from '@angular/core';
import { FilesService } from '../file-upload/files.service';
import { UploadResponse } from '../models/upload-response';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public menuOpened = false;
  public files: string[] = [];

  private uploadSubscription: Subscription;

  constructor(private filesService: FilesService) {
  }

  public ngOnInit(): void {
    this.fetchInitialFilenames();
    this.listenToFileUpload();
  }

  public ngOnDestroy(): void {
    this.uploadSubscription.unsubscribe();
  }

  public download(filename: string): void {
    this.filesService.download(filename);
  }

  private fetchInitialFilenames(): void {
    this.filesService.getFilenames().subscribe((names: string[]) => this.files = names);
  }

  private listenToFileUpload(): void {
    this.uploadSubscription = this.filesService.upload$
      .subscribe((response: UploadResponse) => this.files = response.files!);
  }
}
