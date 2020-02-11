import * as types from './types';

export const runScraping = () => ({
  type: types.RUN_SCRAPING,
})

export const saveToCsvFileRequest = () => ({
  type: types.SAVE_TO_CSV_FILE_REQUEST,
})

export const saveToCsvFileFinished = () => ({
  type: types.SAVE_TO_CSV_FILE_FINISHED,
})
