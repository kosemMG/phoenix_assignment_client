import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../models/app-state';
import { uploadReducer } from './upload.reducer';

export const appReducer: ActionReducerMap<AppState> = {
  upload: uploadReducer
};
