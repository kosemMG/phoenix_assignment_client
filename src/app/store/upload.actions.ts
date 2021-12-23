import { Action } from '@ngrx/store';
import { UploadResponseState } from '../models/upload-response-state';

export const UPLOAD_FILE = '[Upload] Upload files';
export const INIT_FILES = '[Upload] Initialise files';

export class UploadFile implements Action {
  public readonly type = UPLOAD_FILE;

  constructor(public payload: UploadResponseState) {
  }
}

export class InitFiles implements Action {
  public readonly type = INIT_FILES;

  constructor(public payload: string[]) {
  }
}

export type Actions = UploadFile | InitFiles;
