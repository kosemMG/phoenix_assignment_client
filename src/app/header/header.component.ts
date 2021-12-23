import { Component, OnInit } from '@angular/core';
import { FilesService } from '../file-upload/files.service';
import { UploadResponseState } from '../models/upload-response-state';
import { Store } from '@ngrx/store';
import { AppState } from '../models/app-state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public menuOpened = false;
  public files: string[] = [];


  constructor(private filesService: FilesService, private store: Store<AppState>) {
  }

  public ngOnInit(): void {
    this.fetchInitialFilenames();

    this.store.select('upload')
      .subscribe((response: UploadResponseState) => this.files = [...response.files]);
  }

  public download(filename: string): void {
    this.filesService.download(filename);
  }

  private fetchInitialFilenames(): void {
    this.filesService.fetchFilenames();
  }
}
