export interface UploadResponseState {
  files?: string[];
  message?: string;
  result?: UploadResult;
}

export enum UploadResult {
  Succeeded = 'succeeded',
  Failed = 'failed'
}
