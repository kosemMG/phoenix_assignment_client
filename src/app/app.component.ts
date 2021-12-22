import {Component, OnInit} from '@angular/core';
import { FilesService } from './file-upload/files.service';
import { UploadResponse, UploadResult } from './models/upload-response';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public uploadResult = UploadResult;
  public result: UploadResult;
  public message: string;
  public messageShown = false;

  constructor(private filesService: FilesService) {
  }

  public ngOnInit(): void {
    this.filesService.upload$.subscribe((res: UploadResponse) => {
      this.result = res.result;
      this.message = res.message;
      this.messageShown = true;
      setTimeout(() => this.messageShown = false, 3000);
    })
  }

}
