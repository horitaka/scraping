import * as types from './types';

export const saveToCsvFileRequest = (filePath, data) => ({
  type: types.SAVE_TO_CSV_FILE_REQUEST,
  payload: {
    filePath: filePath,
    data: data,
  }
})

export const saveToCsvFileFinished = () => ({
  type: types.SAVE_TO_CSV_FILE_FINISHED,
})
