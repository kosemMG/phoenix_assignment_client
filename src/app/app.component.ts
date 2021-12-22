import { Component, OnDestroy, OnInit } from '@angular/core';
import { FilesService } from './file-upload/files.service';
import { UploadResponse, UploadResult } from './models/upload-response';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  public uploadResult = UploadResult;
  public result: UploadResult;
  public message: string;
  public messageShown = false;

  private uploadSubscription: Subscription;

  constructor(private filesService: FilesService) {
  }

  public ngOnInit(): void {
    this.uploadSubscription = this.filesService.upload$.subscribe((res: UploadResponse) => {
      this.result = res.result;
      this.message = res.message;
      this.messageShown = true;
      setTimeout(() => this.messageShown = false, 3000);
    })
  }

  public ngOnDestroy(): void {
    this.uploadSubscription.unsubscribe();
  }
}
