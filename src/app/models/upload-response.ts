export interface UploadResponse {
  files?: string[];
  message: string;
  result: UploadResult;
}

export enum UploadResult {
  Succeeded = 'succeeded',
  Failed = 'failed'
}
