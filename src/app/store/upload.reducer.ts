import { UploadResponseState } from '../models/upload-response-state';
import * as Upload from './upload.actions';

const initialState: UploadResponseState = {
  files: [],
  message: ''
};

export function uploadReducer(state = initialState, action: Upload.Actions) {
  switch (action.type) {
    case Upload.UPLOAD_FILE:
      return {
        ...state,
        files: [...action.payload.files],
        message: action.payload.message,
        result: action.payload.result
      };
    case Upload.INIT_FILES:
      return {
        ...state,
        files: [...action.payload]
      };
    default:
      return state;
  }
}
