import { Component, OnDestroy, OnInit } from '@angular/core';
import { FilesService } from './file-upload/files.service';
import { UploadResponseState, UploadResult } from './models/upload-response-state';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './models/app-state';

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

  constructor(private store: Store<AppState>) {
  }

  public ngOnInit(): void {
    this.store.select('upload').subscribe((response: UploadResponseState) => {
      this.result = response.result;
      this.message = response.message;
      this.messageShown = true;
      setTimeout(() => this.messageShown = false, 3000);
    })
  }
}
